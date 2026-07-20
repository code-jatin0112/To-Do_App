import { motion } from "framer-motion";
import {
  ClipboardList,
  Clock3,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

export default function StatsCards({ todos }) {
  const total = todos.length;

  const pending = todos.filter(
    (todo) => todo.status === "Pending"
  ).length;

  const completed = todos.filter(
    (todo) => todo.status === "Completed"
  ).length;

  const completion =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  const cards = [
    {
      title: "Total Tasks",
      value: total,
      subtitle: "Tasks in workspace",
      icon: ClipboardList,
      accent: "bg-stone-700 dark:bg-stone-300",
      iconBg: "bg-stone-200 dark:bg-zinc-800",
      progress: 100,
    },
    {
      title: "Pending",
      value: pending,
      subtitle: "Need your attention",
      icon: Clock3,
      accent: "bg-amber-300",
      iconBg: "bg-amber-100 dark:bg-amber-500/20",
      progress:
        total === 0 ? 0 : (pending / total) * 100,
    },
    {
      title: "Completed",
      value: completed,
      subtitle: `${completion}% completion`,
      icon: CheckCircle2,
      accent: "bg-emerald-300",
      iconBg: "bg-emerald-100 dark:bg-emerald-500/20",
      progress: completion,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.08,
            }}
            whileHover={{
              y: -6,
              scale: 1.02,
            }}
            className="
              relative
              overflow-hidden
              rounded-3xl
              border
              border-stone-200
              dark:border-zinc-800
              bg-white/70
              dark:bg-zinc-900/70
              backdrop-blur-md
              shadow-lg
              transition-all
            "
          >
            {/* Accent Strip */}

            <div
              className={`absolute left-0 top-0 h-full w-2 ${card.accent}`}
            />

            {/* Decoration */}

            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-stone-200/40 blur-3xl dark:bg-zinc-700/20" />

            <div className="relative p-6">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
                    {card.title}
                  </p>

                  <h2 className="mt-3 text-5xl font-bold text-stone-800 dark:text-stone-100">
                    {card.value}
                  </h2>

                  <div className="mt-5 flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400">
                    <TrendingUp size={15} />
                    {card.subtitle}
                  </div>

                </div>

                <motion.div
                  whileHover={{
                    rotate: 8,
                    scale: 1.08,
                  }}
                  className={`
                    ${card.iconBg}
                    rounded-2xl
                    p-4
                  `}
                >
                  <Icon
                    size={28}
                    className="text-stone-700 dark:text-stone-200"
                  />
                </motion.div>

              </div>

              {/* Progress */}

              <div className="mt-8">

                <div className="h-2 overflow-hidden rounded-full bg-stone-200 dark:bg-zinc-800">

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${card.progress}%`,
                    }}
                    transition={{
                      duration: 1,
                      delay: .2,
                    }}
                    className={`h-full rounded-full ${card.accent}`}
                  />

                </div>

              </div>

            </div>

          </motion.div>
        );
      })}
    </div>
  );
}