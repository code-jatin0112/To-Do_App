import { CheckCircle2, SquareKanban } from "lucide-react";
import { motion } from "framer-motion";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-stone-100 dark:bg-zinc-950 lg:flex">

      {/* Left Panel */}

      <div
        className="
          relative
          hidden
          lg:flex
          w-1/2
          overflow-hidden
          border-r
          border-stone-200
          dark:border-zinc-800
          bg-gradient-to-br
          from-stone-50
          via-white
          to-stone-100
          dark:from-zinc-950
          dark:via-zinc-900
          dark:to-zinc-950
          p-20
          flex-col
          justify-center
        "
      >

        {/* Decorative Blobs */}

        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-stone-200/40 blur-3xl dark:bg-zinc-800/40" />

        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-stone-300/30 blur-3xl dark:bg-zinc-700/30" />

        {/* Logo */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex items-center gap-4"
        >

          <div
            className="
              rounded-2xl
              border
              border-stone-200
              dark:border-zinc-700
              bg-white
              dark:bg-zinc-800
              p-4
              shadow-md
            "
          >
            <SquareKanban
              size={38}
              className="text-stone-700 dark:text-stone-100"
            />
          </div>

          <div>

            <h1 className="text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              TaskFlow
            </h1>

            <p className="mt-1 text-stone-500 dark:text-stone-400">
              Simple. Focused. Productive.
            </p>

          </div>

        </motion.div>

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .1 }}
          className="relative z-10 mt-14"
        >

          <h2 className="max-w-lg text-5xl font-bold leading-tight text-stone-900 dark:text-stone-100">
            Organize your work with clarity.
          </h2>

          <p className="mt-6 max-w-md text-lg leading-8 text-stone-600 dark:text-stone-400">
            Plan tasks, stay on schedule, and focus on what matters most with a calm, distraction-free workspace.
          </p>

        </motion.div>

        {/* Features */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .2 }}
          className="relative z-10 mt-14 space-y-6"
        >

          {[
            "Manage daily tasks effortlessly",
            "Track priorities and deadlines",
            "Stay productive every single day",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-4"
            >
              <div className="rounded-xl bg-emerald-100 p-2 dark:bg-emerald-500/15">
                <CheckCircle2
                  size={18}
                  className="text-emerald-600 dark:text-emerald-400"
                />
              </div>

              <span className="text-lg text-stone-700 dark:text-stone-300">
                {item}
              </span>
            </div>
          ))}

        </motion.div>

        {/* Stats Card */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .3 }}
          className="
            relative
            z-10
            mt-16
            max-w-md
            rounded-3xl
            border
            border-stone-200
            dark:border-zinc-700
            bg-white/80
            dark:bg-zinc-900/70
            p-8
            shadow-xl
            backdrop-blur-md
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-stone-500 dark:text-stone-400">
                Today's Progress
              </p>

              <h3 className="mt-2 text-4xl font-bold text-stone-900 dark:text-stone-100">
                85%
              </h3>

            </div>

            <div className="rounded-2xl bg-emerald-100 px-4 py-2 dark:bg-emerald-500/15">

              <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                Excellent
              </span>

            </div>

          </div>

          <div className="mt-8 h-3 overflow-hidden rounded-full bg-stone-200 dark:bg-zinc-800">

            <div className="h-full w-[85%] rounded-full bg-emerald-400" />

          </div>

          <div className="mt-8 grid grid-cols-2 gap-6">

            <div>

              <p className="text-3xl font-bold text-stone-900 dark:text-stone-100">
                28
              </p>

              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                Completed
              </p>

            </div>

            <div>

              <p className="text-3xl font-bold text-stone-900 dark:text-stone-100">
                5
              </p>

              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                Pending
              </p>

            </div>

          </div>

        </motion.div>

      </div>

      {/* Right Side */}

      <div className="flex flex-1 items-center justify-center p-8 lg:p-12">

        <div className="w-full max-w-md">

          {children}

        </div>

      </div>

    </div>
  );
}