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
        border-[#BCB9AC]
        bg-[#FCFBF8]
        p-6
        shadow-xl
        shadow-[#BCB9AC]/15

        dark:border-[#4B4540]
        dark:bg-[#2B2B2B]
      "
    >
      <div className="flex h-full flex-col">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-[#242527] dark:text-[#F7F4EF]">
              Task Progress
            </h2>

            <p className="mt-1 text-sm text-[#6F6558] dark:text-[#BCB9AC]">
              Track your overall productivity.
            </p>

          </div>

          <div className="rounded-2xl bg-[#F2ECE4] p-3 dark:bg-[#343434]">
            <Target
              size={26}
              className="text-[#2F4A61]"
            />
          </div>

        </div>

        {/* Progress Circle */}

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
                stroke="#DDD6CC"
                fill="transparent"
              />

              <motion.circle
                cx="72"
                cy="72"
                r={radius}
                strokeWidth="10"
                fill="transparent"
                stroke="#2F4A61"
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

              <h2 className="text-4xl font-bold text-[#242527] dark:text-[#F7F4EF]">
                {percentage}%
              </h2>

              <span className="mt-1 text-xs text-[#6F6558] dark:text-[#BCB9AC]">
                Completed
              </span>

            </div>

          </div>

        </div>

        {/* Progress Bar */}

        <div className="mt-8">

          <div className="mb-2 flex justify-between text-sm text-[#6F6558] dark:text-[#BCB9AC]">
            <span>Overall Progress</span>
            <span>{percentage}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-[#DDD6CC] dark:bg-[#3D3D3D]">

            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${percentage}%`,
              }}
              transition={{
                duration: 1,
              }}
              className="h-full rounded-full bg-[#2F4A61]"
            />

          </div>

        </div>

        {/* Stats */}

        <div className="mt-8 grid grid-cols-2 gap-4">

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="
              rounded-2xl
              border
              border-[#E5DDD2]
              bg-[#F7F4EF]
              p-4
              text-center

              dark:border-[#4B4540]
              dark:bg-[#343434]
            "
          >

            <CheckCircle2
              size={22}
              className="mx-auto mb-2 text-[#2F4A61]"
            />

            <p className="text-2xl font-bold text-[#242527] dark:text-[#F7F4EF]">
              {completed}
            </p>

            <span className="text-xs text-[#6F6558] dark:text-[#BCB9AC]">
              Completed
            </span>

          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="
              rounded-2xl
              border
              border-[#E5DDD2]
              bg-[#F7F4EF]
              p-4
              text-center

              dark:border-[#4B4540]
              dark:bg-[#343434]
            "
          >

            <Trophy
              size={22}
              className="mx-auto mb-2 text-[#A78963]"
            />

            <p className="text-2xl font-bold text-[#242527] dark:text-[#F7F4EF]">
              {total}
            </p>

            <span className="text-xs text-[#6F6558] dark:text-[#BCB9AC]">
              Total Tasks
            </span>

          </motion.div>

        </div>

        {/* Footer */}

        <div className="mt-auto pt-8">

          <div
            className="
              rounded-2xl
              border
              border-[#BCB9AC]
              bg-[#F2ECE4]
              px-5
              py-4
              text-center

              dark:border-[#4B4540]
              dark:bg-[#343434]
            "
          >

            <p className="text-sm font-medium text-[#6F6558] dark:text-[#D8D2CA]">
              {message}
            </p>

          </div>

        </div>

      </div>
    </motion.div>
  );
}