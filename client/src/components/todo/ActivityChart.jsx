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
          flex
          h-[560px]
          flex-col
          items-center
          justify-center
          rounded-3xl
          border
          border-[#BCB9AC]
          bg-[#FCFBF8]
          p-8
          shadow-xl
          shadow-[#BCB9AC]/15

          dark:border-[#4B4540]
          dark:bg-[#2B2B2B]
        "
      >
        <div className="rounded-full bg-[#F2ECE4] p-6 dark:bg-[#343434]">
          <BarChart3
            size={48}
            className="text-[#2F4A61]"
          />
        </div>

        <h2 className="mt-6 text-2xl font-bold text-[#242527] dark:text-[#F7F4EF]">
          No Weekly Activity
        </h2>

        <p className="mt-3 text-center text-[#6F6558] dark:text-[#BCB9AC]">
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
        flex
        h-[560px]
        flex-col
        rounded-3xl
        border
        border-[#BCB9AC]
        bg-[#FCFBF8]
        p-6
        shadow-xl
        shadow-[#BCB9AC]/15

        dark:border-[#4B4540]
        dark:bg-[#2B2B2B]
      "
    >
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-[#242527] dark:text-[#F7F4EF]">
            Weekly Activity
          </h2>

          <p className="text-sm text-[#6F6558] dark:text-[#BCB9AC]">
            Completed tasks this week
          </p>

        </div>

        <div
          className="
            rounded-full
            bg-[#F2ECE4]
            px-4
            py-2
            text-sm
            font-medium
            text-[#2F4A61]

            dark:bg-[#343434]
            dark:text-[#F7F4EF]
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
              stroke="#D7D0C6"
              opacity={0.4}
            />

            <XAxis
              dataKey="day"
              tick={{
                fill: "#6F6558",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              allowDecimals={false}
              tick={{
                fill: "#6F6558",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{
                fill: "rgba(47,74,97,.06)",
              }}
              contentStyle={{
                borderRadius: 18,
                border: "1px solid #BCB9AC",
                backgroundColor: "#FCFBF8",
                color: "#242527",
                boxShadow: "0 10px 30px rgba(0,0,0,.08)",
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
                      ? "#2F4A61"
                      : "#A78963"
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
            border-[#BCB9AC]
            bg-[#F7F4EF]
            p-5

            dark:border-[#4B4540]
            dark:bg-[#343434]
          "
        >
          <p className="text-sm text-[#6F6558] dark:text-[#BCB9AC]">
            Total Completed
          </p>

          <h3 className="mt-2 text-3xl font-bold text-[#242527] dark:text-[#F7F4EF]">
            {totalCompleted}
          </h3>

        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="
            rounded-2xl
            border
            border-[#D5C2AE]
            bg-[#F6EEE5]
            p-5

            dark:border-[#5E4B3F]
            dark:bg-[#3A312C]
          "
        >
          <p className="text-sm text-[#8F6948] dark:text-[#D7C5B5]">
            Best Day
          </p>

          <h3 className="mt-2 text-3xl font-bold text-[#2F4A61]">
            {mostProductive.day}
          </h3>

          <p className="mt-1 text-sm text-[#8F6948] dark:text-[#D7C5B5]">
            {mostProductive.completed} task
            {mostProductive.completed !== 1 ? "s" : ""}
          </p>

        </motion.div>

      </div>

    </motion.div>
  );
}