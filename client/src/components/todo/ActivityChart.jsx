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
import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";

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
        whileHover={{ y: -5, scale: 1.01 }}
        className="h-[460px] rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/40 dark:border-slate-700 shadow-xl p-8 flex flex-col"
      >
        {/* Header */}

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              Weekly Activity
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Productivity overview
            </p>
          </div>

          <div className="rounded-2xl bg-indigo-100 dark:bg-indigo-500/20 p-3">
            <BarChart3
              size={28}
              className="text-indigo-600 dark:text-indigo-400"
            />
          </div>
        </div>

        {/* Empty */}

        <div className="flex-1 flex flex-col items-center justify-center">

          <div className="rounded-full bg-indigo-100 dark:bg-indigo-500/20 p-8">
            <BarChart3
              size={56}
              className="text-indigo-500"
            />
          </div>

          <h3 className="mt-6 text-3xl font-bold text-slate-800 dark:text-white">
            No Weekly Activity
          </h3>

          <p className="mt-3 max-w-sm text-center text-slate-500 dark:text-slate-400">
            Complete a few tasks to start building your
            weekly productivity insights.
          </p>

        </div>

        {/* Footer */}

        <div className="grid grid-cols-2 gap-4">

          <div className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-5">

            <CheckCircle2
              className="text-emerald-500"
              size={24}
            />

            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Completed
            </p>

            <h3 className="mt-1 text-3xl font-bold text-slate-800 dark:text-white">
              0
            </h3>

          </div>

          <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-5 text-white">

            <CalendarDays
              size={24}
            />

            <p className="mt-3 text-sm opacity-90">
              Best Day
            </p>

            <h3 className="mt-1 text-3xl font-bold">
              —
            </h3>

          </div>

        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -5,
        scale: 1.01,
      }}
      className="h-[460px] rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/40 dark:border-slate-700 shadow-xl p-6 flex flex-col"
    >
      {/* Header */}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Weekly Activity
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Completed tasks over the week
          </p>
        </div>

        <div className="rounded-full bg-indigo-100 dark:bg-indigo-500/20 px-4 py-2 text-sm font-semibold text-indigo-600 dark:text-indigo-300">
          {totalCompleted} Tasks
        </div>
      </div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              opacity={0.15}
            />

            <XAxis
              dataKey="day"
              tick={{
                fill: "#64748b",
                fontSize: 12,
              }}
            />

            <YAxis
              allowDecimals={false}
              tick={{
                fill: "#64748b",
                fontSize: 12,
              }}
            />

            <Tooltip
              cursor={{
                fill: "rgba(99,102,241,0.08)",
              }}
              contentStyle={{
                borderRadius: 16,
                border: "none",
                backgroundColor: "#1e293b",
                color: "#fff",
              }}
            />

            <Bar
              dataKey="completed"
              radius={[10, 10, 0, 0]}
              animationDuration={1000}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.day}
                  fill={
                    entry.day === mostProductive.day
                      ? "#8b5cf6"
                      : "#6366f1"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-5"
        >
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Total Completed
          </p>

          <h3 className="mt-2 text-3xl font-bold text-slate-800 dark:text-white">
            {totalCompleted}
          </h3>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-5 text-white"
        >
          <p className="text-sm opacity-90">
            Best Day
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            {mostProductive.day}
          </h3>

          <p className="mt-1 text-sm opacity-90">
            {mostProductive.completed} task
            {mostProductive.completed !== 1 ? "s" : ""}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}