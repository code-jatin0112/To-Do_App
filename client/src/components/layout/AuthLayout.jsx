import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Sparkles,
  SquareKanban,
  Target,
  TrendingUp,
} from "lucide-react";

export default function AuthLayout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950" />

        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-indigo-600/30 blur-[150px]"
        />

        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-0 top-1/3 h-[450px] w-[450px] rounded-full bg-fuchsia-600/20 blur-[160px]"
        />

        <motion.div
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
          }}
          className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-500/20 blur-[120px]"
        />

      </div>

      <div className="relative z-10 flex min-h-screen">

        {/* Left Section */}

        <div className="hidden lg:flex w-1/2 items-center px-20 py-16">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .8 }}
            className="max-w-xl"
          >

            {/* Logo */}

            <div className="flex items-center gap-5">

              <motion.div
                whileHover={{
                  rotate: 8,
                  scale: 1.05,
                }}
                className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-2xl"
              >

                <SquareKanban
                  size={42}
                  className="text-white"
                />

              </motion.div>

              <div>

                <h1 className="bg-gradient-to-r from-white via-indigo-100 to-violet-300 bg-clip-text text-6xl font-black text-transparent">
                  TaskFlow
                </h1>

                <p className="mt-2 text-indigo-200">
                  Productivity Workspace
                </p>

              </div>

            </div>

            {/* Hero */}

            <div className="mt-12">

              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-white/10 px-5 py-2 backdrop-blur-xl">

                <Sparkles
                  size={16}
                  className="text-yellow-300"
                />

                <span className="text-sm text-indigo-100">
                  Smart Productivity Platform
                </span>

              </div>

              <h2 className="mt-8 text-6xl font-black leading-tight text-white">

                Organize.

                <br />

                Prioritize.

                <br />

                <span className="bg-gradient-to-r from-indigo-300 to-fuchsia-300 bg-clip-text text-transparent">
                  Achieve More.
                </span>

              </h2>

              <p className="mt-8 max-w-lg text-lg leading-8 text-slate-300">
                Stay focused with beautifully designed task
                management. Plan your day, organize projects,
                monitor progress and accomplish your goals from
                one modern workspace.
              </p>

            </div>

            {/* Features */}

            <div className="mt-14 space-y-5">

              {[
                {
                  icon: CheckCircle2,
                  title: "Smart Task Management",
                },
                {
                  icon: Target,
                  title: "Priority Planning",
                },
                {
                  icon: TrendingUp,
                  title: "Real-Time Analytics",
                },
                {
                  icon: Clock3,
                  title: "Deadline Tracking",
                },
              ].map((item) => {

                const Icon = item.icon;

                return (

                  <motion.div
                    key={item.title}
                    whileHover={{ x: 8 }}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
                  >

                    <div className="rounded-xl bg-indigo-500/20 p-3">

                      <Icon
                        size={20}
                        className="text-indigo-300"
                      />

                    </div>

                    <span className="text-lg font-medium text-white">
                      {item.title}
                    </span>

                  </motion.div>

                );

              })}
            </div>

                        {/* Progress Card */}

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative mt-14 overflow-hidden rounded-[32px] border border-white/10 bg-white/10 p-8 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,.35)]"
            >

              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />
              <div className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl" />

              <div className="relative">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm uppercase tracking-widest text-indigo-200">
                      Today's Progress
                    </p>

                    <h3 className="mt-2 text-5xl font-black text-white">
                      85%
                    </h3>

                  </div>

                  <div className="rounded-2xl bg-emerald-500/20 px-4 py-2">

                    <span className="font-semibold text-emerald-300">
                      +12%
                    </span>

                  </div>

                </div>

                <div className="mt-8">

                  <div className="h-3 overflow-hidden rounded-full bg-white/10">

                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 1.5 }}
                      className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400"
                    />

                  </div>

                </div>

                <div className="mt-10 grid grid-cols-3 gap-6">

                  <div>

                    <p className="text-3xl font-bold text-white">
                      28
                    </p>

                    <p className="mt-1 text-sm text-slate-300">
                      Completed
                    </p>

                  </div>

                  <div>

                    <p className="text-3xl font-bold text-white">
                      5
                    </p>

                    <p className="mt-1 text-sm text-slate-300">
                      Pending
                    </p>

                  </div>

                  <div>

                    <p className="text-3xl font-bold text-white">
                      93%
                    </p>

                    <p className="mt-1 text-sm text-slate-300">
                      Efficiency
                    </p>

                  </div>

                </div>

              </div>

            </motion.div>

            {/* CTA */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex items-center gap-4"
            >

              <button
                className="group flex items-center gap-2 rounded-2xl bg-white px-6 py-4 font-semibold text-slate-900 transition-all duration-300 hover:scale-105"
              >

                Get Started

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />

              </button>

              <span className="text-slate-400">
                Trusted by thousands of productive teams.
              </span>

            </motion.div>

          </motion.div>

        </div>

        {/* Right Section */}

        <div className="relative flex flex-1 items-center justify-center px-8 py-16">

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-lg"
          >

            {children}

                      </motion.div>

        </div>

      </div>

      {/* Floating Decorations */}

      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 8, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-16 top-24 hidden h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl lg:flex"
      >
        <CheckCircle2
          size={32}
          className="text-emerald-400"
        />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -8, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-20 top-32 hidden h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl lg:flex"
      >
        <Target
          size={26}
          className="text-indigo-300"
        />
      </motion.div>

      <motion.div
        animate={{
          y: [0, -12, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 right-24 hidden h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl lg:flex"
      >
        <TrendingUp
          size={30}
          className="text-fuchsia-300"
        />
      </motion.div>

      {/* Small Grid Overlay */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

    </div>
  );
}