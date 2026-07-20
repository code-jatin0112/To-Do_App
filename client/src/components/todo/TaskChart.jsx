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
  "#34d399", // emerald
  "#fbbf24", // amber
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
          <PieChartIcon
            size={48}
            className="text-stone-700 dark:text-stone-300"
          />
        </div>

        <h2 className="mt-6 text-2xl font-bold text-stone-800 dark:text-stone-100">
          No Analytics Yet
        </h2>

        <p className="mt-3 text-center text-stone-500 dark:text-stone-400">
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
            Task Analytics
          </h2>

          <p className="text-sm text-stone-500 dark:text-stone-400">
            Completion Overview
          </p>

        </div>

        <div className="
          rounded-full
          bg-stone-200
          dark:bg-zinc-800
          px-4
          py-2
          text-sm
          font-medium
          text-stone-700
          dark:text-stone-300
        ">
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
                border: "1px solid #d6d3d1",
                backgroundColor: "#fafaf9",
                color: "#292524",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,.08)",
              }}
              formatter={(value) => [
                `${value} Tasks`,
                "",
              ]}
            />

            <Legend />

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
              border-stone-200
              dark:border-zinc-700
              bg-white
              dark:bg-zinc-900
              shadow-md
            "
          >

            <h2 className="text-4xl font-bold text-stone-800 dark:text-stone-100">
              {completionRate}%
            </h2>

            <span className="text-sm text-stone-500 dark:text-stone-400">
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
            border-emerald-200
            dark:border-emerald-500/20
            bg-emerald-50
            dark:bg-emerald-500/10
            p-5
          "
        >

          <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            Completed
          </p>

          <h3 className="mt-2 text-3xl font-bold text-emerald-600">
            {completed}
          </h3>

          <p className="mt-1 text-xs text-emerald-700/80 dark:text-emerald-300/80">
            {completionRate}% of all tasks
          </p>

        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="
            rounded-2xl
            border
            border-amber-200
            dark:border-amber-500/20
            bg-amber-50
            dark:bg-amber-500/10
            p-5
          "
        >

          <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
            Pending
          </p>

          <h3 className="mt-2 text-3xl font-bold text-amber-600">
            {pending}
          </h3>

          <p className="mt-1 text-xs text-amber-700/80 dark:text-amber-300/80">
            {100 - completionRate}% remaining
          </p>

        </motion.div>

      </div>

    </motion.div>
  );
}