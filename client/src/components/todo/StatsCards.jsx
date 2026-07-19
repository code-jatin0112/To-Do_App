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
      gradient: "from-indigo-600 via-indigo-500 to-violet-500",
      iconBg: "bg-white/20",
    },
    {
      title: "Pending",
      value: pending,
      subtitle: "Need your attention",
      icon: Clock3,
      gradient: "from-amber-500 via-orange-500 to-red-500",
      iconBg: "bg-white/20",
    },
    {
      title: "Completed",
      value: completed,
      subtitle: `${completion}% completion rate`,
      icon: CheckCircle2,
      gradient: "from-emerald-500 via-green-500 to-teal-500",
      iconBg: "bg-white/20",
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
              duration: 0.35,
            }}
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${card.gradient} p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300`}
          >
            {/* Decorative Background */}
            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10 blur-xl" />

            <div className="absolute -left-12 -bottom-12 h-28 w-28 rounded-full bg-black/10 dark:bg-white/5 blur-xl" />

            <div className="relative flex items-start justify-between">
              {/* Left */}
              <div className="flex-1">
                <p className="text-sm font-semibold tracking-wide text-white/80 uppercase">
                  {card.title}
                </p>

                <h2 className="mt-3 text-5xl font-extrabold tracking-tight">
                  {card.value}
                </h2>

                <div className="mt-5 flex items-center gap-2 text-sm text-white/90">
                  <TrendingUp size={16} />
                  <span>{card.subtitle}</span>
                </div>

                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="h-2 rounded-full bg-white/20 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width:
                          card.title === "Completed"
                            ? `${completion}%`
                            : card.title === "Pending"
                            ? total === 0
                              ? "0%"
                              : `${(pending / total) * 100}%`
                            : "100%",
                      }}
                      transition={{
                        duration: 1,
                        delay: 0.3 + index * 0.15,
                      }}
                      className="h-full rounded-full bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Icon */}
              <motion.div
                whileHover={{
                  rotate: 10,
                  scale: 1.1,
                }}
                className={`${card.iconBg} backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/20`}
              >
                <Icon
                  size={30}
                  className="text-white"
                />
              </motion.div>
            </div>

            {/* Bottom Decoration */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 1.2,
                  delay: index * 0.2,
                }}
                className="h-full bg-white"
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}