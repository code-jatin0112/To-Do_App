import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  PieChart as PieChartIcon,
  CheckCircle2,
  Clock3,
} from "lucide-react";

const COLORS = ["#10b981", "#f59e0b"];

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
        whileHover={{ y: -5, scale: 1.01 }}
        className="h-[460px] rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/40 dark:border-slate-700 shadow-xl p-8 flex flex-col"
      >
        {/* Header */}

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              Task Analytics
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Completion overview
            </p>
          </div>

          <div className="rounded-2xl bg-indigo-100 dark:bg-indigo-500/20 p-3">
            <PieChartIcon
              size={28}
              className="text-indigo-600 dark:text-indigo-400"
            />
          </div>
        </div>

        {/* Empty */}

        <div className="flex-1 flex flex-col items-center justify-center">

          <div className="rounded-full bg-indigo-100 dark:bg-indigo-500/20 p-8">
            <PieChartIcon
              size={56}
              className="text-indigo-500"
            />
          </div>

          <h3 className="mt-6 text-3xl font-bold text-slate-800 dark:text-white">
            No Tasks Yet
          </h3>

          <p className="mt-3 max-w-sm text-center text-slate-500 dark:text-slate-400">
            Your task analytics will appear here once you create
            your first task.
          </p>

        </div>

        {/* Footer */}

        <div className="grid grid-cols-2 gap-4">

          <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 p-5">

            <CheckCircle2
              size={24}
              className="text-emerald-500"
            />

            <p className="mt-3 text-sm text-emerald-600 dark:text-emerald-300">
              Completed
            </p>

            <h3 className="mt-1 text-3xl font-bold text-emerald-600">
              0
            </h3>

          </div>

          <div className="rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 p-5">

            <Clock3
              size={24}
              className="text-amber-500"
            />

            <p className="mt-3 text-sm text-amber-600 dark:text-amber-300">
              Pending
            </p>

            <h3 className="mt-1 text-3xl font-bold text-amber-500">
              0
            </h3>

          </div>

        </div>
      </motion.div>
    );
  }

  const completionRate = Math.round((completed / total) * 100);

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
              innerRadius={65}
              outerRadius={95}
              paddingAngle={4}
              animationDuration={1000}
              label={({ percent }) =>
                `${(percent * 100).toFixed(0)}%`
              }
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
          <div className="rounded-full bg-white dark:bg-slate-900 shadow-lg border border-slate-200 dark:border-slate-700 px-5 py-4 text-center">
            <p className="text-3xl font-bold text-slate-800 dark:text-white">
              {completionRate}%
            </p>

            <span className="text-xs text-slate-500 dark:text-slate-400">
              Complete
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
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
        </motion.div>
      </div>
    </motion.div>
  );
}