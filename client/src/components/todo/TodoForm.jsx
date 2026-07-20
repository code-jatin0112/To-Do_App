import { useEffect, useState } from "react";
import {
  Plus,
  Save,
  X,
  Flag,
  CalendarDays,
  FileText,
  Type,
  Tag,
  Star,
  Archive,
  CheckSquare,
  Square,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function TodoForm({
  onAddTodo,
  editingTodo,
  onUpdateTodo,
  onCancelEdit,
}) {
  const [loading, setLoading] = useState(false);

  const [labelInput, setLabelInput] = useState("");
  const [subtaskInput, setSubtaskInput] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    notes: "",
    priority: "Medium",
    dueDate: "",
    labels: [],
    favorite: false,
    archived: false,
    subtasks: [],
  });

  useEffect(() => {
    if (editingTodo) {
      setFormData({
        title: editingTodo.title || "",
        description: editingTodo.description || "",
        notes: editingTodo.notes || "",
        priority: editingTodo.priority || "Medium",
        dueDate: editingTodo.dueDate
          ? editingTodo.dueDate.slice(0, 10)
          : "",
        labels: editingTodo.labels || [],
        favorite: editingTodo.favorite || false,
        archived: editingTodo.archived || false,
        subtasks: editingTodo.subtasks || [],
      });
    } else {
      resetForm();
    }
  }, [editingTodo]);

  const resetForm = () => {
    setLabelInput("");
    setSubtaskInput("");

    setFormData({
      title: "",
      description: "",
      notes: "",
      priority: "Medium",
      dueDate: "",
      labels: [],
      favorite: false,
      archived: false,
      subtasks: [],
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addLabel = () => {
    const value = labelInput.trim();

    if (!value) return;

    if (formData.labels.includes(value)) {
      toast.error("Label already exists");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      labels: [...prev.labels, value],
    }));

    setLabelInput("");
  };

  const removeLabel = (label) => {
    setFormData((prev) => ({
      ...prev,
      labels: prev.labels.filter((item) => item !== label),
    }));
  };

  const addSubtask = () => {
    const value = subtaskInput.trim();

    if (!value) return;

    setFormData((prev) => ({
      ...prev,
      subtasks: [
        ...prev.subtasks,
        {
          title: value,
          completed: false,
        },
      ],
    }));

    setSubtaskInput("");
  };

  const toggleSubtask = (index) => {
    setFormData((prev) => ({
      ...prev,
      subtasks: prev.subtasks.map((item, i) =>
        i === index
          ? {
              ...item,
              completed: !item.completed,
            }
          : item
      ),
    }));
  };

  const removeSubtask = (index) => {
    setFormData((prev) => ({
      ...prev,
      subtasks: prev.subtasks.filter((_, i) => i !== index),
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
      } else {
        await onAddTodo(formData);
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
            {editingTodo ? "Edit Task" : "Create New Task"}
          </h2>

          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Organize everything in one place.
          </p>
        </div>

        {editingTodo && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCancelEdit}
            className="h-11 w-11 rounded-xl bg-red-100 dark:bg-red-500/20 flex items-center justify-center"
          >
            <X size={20} />
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
            maxLength={80}
            value={formData.title}
            onChange={handleChange}
            placeholder="Finish React Project..."
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
            rows={4}
            name="description"
            maxLength={300}
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your task..."
            className="w-full resize-none rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-5 py-3 text-slate-800 dark:text-white placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
          />

          <div className="mt-1 text-right text-xs text-slate-400">
            {formData.description.length}/300
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <FileText size={16} />
            Notes
          </label>

          <textarea
            rows={3}
            name="notes"
            maxLength={500}
            value={formData.notes}
            onChange={handleChange}
            placeholder="Additional notes..."
            className="w-full resize-none rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-5 py-3 text-slate-800 dark:text-white placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
          />

          <div className="mt-1 text-right text-xs text-slate-400">
            {formData.notes.length}/500
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

        {/* Favorite & Archive */}
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4">
            <input
              type="checkbox"
              name="favorite"
              checked={formData.favorite}
              onChange={handleChange}
              className="hidden"
            />

            <Star
              size={22}
              className={
                formData.favorite
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-slate-400"
              }
            />

            <div>
              <p className="font-semibold text-slate-700 dark:text-white">
                Favorite
              </p>

              <p className="text-xs text-slate-500">
                Pin this task to the top
              </p>
            </div>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4">
            <input
              type="checkbox"
              name="archived"
              checked={formData.archived}
              onChange={handleChange}
              className="hidden"
            />

            <Archive
              size={22}
              className={
                formData.archived
                  ? "text-indigo-500"
                  : "text-slate-400"
              }
            />

            <div>
              <p className="font-semibold text-slate-700 dark:text-white">
                Archive
              </p>

              <p className="text-xs text-slate-500">
                Hide from active tasks
              </p>
            </div>
          </label>
        </div>

        {/* Labels */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <Tag size={16} />
            Labels
          </label>

          <div className="flex gap-3">
            <input
              value={labelInput}
              onChange={(e) => setLabelInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addLabel();
                }
              }}
              placeholder="Work"
              className="flex-1 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-5 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="button"
              onClick={addLabel}
              className="rounded-2xl bg-indigo-600 px-6 text-white"
            >
              Add
            </button>
          </div>

          <AnimatePresence>
            <div className="mt-4 flex flex-wrap gap-2">
              {formData.labels.map((label) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: .8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: .8 }}
                  className="flex items-center gap-2 rounded-full bg-indigo-100 dark:bg-indigo-500/20 px-4 py-2 text-sm font-medium text-indigo-700 dark:text-indigo-300"
                >
                  {label}

                  <button
                    type="button"
                    onClick={() => removeLabel(label)}
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>

        {/* Subtasks */}

                <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <CheckSquare size={16} />
            Subtasks
          </label>

          <div className="flex gap-3">
            <input
              value={subtaskInput}
              onChange={(e) => setSubtaskInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSubtask();
                }
              }}
              placeholder="Add a subtask..."
              className="flex-1 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-5 py-3 text-slate-800 dark:text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="button"
              onClick={addSubtask}
              className="rounded-2xl bg-indigo-600 px-6 text-white font-medium hover:bg-indigo-700 transition"
            >
              Add
            </button>
          </div>

          <AnimatePresence>
            <div className="mt-5 space-y-3">
              {formData.subtasks.map((task, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4"
                >
                  <button
                    type="button"
                    onClick={() => toggleSubtask(index)}
                    className="flex items-center gap-3"
                  >
                    {task.completed ? (
                      <CheckSquare
                        size={20}
                        className="text-green-500"
                      />
                    ) : (
                      <Square
                        size={20}
                        className="text-slate-400"
                      />
                    )}

                    <span
                      className={`${
                        task.completed
                          ? "line-through text-slate-400"
                          : "text-slate-700 dark:text-white"
                      }`}
                    >
                      {task.title}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => removeSubtask(index)}
                    className="rounded-lg p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="flex h-14 flex-1 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 font-semibold text-white shadow-lg transition disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
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
              onClick={() => {
                resetForm();
                onCancelEdit();
              }}
              className="rounded-2xl bg-slate-200 px-8 font-medium text-slate-700 transition hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
            >
              Cancel
            </motion.button>
          )}
        </div>
      </form>
    </motion.div>
  );
}