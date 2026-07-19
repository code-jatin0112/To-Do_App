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
      bg: "bg-red-100 dark:bg-red-500/20",
      color: "text-red-600 dark:text-red-300",
    },
    {
      title: "Due Today",
      value: dueToday.length,
      icon: Clock3,
      bg: "bg-yellow-100 dark:bg-yellow-500/20",
      color: "text-yellow-600 dark:text-yellow-300",
    },
    {
      title: "Upcoming",
      value: upcoming.length,
      icon: CalendarClock,
      bg: "bg-emerald-100 dark:bg-emerald-500/20",
      color: "text-emerald-600 dark:text-emerald-300",
    },
  ];

  const message =
    overdue.length > 0
      ? "⚠️ You have overdue tasks. Time to catch up!"
      : dueToday.length > 0
      ? "📌 Focus on today's tasks first."
      : "🎉 You're all caught up. Great work!";

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/40 dark:border-slate-700 shadow-xl p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Today's Summary
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {today.toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="rounded-2xl bg-indigo-100 dark:bg-indigo-500/20 p-3">
          <CalendarDays
            size={28}
            className="text-indigo-600 dark:text-indigo-400"
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
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.1,
              }}
              whileHover={{
                scale: 1.02,
              }}
              className="flex items-center justify-between rounded-2xl bg-slate-100 dark:bg-slate-800 p-4"
            >
              <div className="flex items-center gap-4">
                <div className={`${card.bg} rounded-xl p-3`}>
                  <Icon
                    size={22}
                    className={card.color}
                  />
                </div>

                <div>
                  <p className="font-semibold text-slate-800 dark:text-white">
                    {card.title}
                  </p>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Active tasks
                  </p>
                </div>
              </div>

              <div className={`text-3xl font-bold ${card.color}`}>
                {card.value}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-4 text-center text-white shadow-lg">
        <p className="font-medium">
          {message}
        </p>
      </div>
    </motion.div>
  );
}