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

const COLORS = ["#10b981", "#f59e0b"];

export default function TaskChart({ todos = [] }) {
  const completed = todos.filter(
    (todo) => todo.status === "Completed"
  ).length;

  const pending = todos.filter(
    (todo) => todo.status === "Pending"
  ).length;

  const total = completed + pending;

  const completionRate =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

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
        className="h-[560px] rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/40 dark:border-slate-700 shadow-xl flex flex-col items-center justify-center p-6"
      >
        <div className="rounded-full bg-indigo-100 dark:bg-indigo-500/20 p-6">
          <PieChartIcon
            size={52}
            className="text-indigo-600 dark:text-indigo-400"
          />
        </div>

        <h2 className="mt-6 text-2xl font-bold text-slate-800 dark:text-white">
          No Tasks Yet
        </h2>

        <p className="mt-2 text-center text-slate-500 dark:text-slate-400">
          Create your first task to unlock analytics.
        </p>
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
      className="h-[560px] rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/40 dark:border-slate-700 shadow-xl p-6 flex flex-col"
    >
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Task Analytics
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Completion overview
          </p>
        </div>

        <div className="rounded-full bg-indigo-100 dark:bg-indigo-500/20 px-4 py-2 text-sm font-semibold text-indigo-600 dark:text-indigo-300">
          {completionRate}% Complete
        </div>

      </div>

      <div className="relative flex-1">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              innerRadius={90}
              outerRadius={120}
              paddingAngle={5}
              animationDuration={1000}
              label={false}
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
                borderRadius: 16,
                border: "none",
                backgroundColor: "#1e293b",
                color: "#fff",
              }}
              formatter={(value) => [`${value} Tasks`, ""]}
            />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">

          <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">

            <p
              className={`font-extrabold leading-none tracking-tight text-slate-800 dark:text-white ${
                completionRate === 100
                  ? "text-[40px]"
                  : "text-[46px]"
              }`}
              style={{
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {completionRate}%
            </p>

            <span className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">
              Complete
            </span>

          </div>

        </div>

      </div>

            {/* Stats */}

      <div className="mt-8 grid grid-cols-2 gap-4">

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="rounded-2xl border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10 p-5"
        >
          <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            Completed
          </p>

          <h3 className="mt-2 text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            {completed}
          </h3>

          <p className="mt-1 text-xs text-emerald-600/80 dark:text-emerald-300/80">
            {completionRate}% of all tasks
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="rounded-2xl border border-amber-200 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/10 p-5"
        >
          <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
            Pending
          </p>

          <h3 className="mt-2 text-3xl font-bold text-amber-600 dark:text-amber-400">
            {pending}
          </h3>

          <p className="mt-1 text-xs text-amber-600/80 dark:text-amber-300/80">
            {100 - completionRate}% remaining
          </p>
        </motion.div>

      </div>

    </motion.div>
  );
}