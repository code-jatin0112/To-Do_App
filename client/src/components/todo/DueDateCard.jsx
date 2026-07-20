import { motion } from "framer-motion";
import {
  CalendarDays,
  AlertTriangle,
  Clock3,
  CalendarClock,
} from "lucide-react";

export default function DueDateCard({ todos }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const overdue = todos.filter((todo) => {
    if (!todo.dueDate || todo.status === "Completed") return false;

    const due = new Date(todo.dueDate);
    due.setHours(0, 0, 0, 0);

    return due < today;
  });

  const dueToday = todos.filter((todo) => {
    if (!todo.dueDate || todo.status === "Completed") return false;

    const due = new Date(todo.dueDate);
    due.setHours(0, 0, 0, 0);

    return due.getTime() === today.getTime();
  });

  const upcoming = todos.filter((todo) => {
    if (!todo.dueDate || todo.status === "Completed") return false;

    const due = new Date(todo.dueDate);
    due.setHours(0, 0, 0, 0);

    return due > today;
  });

  const cards = [
    {
      title: "Overdue",
      value: overdue.length,
      icon: AlertTriangle,
      iconBg: "bg-rose-100 dark:bg-rose-500/15",
      iconColor: "text-rose-500",
    },
    {
      title: "Due Today",
      value: dueToday.length,
      icon: Clock3,
      iconBg: "bg-amber-100 dark:bg-amber-500/15",
      iconColor: "text-amber-500",
    },
    {
      title: "Upcoming",
      value: upcoming.length,
      icon: CalendarClock,
      iconBg: "bg-emerald-100 dark:bg-emerald-500/15",
      iconColor: "text-emerald-500",
    },
  ];

  const message =
    overdue.length > 0
      ? "You have overdue tasks. Let's clear them first."
      : dueToday.length > 0
      ? "Focus on today's priorities."
      : "Everything looks under control.";

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
              Today's Summary
            </h2>

            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              {today.toLocaleDateString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>

          </div>

          <div className="rounded-2xl bg-stone-200 p-3 dark:bg-zinc-800">
            <CalendarDays
              size={26}
              className="text-stone-700 dark:text-stone-200"
            />
          </div>

        </div>

        {/* Stats */}

        <div className="mt-8 space-y-4">

          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                initial={{
                  opacity: 0,
                  x: -15,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                whileHover={{
                  scale: 1.02,
                }}
                className="
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  bg-stone-100
                  dark:bg-zinc-800
                  p-4
                "
              >
                <div className="flex items-center gap-4">

                  <div
                    className={`${card.iconBg} rounded-2xl p-3`}
                  >
                    <Icon
                      size={20}
                      className={card.iconColor}
                    />
                  </div>

                  <div>

                    <p className="font-semibold text-stone-800 dark:text-stone-100">
                      {card.title}
                    </p>

                    <p className="text-sm text-stone-500 dark:text-stone-400">
                      Active Tasks
                    </p>

                  </div>

                </div>

                <div className="text-3xl font-bold text-stone-800 dark:text-stone-100">
                  {card.value}
                </div>

              </motion.div>
            );
          })}

        </div>

        {/* Footer */}

        <div className="mt-auto pt-8">

          <div
            className="
              rounded-2xl
              border
              border-stone-200
              dark:border-zinc-800
              bg-stone-100
              dark:bg-zinc-800
              px-5
              py-4
              text-center
            "
          >
            <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
              {message}
            </p>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
