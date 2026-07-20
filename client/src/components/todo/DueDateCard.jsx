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
      iconBg: "bg-[#F6EEE5] dark:bg-[#5E4B3F]/25",
      iconColor: "text-[#8F6948]",
    },
    {
      title: "Due Today",
      value: dueToday.length,
      icon: Clock3,
      iconBg: "bg-[#F4EBDD] dark:bg-[#6E4A36]/20",
      iconColor: "text-[#A78963]",
    },
    {
      title: "Upcoming",
      value: upcoming.length,
      icon: CalendarClock,
      iconBg: "bg-[#EEF3F6] dark:bg-[#2F4A61]/20",
      iconColor: "text-[#2F4A61]",
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
              Today's Summary
            </h2>

            <p className="mt-1 text-sm text-[#6F6558] dark:text-[#BCB9AC]">
              {today.toLocaleDateString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>

          </div>

          <div className="rounded-2xl bg-[#F2ECE4] p-3 dark:bg-[#343434]">
            <CalendarDays
              size={26}
              className="text-[#2F4A61]"
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
                  border
                  border-[#E5DDD2]
                  bg-[#F7F4EF]
                  p-4
                  transition-all

                  dark:border-[#4B4540]
                  dark:bg-[#343434]
                "
              >
                <div className="flex items-center gap-4">

                  <div className={`${card.iconBg} rounded-2xl p-3`}>
                    <Icon
                      size={20}
                      className={card.iconColor}
                    />
                  </div>

                  <div>

                    <p className="font-semibold text-[#242527] dark:text-[#F7F4EF]">
                      {card.title}
                    </p>

                    <p className="text-sm text-[#6F6558] dark:text-[#BCB9AC]">
                      Active Tasks
                    </p>

                  </div>

                </div>

                <div className="text-3xl font-bold text-[#2F4A61]">
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