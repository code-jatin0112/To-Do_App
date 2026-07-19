import { motion } from "framer-motion";
import {
  CalendarDays,
  Pencil,
  Trash2,
  CheckCircle2,
  Circle,
  Flag,
  Clock3,
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

    if (diff === -1)
      return {
        label: "Yesterday",
        color:
          "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300",
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

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -80 }}
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{ duration: 0.3 }}
      className={`group relative overflow-hidden rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/40 dark:border-slate-700 border-l-8 ${
        priorityColor[todo.priority]?.border
      } shadow-xl hover:shadow-2xl`}
    >
      {/* Decorative Blur */}
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative p-6">
        {/* Header */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h2
              className={`text-xl font-bold transition ${
                todo.status === "Completed"
                  ? "line-through text-slate-400 dark:text-slate-500"
                  : "text-slate-800 dark:text-white"
              }`}
            >
              {todo.title}
            </h2>

            <p className="mt-3 leading-relaxed text-slate-500 dark:text-slate-400">
              {todo.description || "No description provided."}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onToggleStatus(todo)}
            className="text-indigo-600 dark:text-indigo-400"
          >
            {todo.status === "Completed" ? (
              <CheckCircle2 size={32} />
            ) : (
              <Circle size={32} />
            )}
          </motion.button>
        </div>

        {/* Chips */}
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

        {/* Footer */}
        <div className="mt-6 flex flex-col gap-4 border-t border-slate-200 dark:border-slate-700 pt-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Clock3 size={16} />
            {todo.dueDate
              ? new Date(todo.dueDate).toLocaleDateString()
              : "No Due Date"}
          </div>

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onEdit(todo)}
              className="flex items-center gap-2 rounded-xl bg-blue-50 dark:bg-blue-500/20 px-4 py-2 text-blue-600 dark:text-blue-300 transition hover:bg-blue-100 dark:hover:bg-blue-500/30"
            >
              <Pencil size={16} />
              Edit
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDelete(todo._id)}
              className="flex items-center gap-2 rounded-xl bg-red-50 dark:bg-red-500/20 px-4 py-2 text-red-600 dark:text-red-300 transition hover:bg-red-100 dark:hover:bg-red-500/30"
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