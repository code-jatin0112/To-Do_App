import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { PieChart as PieChartIcon } from "lucide-react";

const COLORS = [
  "#2F4A61", // Completed
  "#A78963", // Pending
];

export default function TaskChart({ todos = [] }) {
  const completed = todos.filter(
    (todo) => todo.status === "Completed"
  ).length;

  const pending = todos.filter(
    (todo) => todo.status === "Pending"
  ).length;

  const total = completed + pending;

  const data = [
    {
      name: "Completed",
      value: completed,
    },
    {
      name: "Pending",
      value: pending,
    },
  ];

  if (total === 0) {
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
          <PieChartIcon
            size={48}
            className="text-[#2F4A61]"
          />
        </div>

        <h2 className="mt-6 text-2xl font-bold text-[#242527] dark:text-[#F7F4EF]">
          No Analytics Yet
        </h2>

        <p className="mt-3 text-center text-[#6F6558] dark:text-[#BCB9AC]">
          Add a few tasks to start seeing your productivity insights.
        </p>
      </motion.div>
    );
  }

  const completionRate = Math.round(
    (completed / total) * 100
  );

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
            Task Analytics
          </h2>

          <p className="text-sm text-[#6F6558] dark:text-[#BCB9AC]">
            Completion Overview
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
          {completionRate}% Complete
        </div>

      </div>

      {/* Chart */}

      <div className="relative flex-1">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={75}
              outerRadius={110}
              paddingAngle={4}
              animationDuration={900}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                borderRadius: 18,
                border: "1px solid #BCB9AC",
                backgroundColor: "#FCFBF8",
                color: "#242527",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,.08)",
              }}
              formatter={(value) => [
                `${value} Tasks`,
                "",
              ]}
            />

            <Legend
              wrapperStyle={{
                color: "#6F6558",
              }}
            />

          </PieChart>

        </ResponsiveContainer>

        {/* Center */}

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">

          <div
            className="
              flex
              h-32
              w-32
              flex-col
              items-center
              justify-center
              rounded-full
              border
              border-[#BCB9AC]
              bg-[#FCFBF8]
              shadow-lg
              shadow-[#BCB9AC]/15

              dark:border-[#4B4540]
              dark:bg-[#343434]
            "
          >

            <h2 className="text-4xl font-bold text-[#242527] dark:text-[#F7F4EF]">
              {completionRate}%
            </h2>

            <span className="text-sm text-[#6F6558] dark:text-[#BCB9AC]">
              Complete
            </span>

          </div>

        </div>

      </div>

      {/* Bottom Cards */}

      <div className="mt-8 grid grid-cols-2 gap-4">

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="
            rounded-2xl
            border
            border-[#D7D0C6]
            bg-[#EEF3F6]
            p-5

            dark:border-[#4B4540]
            dark:bg-[#2F4A61]/20
          "
        >

          <p className="text-sm font-medium text-[#2F4A61]">
            Completed
          </p>

          <h3 className="mt-2 text-3xl font-bold text-[#2F4A61]">
            {completed}
          </h3>

          <p className="mt-1 text-xs text-[#5F8396]">
            {completionRate}% of all tasks
          </p>

        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="
            rounded-2xl
            border
            border-[#D7D0C6]
            bg-[#F6EEE5]
            p-5

            dark:border-[#5E4B3F]
            dark:bg-[#5E4B3F]/20
          "
        >

          <p className="text-sm font-medium text-[#8F6948]">
            Pending
          </p>

          <h3 className="mt-2 text-3xl font-bold text-[#A78963]">
            {pending}
          </h3>

          <p className="mt-1 text-xs text-[#8F6948]">
            {100 - completionRate}% remaining
          </p>

        </motion.div>

      </div>

    </motion.div>
  );
}