import { useEffect, useState } from "react";
import {
  Plus,
  Save,
  X,
  Flag,
  CalendarDays,
  FileText,
  Type,
} from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function TodoForm({
  onAddTodo,
  editingTodo,
  onUpdateTodo,
  onCancelEdit,
}) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
  });

  useEffect(() => {
    if (editingTodo) {
      setFormData({
        title: editingTodo.title || "",
        description: editingTodo.description || "",
        priority: editingTodo.priority || "Medium",
        dueDate: editingTodo.dueDate
          ? editingTodo.dueDate.slice(0, 10)
          : "",
      });
    } else {
      resetForm();
    }
  }, [editingTodo]);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      priority: "Medium",
      dueDate: "",
    });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Please enter a title.");
      return;
    }

    setLoading(true);

    try {
      if (editingTodo) {
        await onUpdateTodo(editingTodo._id, formData);
        toast.success("Task updated successfully!");
      } else {
        await onAddTodo(formData);
        toast.success("Task created successfully!");
      }

      resetForm();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/40 dark:border-slate-700 shadow-xl p-8"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
            {editingTodo ? "Edit Task" : "Create New Task"}
          </h2>

          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Stay organized and keep moving forward.
          </p>
        </div>

        {editingTodo && (
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCancelEdit}
            className="h-11 w-11 rounded-xl bg-red-100 dark:bg-red-500/20 hover:bg-red-200 dark:hover:bg-red-500/30 flex items-center justify-center transition"
          >
            <X
              size={20}
              className="text-red-600 dark:text-red-300"
            />
          </motion.button>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Title */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <Type size={16} />
            Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Finish React project..."
            maxLength={80}
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-5 py-3 text-slate-800 dark:text-white placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
          />

          <div className="mt-1 text-right text-xs text-slate-400">
            {formData.title.length}/80
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <FileText size={16} />
            Description
          </label>

          <textarea
            rows={5}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Add some details..."
            maxLength={300}
            className="w-full resize-none rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-5 py-3 text-slate-800 dark:text-white placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
          />

          <div className="mt-1 text-right text-xs text-slate-400">
            {formData.description.length}/300
          </div>
        </div>

        {/* Priority & Due Date */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <Flag size={16} />
              Priority
            </label>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-5 py-3 text-slate-800 dark:text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="High">🔴 High</option>
              <option value="Medium">🟡 Medium</option>
              <option value="Low">🟢 Low</option>
            </select>
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <CalendarDays size={16} />
              Due Date
            </label>

            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-5 py-3 text-slate-800 dark:text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="flex h-14 flex-1 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold shadow-lg transition disabled:opacity-70"
          >
            {loading ? (
              <>
                <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                {editingTodo ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>
                {editingTodo ? (
                  <Save size={20} />
                ) : (
                  <Plus size={20} />
                )}
                {editingTodo ? "Update Task" : "Create Task"}
              </>
            )}
          </motion.button>

          {editingTodo && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={onCancelEdit}
              className="rounded-2xl bg-slate-200 dark:bg-slate-700 dark:text-white px-8 font-medium transition hover:bg-slate-300 dark:hover:bg-slate-600"
            >
              Cancel
            </motion.button>
          )}
        </div>
      </form>
    </motion.div>
  );
}