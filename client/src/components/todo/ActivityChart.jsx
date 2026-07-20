import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import { BarChart3 } from "lucide-react";

export default function ActivityChart({ todos = [] }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const data = days.map((day) => ({
    day,
    completed: 0,
  }));

  todos.forEach((todo) => {
    if (todo.status !== "Completed") return;

    const date = todo.updatedAt || todo.createdAt;

    if (!date) return;

    const jsDay = new Date(date).getDay();

    const index = jsDay === 0 ? 6 : jsDay - 1;

    data[index].completed++;
  });

  const totalCompleted = data.reduce(
    (sum, day) => sum + day.completed,
    0
  );

  const mostProductive = data.reduce((best, current) =>
    current.completed > best.completed ? current : best
  );

  const hasActivity = totalCompleted > 0;

  if (!hasActivity) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          h-[560px]
          rounded-3xl
          border
          border-stone-200
          dark:border-zinc-800
          bg-white/70
          dark:bg-zinc-900/70
          backdrop-blur-md
          shadow-lg
          flex
          flex-col
          items-center
          justify-center
          p-8
        "
      >
        <div className="rounded-full bg-stone-200 dark:bg-zinc-800 p-6">
          <BarChart3
            size={48}
            className="text-stone-700 dark:text-stone-300"
          />
        </div>

        <h2 className="mt-6 text-2xl font-bold text-stone-800 dark:text-stone-100">
          No Weekly Activity
        </h2>

        <p className="mt-3 text-center text-stone-500 dark:text-stone-400">
          Complete a few tasks to visualize your weekly productivity.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -4,
        scale: 1.01,
      }}
      className="
        h-[560px]
        rounded-3xl
        border
        border-stone-200
        dark:border-zinc-800
        bg-white/70
        dark:bg-zinc-900/70
        backdrop-blur-md
        shadow-lg
        p-6
        flex
        flex-col
      "
    >
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100">
            Weekly Activity
          </h2>

          <p className="text-sm text-stone-500 dark:text-stone-400">
            Completed tasks this week
          </p>

        </div>

        <div
          className="
            rounded-full
            bg-stone-200
            dark:bg-zinc-800
            px-4
            py-2
            text-sm
            font-medium
            text-stone-700
            dark:text-stone-300
          "
        >
          {totalCompleted} Tasks
        </div>

      </div>

      {/* Chart */}

      <div className="flex-1">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data}>

            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#d6d3d1"
              opacity={0.35}
            />

            <XAxis
              dataKey="day"
              tick={{
                fill: "#78716c",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              allowDecimals={false}
              tick={{
                fill: "#78716c",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{
                fill: "rgba(120,113,108,.08)",
              }}
              contentStyle={{
                borderRadius: 18,
                border: "1px solid #d6d3d1",
                backgroundColor: "#fafaf9",
                color: "#292524",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,.08)",
              }}
            />

            <Bar
              dataKey="completed"
              radius={[10, 10, 0, 0]}
              animationDuration={900}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.day}
                  fill={
                    entry.day === mostProductive.day
                      ? "#10b981"
                      : "#a8a29e"
                  }
                />
              ))}
            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* Bottom Cards */}

      <div className="mt-8 grid grid-cols-2 gap-4">

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="
            rounded-2xl
            border
            border-stone-200
            dark:border-zinc-800
            bg-stone-100
            dark:bg-zinc-800
            p-5
          "
        >

          <p className="text-sm text-stone-500 dark:text-stone-400">
            Total Completed
          </p>

          <h3 className="mt-2 text-3xl font-bold text-stone-800 dark:text-stone-100">
            {totalCompleted}
          </h3>

        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="
            rounded-2xl
            border
            border-emerald-200
            dark:border-emerald-500/20
            bg-emerald-50
            dark:bg-emerald-500/10
            p-5
          "
        >

          <p className="text-sm text-emerald-700 dark:text-emerald-300">
            Best Day
          </p>

          <h3 className="mt-2 text-3xl font-bold text-emerald-600">
            {mostProductive.day}
          </h3>

          <p className="mt-1 text-sm text-emerald-700/80 dark:text-emerald-300/80">
            {mostProductive.completed} task
            {mostProductive.completed !== 1 ? "s" : ""}
          </p>

        </motion.div>

      </div>

    </motion.div>
  );
}