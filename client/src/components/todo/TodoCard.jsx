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
  const priorityColor = {
    High: {
      badge:
        "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300",
      border: "border-l-red-500",
    },
    Medium: {
      badge:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300",
      border: "border-l-yellow-500",
    },
    Low: {
      badge:
        "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300",
      border: "border-l-green-500",
    },
  };

  const statusColor = {
    Completed:
      "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300",
    Pending:
      "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300",
  };

  const getRelativeDate = (date) => {
    if (!date)
      return {
        label: "No Due Date",
        color:
          "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
      };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(date);
    due.setHours(0, 0, 0, 0);

    const diff = Math.ceil(
      (due - today) / (1000 * 60 * 60 * 24)
    );

    if (diff === 0)
      return {
        label: "Today",
        color:
          "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300",
      };

    if (diff === 1)
      return {
        label: "Tomorrow",
        color:
          "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300",
      };

    if (diff > 1)
      return {
        label: `${diff} days left`,
        color:
          "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
      };

    return {
      label: `${Math.abs(diff)} days overdue`,
      color:
        "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300",
    };
  };

  const relativeDate = getRelativeDate(todo.dueDate);

  const completedSubtasks =
    todo.subtasks?.filter((item) => item.completed).length || 0;

  const totalSubtasks = todo.subtasks?.length || 0;

  const progress =
    totalSubtasks === 0
      ? 0
      : (completedSubtasks / totalSubtasks) * 100;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      className={`group relative overflow-hidden rounded-3xl border-l-8 ${
        priorityColor[todo.priority]?.border
      } border border-white/40 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl transition hover:shadow-2xl`}
    >
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-indigo-500/10 blur-3xl" />

      {todo.favorite && (
        <div className="absolute right-4 top-4">
          <Star
            size={22}
            className="fill-yellow-400 text-yellow-400"
          />
        </div>
      )}

      {todo.archived && (
        <div className="absolute left-4 top-4 rounded-full bg-slate-700 px-3 py-1 text-xs text-white">
          Archived
        </div>
      )}

      <div className="relative p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h2
              className={`text-2xl font-bold ${
                todo.status === "Completed"
                  ? "line-through text-slate-400"
                  : "text-slate-800 dark:text-white"
              }`}
            >
              {todo.title}
            </h2>

            <p className="mt-3 leading-relaxed text-slate-500 dark:text-slate-400">
              {todo.description || "No description"}
            </p>

            {todo.notes && (
              <div className="mt-4 rounded-2xl bg-slate-100 dark:bg-slate-800 p-4">
                <div className="mb-2 flex items-center gap-2 font-semibold">
                  <FileText size={16} />
                  Notes
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {todo.notes}
                </p>
              </div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: .9 }}
            onClick={() => onToggleStatus(todo)}
            className="text-indigo-600 dark:text-indigo-400"
          >
            {todo.status === "Completed"
              ? <CheckCircle2 size={34}/>
              : <Circle size={34}/>}
          </motion.button>
        </div>

                {/* Status / Priority / Date Chips */}
        <div className="mt-6 flex flex-wrap gap-3">
          <span
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
              priorityColor[todo.priority]?.badge
            }`}
          >
            <Flag size={15} />
            {todo.priority}
          </span>

          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              statusColor[todo.status]
            }`}
          >
            {todo.status}
          </span>

          <span
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${relativeDate.color}`}
          >
            <CalendarDays size={15} />
            {relativeDate.label}
          </span>
        </div>

        {/* Labels */}
        {todo.labels?.length > 0 && (
          <div className="mt-5">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <Tag size={15} />
              Labels
            </div>

            <div className="flex flex-wrap gap-2">
              {todo.labels.map((label) => (
                <span
                  key={label}
                  className="rounded-full bg-indigo-100 dark:bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300"
                >
                  #{label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Progress */}
        {totalSubtasks > 0 && (
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700 dark:text-slate-300">
                Progress
              </span>

              <span className="text-slate-500">
                {completedSubtasks}/{totalSubtasks}
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: .5 }}
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
              />
            </div>
          </div>
        )}

        {/* Subtasks */}
        {totalSubtasks > 0 && (
          <div className="mt-6">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <CheckSquare size={16} />
              Subtasks
            </div>

            <AnimatePresence>
              <div className="space-y-2">
                {todo.subtasks.map((task, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 rounded-xl bg-slate-100 dark:bg-slate-800 px-4 py-3"
                  >
                    {task.completed ? (
                      <CheckSquare
                        size={18}
                        className="text-green-500"
                      />
                    ) : (
                      <Square
                        size={18}
                        className="text-slate-400"
                      />
                    )}

                    <span
                      className={`text-sm ${
                        task.completed
                          ? "line-through text-slate-400"
                          : "text-slate-700 dark:text-slate-200"
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
        <div className="mt-7 flex flex-col gap-4 border-t border-slate-200 dark:border-slate-700 pt-5 md:flex-row md:items-center md:justify-between">

          <div className="space-y-2 text-sm text-slate-500 dark:text-slate-400">

            <div className="flex items-center gap-2">
              <Clock3 size={16} />
              {todo.dueDate
                ? new Date(todo.dueDate).toLocaleDateString()
                : "No Due Date"}
            </div>

            <div>
              Created{" "}
              {new Date(todo.createdAt).toLocaleDateString()}
            </div>

            <div>
              Updated{" "}
              {new Date(todo.updatedAt).toLocaleDateString()}
            </div>
          </div>

          <div className="flex gap-3">

                        <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onEdit(todo)}
              className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 text-blue-600 transition hover:bg-blue-100 dark:bg-blue-500/20 dark:text-blue-300 dark:hover:bg-blue-500/30"
            >
              <Pencil size={16} />
              Edit
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDelete(todo._id)}
              className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-red-600 transition hover:bg-red-100 dark:bg-red-500/20 dark:text-red-300 dark:hover:bg-red-500/30"
            >
              <Trash2 size={16} />
              Delete
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}