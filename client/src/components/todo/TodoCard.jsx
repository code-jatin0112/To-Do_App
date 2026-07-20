import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Pencil,
  Trash2,
  CheckCircle2,
  Circle,
  Flag,
  Clock3,
  Tag,
  Star,
  Archive,
  FileText,
  CheckSquare,
  Square,
} from "lucide-react";

export default function TodoCard({
  todo,
  onDelete,
  onEdit,
  onToggleStatus,
}) {

  const priorityStyle = {
    High: {
      badge:
        "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
      border: "border-l-rose-400",
    },

    Medium: {
      badge:
        "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
      border: "border-l-amber-400",
    },

    Low: {
      badge:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
      border: "border-l-emerald-400",
    },
  };

  const statusStyle = {
    Completed:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",

    Pending:
      "bg-[#E7DDD2] text-[#2F4A61] dark:bg-[#343434] dark:text-[#BCB9AC]",
  };

  const getRelativeDate = (date) => {
    if (!date) {
      return {
        label: "No Due Date",
        color:
          "bg-[#E7DDD2] text-[#2F4A61] dark:bg-[#343434] dark:text-[#BCB9AC]",
      };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(date);
    due.setHours(0, 0, 0, 0);

    const diff = Math.ceil(
      (due - today) / (1000 * 60 * 60 * 24)
    );

    if (diff === 0) {
      return {
        label: "Today",
        color:
          "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
      };
    }

    if (diff === 1) {
      return {
        label: "Tomorrow",
        color:
          "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
      };
    }

    if (diff > 1) {
      return {
        label: `${diff} days left`,
        color:
          "bg-[#E7DDD2] text-[#2F4A61] dark:bg-[#343434] dark:text-[#BCB9AC]",
      };
    }

    return {
      label: `${Math.abs(diff)} days overdue`,
      color:
        "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
    };
  };

  const relativeDate = getRelativeDate(todo.dueDate);

  const completedSubtasks =
    todo.subtasks?.filter((task) => task.completed).length || 0;

  const totalSubtasks = todo.subtasks?.length || 0;

  const progress =
    totalSubtasks === 0
      ? 0
      : (completedSubtasks / totalSubtasks) * 100;

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        y: 18,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: .95,
      }}
      whileHover={{
        y: -6,
      }}
      className={`
        group
        relative
        overflow-hidden
        rounded-3xl
        border-l-4
        ${priorityStyle[todo.priority]?.border}
        border
        border-[#BCB9AC]/60
        dark:border-[#4B4540]
        bg-[#FCFBF8]/90
        dark:bg-[#2B2B2B]/70
        backdrop-blur-md
        shadow-lg
        transition-all
        duration-300
      `}
    >

      {/* Decorative Background */}

      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#E7DDD2]/40 blur-3xl dark:bg-zinc-700/10" />

      {/* Favorite */}

      {todo.favorite && (
        <div className="absolute right-5 top-5">
          <Star
            size={20}
            className="fill-amber-400 text-amber-400"
          />
        </div>
      )}

      {/* Archived */}

      {todo.archived && (
        <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-white dark:bg-[#E7DDD2] dark:text-zinc-900">
          <Archive size={12}/>
          Archived
        </div>
      )}

      <div className="relative p-6">
                {/* Header */}

        <div className="flex items-start justify-between gap-5">

          <div className="flex-1">

            <h2
              className={`text-2xl font-bold tracking-tight transition-colors ${
                todo.status === "Completed"
                  ? "text-[#A78963] line-through"
                  : "text-[#242527] dark:text-[#F7F4EF]"
              }`}
            >
              {todo.title}
            </h2>

            <p className="mt-3 leading-7 text-[#6F6558] dark:text-[#A78963]">
              {todo.description || "No description provided."}
            </p>

            {/* Notes */}

            {todo.notes && (
              <div
                className="
                  mt-5
                  rounded-2xl
                  border
                  border-[#BCB9AC]/60
                  dark:border-[#4B4540]
                  bg-[#F2ECE4]
                  dark:bg-[#343434]
                  p-4
                "
              >

                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#2F4A61] dark:text-[#F7F4EF]">

                  <FileText
                    size={16}
                    className="text-[#6F6558]"
                  />

                  Notes

                </div>

                <p className="text-sm leading-6 text-[#6F6558] dark:text-[#BCB9AC]">
                  {todo.notes}
                </p>

              </div>
            )}

          </div>

          {/* Status Toggle */}

          <motion.button
            whileHover={{
              scale: 1.08,
            }}
            whileTap={{
              scale: .92,
            }}
            onClick={() => onToggleStatus(todo)}
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-[#F2ECE4]
              dark:bg-[#343434]
              transition-colors
              hover:bg-[#E7DDD2]
              dark:hover:bg-zinc-700
            "
          >
            {todo.status === "Completed" ? (
              <CheckCircle2
                size={28}
                className="text-emerald-500"
              />
            ) : (
              <Circle
                size={28}
                className="text-[#A78963]"
              />
            )}
          </motion.button>

        </div>

        {/* Status Chips */}

        <div className="mt-7 flex flex-wrap gap-3">

          <span
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
              priorityStyle[todo.priority]?.badge
            }`}
          >
            <Flag size={15} />
            {todo.priority}
          </span>

          <span
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              statusStyle[todo.status]
            }`}
          >
            {todo.status}
          </span>

          <span
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${relativeDate.color}`}
          >
            <CalendarDays size={15} />
            {relativeDate.label}
          </span>

        </div>
                {/* Labels */}

        {todo.labels?.length > 0 && (
          <div className="mt-7">

            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#2F4A61] dark:text-[#BCB9AC]">

              <Tag
                size={15}
                className="text-[#6F6558]"
              />

              Labels

            </div>

            <div className="flex flex-wrap gap-2">

              {todo.labels.map((label) => (
                <span
                  key={label}
                  className="
                    rounded-full
                    border
                    border-[#BCB9AC]/60
                    dark:border-[#4B4540]
                    bg-[#F2ECE4]
                    dark:bg-[#343434]
                    px-3
                    py-1.5
                    text-xs
                    font-medium
                    text-[#2F4A61]
                    dark:text-[#BCB9AC]
                  "
                >
                  #{label}
                </span>
              ))}

            </div>

          </div>
        )}

        {/* Progress */}

        {totalSubtasks > 0 && (
          <div className="mt-7">

            <div className="mb-3 flex items-center justify-between">

              <span className="text-sm font-semibold text-[#2F4A61] dark:text-[#BCB9AC]">
                Progress
              </span>

              <span className="text-sm text-[#6F6558] dark:text-[#A78963]">
                {completedSubtasks} / {totalSubtasks}
              </span>

            </div>

            <div className="h-2 overflow-hidden rounded-full bg-[#E7DDD2] dark:bg-[#343434]">

              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: `${progress}%`,
                }}
                transition={{
                  duration: .6,
                }}
                className="h-full rounded-full bg-emerald-400"
              />

            </div>

          </div>
        )}

        {/* Subtasks */}

        {totalSubtasks > 0 && (
          <div className="mt-7">

            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#2F4A61] dark:text-[#BCB9AC]">

              <CheckSquare
                size={16}
                className="text-[#6F6558]"
              />

              Subtasks

            </div>

            <AnimatePresence>

              <div className="space-y-3">

                {todo.subtasks.map((task, index) => (

                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      x: -12,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{
                      delay: index * .04,
                    }}
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      border
                      border-[#BCB9AC]/60
                      dark:border-[#4B4540]
                      bg-[#F2ECE4]
                      dark:bg-[#343434]
                      px-4
                      py-3
                    "
                  >

                    {task.completed ? (

                      <CheckSquare
                        size={18}
                        className="text-emerald-500"
                      />

                    ) : (

                      <Square
                        size={18}
                        className="text-[#A78963]"
                      />

                    )}

                    <span
                      className={`text-sm transition-colors ${
                        task.completed
                          ? "line-through text-[#A78963]"
                          : "text-[#2F4A61] dark:text-[#F7F4EF]"
                      }`}
                    >
                      {task.title}
                    </span>

                  </motion.div>

                ))}

              </div>

            </AnimatePresence>

          </div>
        )}
                {/* Footer */}

        <div
          className="
            mt-8
            border-t
            border-[#BCB9AC]/60
            dark:border-[#4B4540]
            pt-6
          "
        >

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            {/* Dates */}

            <div className="space-y-3 text-sm text-[#6F6558] dark:text-[#A78963]">

              <div className="flex items-center gap-2">

                <Clock3
                  size={16}
                  className="text-[#A78963]"
                />

                <span>

                  Due:&nbsp;

                  {todo.dueDate
                    ? new Date(todo.dueDate).toLocaleDateString()
                    : "No Due Date"}

                </span>

              </div>

              <div>

                Created:&nbsp;

                {new Date(todo.createdAt).toLocaleDateString()}

              </div>

              <div>

                Updated:&nbsp;

                {new Date(todo.updatedAt).toLocaleDateString()}

              </div>

            </div>

            {/* Action Buttons */}

            <div className="flex items-center gap-3">

              <motion.button
                whileHover={{
                  scale: 1.04,
                }}
                whileTap={{
                  scale: .96,
                }}
                onClick={() => onEdit(todo)}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-2xl
                  border
                  border-[#BCB9AC]/60
                  dark:border-[#4B4540]
                  bg-[#F2ECE4]
                  dark:bg-[#343434]
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-[#2F4A61]
                  dark:text-[#F7F4EF]
                  transition-all
                  hover:bg-[#E7DDD2]
                  dark:hover:bg-zinc-700
                "
              >

                <Pencil size={16} />

                Edit

              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.04,
                }}
                whileTap={{
                  scale: .96,
                }}
                onClick={() => onDelete(todo._id)}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-2xl
                  bg-rose-500
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-white
                  shadow-sm
                  transition-all
                  hover:bg-rose-600
                "
              >

                <Trash2 size={16} />

                Delete

              </motion.button>

            </div>

          </div>

        </div>

      </div>

    </motion.div>
  );
}