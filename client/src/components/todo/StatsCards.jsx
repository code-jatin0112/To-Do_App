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
      accent: "bg-[#2F4A61]",
      iconBg: "bg-[#EEF3F6]",
      iconColor: "text-[#2F4A61]",
      progress: 100,
    },
    {
      title: "Pending",
      value: pending,
      subtitle: "Need your attention",
      icon: Clock3,
      accent: "bg-[#A78963]",
      iconBg: "bg-[#F6EEE5]",
      iconColor: "text-[#A78963]",
      progress:
        total === 0 ? 0 : (pending / total) * 100,
    },
    {
      title: "Completed",
      value: completed,
      subtitle: `${completion}% completion`,
      icon: CheckCircle2,
      accent: "bg-[#5F8396]",
      iconBg: "bg-[#EDF4F7]",
      iconColor: "text-[#5F8396]",
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
              border-[#BCB9AC]
              bg-[#FCFBF8]
              shadow-xl
              shadow-[#BCB9AC]/15
              transition-all

              dark:border-[#4B4540]
              dark:bg-[#2B2B2B]
            "
          >
            {/* Accent Strip */}

            <div
              className={`absolute left-0 top-0 h-full w-2 ${card.accent}`}
            />

            {/* Decorative Blob */}

            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#F2ECE4] blur-3xl dark:bg-[#3B3B3B]" />

            <div className="relative p-6">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-semibold uppercase tracking-wide text-[#6F6558] dark:text-[#BCB9AC]">
                    {card.title}
                  </p>

                  <h2 className="mt-3 text-5xl font-bold text-[#242527] dark:text-[#F7F4EF]">
                    {card.value}
                  </h2>

                  <div className="mt-5 flex items-center gap-2 text-sm text-[#8A8177] dark:text-[#BCB9AC]">
                    <TrendingUp
                      size={15}
                      className="text-[#A78963]"
                    />
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
                    className={card.iconColor}
                  />
                </motion.div>

              </div>

              {/* Progress */}

              <div className="mt-8">

                <div className="h-2 overflow-hidden rounded-full bg-[#DDD6CC] dark:bg-[#3D3D3D]">

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${card.progress}%`,
                    }}
                    transition={{
                      duration: 1,
                      delay: 0.2,
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