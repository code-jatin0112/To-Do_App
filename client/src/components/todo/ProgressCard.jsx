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
      ? "You're almost there."
      : percentage >= 50
      ? "Keep the momentum going."
      : percentage > 0
      ? "Every task completed counts."
      : "Create your first task to begin.";

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -4,
        scale: 1.015,
      }}
      className="
        h-full
        rounded-3xl
        border
        border-stone-200
        dark:border-zinc-800
        bg-white/70
        dark:bg-zinc-900/70
        backdrop-blur-md
        shadow-lg
        p-6
      "
    >
      <div className="flex h-full flex-col">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100">
              Task Progress
            </h2>

            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              Track your overall productivity.
            </p>

          </div>

          <div className="rounded-2xl bg-stone-200 p-3 dark:bg-zinc-800">
            <Target
              size={26}
              className="text-stone-700 dark:text-stone-200"
            />
          </div>

        </div>

        {/* Circle */}

        <div className="mt-8 flex justify-center">

          <div className="relative h-36 w-36">

            <svg
              width="144"
              height="144"
              className="-rotate-90"
            >

              <circle
                cx="72"
                cy="72"
                r={radius}
                strokeWidth="10"
                stroke="#e7e5e4"
                fill="transparent"
              />

              <motion.circle
                cx="72"
                cy="72"
                r={radius}
                strokeWidth="10"
                fill="transparent"
                stroke="#10b981"
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

            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">

              <h2 className="text-4xl font-bold text-stone-800 dark:text-stone-100">
                {percentage}%
              </h2>

              <span className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                Completed
              </span>

            </div>

          </div>

        </div>

        {/* Progress */}

        <div className="mt-8">

          <div className="mb-2 flex justify-between text-sm text-stone-500 dark:text-stone-400">
            <span>Overall Progress</span>
            <span>{percentage}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-stone-200 dark:bg-zinc-800">

            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${percentage}%`,
              }}
              transition={{
                duration: 1,
              }}
              className="h-full rounded-full bg-emerald-400"
            />

          </div>

        </div>

        {/* Stats */}

        <div className="mt-8 grid grid-cols-2 gap-4">

          <div className="rounded-2xl bg-stone-100 p-4 text-center dark:bg-zinc-800">

            <CheckCircle2
              size={22}
              className="mx-auto mb-2 text-emerald-500"
            />

            <p className="text-2xl font-bold text-stone-800 dark:text-stone-100">
              {completed}
            </p>

            <span className="text-xs text-stone-500 dark:text-stone-400">
              Completed
            </span>

          </div>

          <div className="rounded-2xl bg-stone-100 p-4 text-center dark:bg-zinc-800">

            <Trophy
              size={22}
              className="mx-auto mb-2 text-amber-500"
            />

            <p className="text-2xl font-bold text-stone-800 dark:text-stone-100">
              {total}
            </p>

            <span className="text-xs text-stone-500 dark:text-stone-400">
              Total Tasks
            </span>

          </div>

        </div>

        {/* Footer */}

        <div className="mt-auto pt-8">

          <div className="
            rounded-2xl
            border
            border-stone-200
            dark:border-zinc-800
            bg-stone-100
            dark:bg-zinc-800
            px-5
            py-4
            text-center
          ">

            <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
              {message}
            </p>

          </div>

        </div>

      </div>
    </motion.div>
  );
}