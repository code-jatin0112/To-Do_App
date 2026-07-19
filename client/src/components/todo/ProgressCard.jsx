import { motion } from "framer-motion";
import { Trophy, Target, CheckCircle2 } from "lucide-react";

export default function ProgressCard({ todos }) {
  const total = todos.length;

  const completed = todos.filter(
    (todo) => todo.status === "Completed"
  ).length;

  const percentage =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference - (percentage / 100) * circumference;

  const message =
    percentage === 100
      ? "Amazing! Everything is completed 🎉"
      : percentage >= 75
      ? "Great work! Almost finished 🚀"
      : percentage >= 50
      ? "Keep going! You're halfway there 💪"
      : percentage > 0
      ? "A good start. Stay consistent ✨"
      : "Let's create your first task 🚀";

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -5,
        scale: 1.02,
      }}
      className="h-full rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/40 dark:border-slate-700 shadow-xl p-6"
    >
      <div className="flex h-full flex-col">

        {/* Header */}

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              Task Progress
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Keep pushing towards your goals.
            </p>
          </div>

          <div className="rounded-2xl bg-indigo-100 dark:bg-indigo-500/20 p-3">
            <Target
              size={28}
              className="text-indigo-600 dark:text-indigo-400"
            />
          </div>
        </div>

        {/* Circular Progress */}

        <div className="mt-6 flex justify-center">

          <div className="relative h-36 w-36">

            <svg
              className="rotate-[-90deg]"
              width="144"
              height="144"
            >
              <circle
                cx="72"
                cy="72"
                r={radius}
                strokeWidth="10"
                stroke="rgb(226 232 240)"
                fill="transparent"
              />

              <motion.circle
                cx="72"
                cy="72"
                r={radius}
                strokeWidth="10"
                stroke="url(#gradient)"
                fill="transparent"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{
                  strokeDashoffset: circumference,
                }}
                animate={{
                  strokeDashoffset: offset,
                }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                }}
              />

              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="#6366f1"
                  />

                  <stop
                    offset="100%"
                    stopColor="#8b5cf6"
                  />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">

              <h2
                className={`font-extrabold leading-none tracking-tight [font-variant-numeric:tabular-nums] text-slate-800 dark:text-white ${
                  percentage === 100
                    ? "text-[34px]"
                    : "text-[40px]"
                }`}
              >
                {percentage}%
              </h2>

              <span className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                Completed
              </span>

            </div>

          </div>

        </div>

        {/* Progress Bar */}

        <div className="mt-6">
          <div className="mb-2 flex justify-between text-sm text-slate-500 dark:text-slate-400">
            <span>Overall Progress</span>

            <span>{percentage}%</span>
          </div>

          <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${percentage}%`,
              }}
              transition={{
                duration: 1,
              }}
              className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-600"
            />
          </div>
        </div>

                {/* Stats */}

        <div className="mt-6 grid grid-cols-2 gap-3">

          <div className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-3 text-center">

            <CheckCircle2
              className="mx-auto mb-2 text-emerald-500"
              size={22}
            />

            <p className="text-xl font-bold text-slate-800 dark:text-white">
              {completed}
            </p>

            <span className="text-xs text-slate-500 dark:text-slate-400">
              Completed
            </span>

          </div>

          <div className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-3 text-center">

            <Trophy
              className="mx-auto mb-2 text-yellow-500"
              size={22}
            />

            <p className="text-xl font-bold text-slate-800 dark:text-white">
              {total}
            </p>

            <span className="text-xs text-slate-500 dark:text-slate-400">
              Total Tasks
            </span>

          </div>

        </div>

        {/* Motivation */}

        <div className="mt-auto pt-6">

          <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 px-4 text-center text-white shadow-lg">

            <p className="font-medium text-sm">
              {message}
            </p>

          </div>

        </div>

      </div>

    </motion.div>
  );
}