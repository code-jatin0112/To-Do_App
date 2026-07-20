import { CheckCircle2, SquareKanban } from "lucide-react";
import { motion } from "framer-motion";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F7F4EF] dark:bg-[#242527] lg:flex">

      {/* Left Panel */}

      <div
        className="
          relative
          hidden
          w-1/2
          overflow-hidden
          border-r
          border-[#D7D0C6]
          bg-gradient-to-br
          from-[#F7F4EF]
          via-[#FDFBF8]
          to-[#F2ECE4]
          p-20
          lg:flex
          flex-col
          justify-center

          dark:border-[#4B4540]
          dark:from-[#242527]
          dark:via-[#2B2B2B]
          dark:to-[#343434]
        "
      >
        {/* Decorative Background */}

        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#D8C8B8]/35 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#5F8396]/10 blur-3xl" />

        {/* Logo */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex items-center gap-5"
        >
          <div
            className="
              rounded-3xl
              border
              border-[#BCB9AC]
              bg-[#FCFBF8]
              p-5
              shadow-lg
              shadow-[#BCB9AC]/20

              dark:border-[#4B4540]
              dark:bg-[#2F2F2F]
            "
          >
            <SquareKanban
              size={40}
              className="text-[#2F4A61]"
            />
          </div>

          <div>
            <h1 className="text-5xl font-bold tracking-tight text-[#242527] dark:text-[#F7F4EF]">
              TaskFlow
            </h1>

            <p className="mt-2 text-[#6F6558] dark:text-[#BCB9AC]">
              Work beautifully. Stay organized.
            </p>
          </div>
        </motion.div>

        {/* Hero */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative z-10 mt-16"
        >
          <h2 className="max-w-lg text-5xl font-bold leading-tight text-[#242527] dark:text-[#F7F4EF]">
            Organize your work with calm and clarity.
          </h2>

          <p className="mt-6 max-w-md text-lg leading-8 text-[#6F6558] dark:text-[#BCB9AC]">
            A premium workspace that helps you focus on what truly matters—
            tasks, goals, and consistent progress.
          </p>
        </motion.div>

        {/* Features */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 mt-14 space-y-6"
        >
          {[
            "Plan your day effortlessly",
            "Track priorities with confidence",
            "Build consistent productivity",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-4"
            >
              <div className="rounded-xl bg-[#E7EEE9] p-2 dark:bg-[#355447]/40">
                <CheckCircle2
                  size={18}
                  className="text-[#5C7A5A]"
                />
              </div>

              <span className="text-lg text-[#4D4B48] dark:text-[#D8D2CA]">
                {item}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Progress Card */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="
            relative
            z-10
            mt-16
            max-w-md
            rounded-3xl
            border
            border-[#D7D0C6]
            bg-[#FCFBF8]/90
            p-8
            shadow-xl
            shadow-[#BCB9AC]/20
            backdrop-blur-xl

            dark:border-[#4B4540]
            dark:bg-[#2E2E2E]/90
          "
        >
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-[#8A8177]">
                Today's Progress
              </p>

              <h3 className="mt-2 text-4xl font-bold text-[#242527] dark:text-[#F7F4EF]">
                85%
              </h3>
            </div>

            <div className="rounded-2xl bg-[#E7EEE9] px-4 py-2">
              <span className="text-sm font-semibold text-[#5C7A5A]">
                Excellent
              </span>
            </div>

          </div>

          <div className="mt-8 h-3 overflow-hidden rounded-full bg-[#DDD6CC]">
            <div className="h-full w-[85%] rounded-full bg-[#2F4A61]" />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-6">

            <div>
              <p className="text-3xl font-bold text-[#242527] dark:text-[#F7F4EF]">
                28
              </p>

              <p className="mt-1 text-sm text-[#8A8177]">
                Completed
              </p>
            </div>

            <div>
              <p className="text-3xl font-bold text-[#242527] dark:text-[#F7F4EF]">
                5
              </p>

              <p className="mt-1 text-sm text-[#8A8177]">
                Pending
              </p>
            </div>

          </div>
        </motion.div>
      </div>

      {/* Right */}

      <div className="flex flex-1 items-center justify-center p-8 lg:p-12">

        <div
          className="
            w-full
            max-w-md
            rounded-[32px]
            border
            border-[#D7D0C6]
            bg-[#FCFBF8]/90
            p-8
            shadow-xl
            shadow-[#BCB9AC]/20
            backdrop-blur-xl

            dark:border-[#4B4540]
            dark:bg-[#2E2E2E]/90
          "
        >
          {children}
        </div>

      </div>
    </div>
  );
}