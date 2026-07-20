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
      [name]: type === "checkbox"
        ? checked
        : value,
    }));
  };

  const addLabel = () => {
    const value = labelInput.trim();

    if (!value) return;

    if (formData.labels.includes(value)) {
      toast.error("Label already exists.");
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
      labels: prev.labels.filter(
        (item) => item !== label
      ),
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
      subtasks: prev.subtasks.map((task, i) =>
        i === index
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      ),
    }));
  };

  const removeSubtask = (index) => {
    setFormData((prev) => ({
      ...prev,
      subtasks: prev.subtasks.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Please enter a task title.");
      return;
    }

    setLoading(true);

    try {
      if (editingTodo) {
        await onUpdateTodo(
          editingTodo._id,
          formData
        );
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
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        rounded-3xl
        border
        border-[#BCB9AC]/60
        dark:border-[#4B4540]
        bg-[#FCFBF8]/90
        dark:bg-[#2B2B2B]/70
        backdrop-blur-md
        shadow-lg
        p-8
      "
    >

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold text-[#242527] dark:text-[#F7F4EF]">

            {editingTodo
              ? "Edit Task"
              : "Create Task"}

          </h2>

          <p className="mt-2 text-[#6F6558] dark:text-[#BCB9AC]">

            Organize your work with a clean workflow.

          </p>

        </div>

        {editingTodo && (

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: .95,
            }}
            onClick={onCancelEdit}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              bg-rose-100
              text-rose-600
              transition
              hover:bg-rose-200
              dark:bg-rose-500/15
              dark:text-rose-300
            "
          >

            <X size={18} />

          </motion.button>

        )}

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-7"
      >

                {/* Title */}

        <div>

          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#2F4A61] dark:text-[#BCB9AC]">

            <Type
              size={16}
              className="text-[#6F6558]"
            />

            Title

          </label>

          <input
            type="text"
            name="title"
            maxLength={80}
            value={formData.title}
            onChange={handleChange}
            placeholder="Finish React Dashboard..."
            className="
              w-full
              rounded-2xl
              border
              border-[#BCB9AC]/60
              dark:border-[#4B4540]
              bg-[#F2ECE4]
              dark:bg-[#343434]
              px-5
              py-3.5
              text-[#242527]
              dark:text-[#F7F4EF]
              placeholder:text-stone-400
              outline-none
              transition-all
              focus:border-stone-400
              focus:ring-2
              focus:ring-stone-300
            "
          />

          <div className="mt-2 text-right text-xs text-stone-400">
            {formData.title.length}/80
          </div>

        </div>

        {/* Description */}

        <div>

          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#2F4A61] dark:text-[#BCB9AC]">

            <FileText
              size={16}
              className="text-[#6F6558]"
            />

            Description

          </label>

          <textarea
            rows={4}
            name="description"
            maxLength={300}
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe what needs to be done..."
            className="
              w-full
              resize-none
              rounded-2xl
              border
              border-[#BCB9AC]/60
              dark:border-[#4B4540]
              bg-[#F2ECE4]
              dark:bg-[#343434]
              px-5
              py-3.5
              text-[#242527]
              dark:text-[#F7F4EF]
              placeholder:text-stone-400
              outline-none
              transition-all
              focus:border-stone-400
              focus:ring-2
              focus:ring-stone-300
            "
          />

          <div className="mt-2 text-right text-xs text-stone-400">
            {formData.description.length}/300
          </div>

        </div>

        {/* Notes */}

        <div>

          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#2F4A61] dark:text-[#BCB9AC]">

            <FileText
              size={16}
              className="text-[#6F6558]"
            />

            Notes

          </label>

          <textarea
            rows={3}
            name="notes"
            maxLength={500}
            value={formData.notes}
            onChange={handleChange}
            placeholder="Additional notes..."
            className="
              w-full
              resize-none
              rounded-2xl
              border
              border-[#BCB9AC]/60
              dark:border-[#4B4540]
              bg-[#F2ECE4]
              dark:bg-[#343434]
              px-5
              py-3.5
              text-[#242527]
              dark:text-[#F7F4EF]
              placeholder:text-stone-400
              outline-none
              transition-all
              focus:border-stone-400
              focus:ring-2
              focus:ring-stone-300
            "
          />

          <div className="mt-2 text-right text-xs text-stone-400">
            {formData.notes.length}/500
          </div>

        </div>

        {/* Priority & Due Date */}

        <div className="grid gap-6 md:grid-cols-2">

          {/* Priority */}

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#2F4A61] dark:text-[#BCB9AC]">

              <Flag
                size={16}
                className="text-[#6F6558]"
              />

              Priority

            </label>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="
                w-full
                rounded-2xl
                border
                border-[#BCB9AC]/60
                dark:border-[#4B4540]
                bg-[#F2ECE4]
                dark:bg-[#343434]
                px-5
                py-3.5
                text-[#242527]
                dark:text-[#F7F4EF]
                outline-none
                transition-all
                focus:border-stone-400
                focus:ring-2
                focus:ring-stone-300
              "
            >
              <option value="High">
                🔴 High
              </option>

              <option value="Medium">
                🟡 Medium
              </option>

              <option value="Low">
                🟢 Low
              </option>

            </select>

          </div>

          {/* Due Date */}

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#2F4A61] dark:text-[#BCB9AC]">

              <CalendarDays
                size={16}
                className="text-[#6F6558]"
              />

              Due Date

            </label>

            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="
                w-full
                rounded-2xl
                border
                border-[#BCB9AC]/60
                dark:border-[#4B4540]
                bg-[#F2ECE4]
                dark:bg-[#343434]
                px-5
                py-3.5
                text-[#242527]
                dark:text-[#F7F4EF]
                outline-none
                transition-all
                focus:border-stone-400
                focus:ring-2
                focus:ring-stone-300
              "
            />

          </div>

        </div>

                {/* Favorite & Archive */}

        <div className="grid gap-4 md:grid-cols-2">

          {/* Favorite */}

          <label
            className="
              flex
              cursor-pointer
              items-center
              gap-4
              rounded-2xl
              border
              border-[#BCB9AC]/60
              dark:border-[#4B4540]
              bg-[#F2ECE4]
              dark:bg-[#343434]
              p-5
              transition-all
              hover:border-amber-300
            "
          >

            <input
              type="checkbox"
              name="favorite"
              checked={formData.favorite}
              onChange={handleChange}
              className="hidden"
            />

            <div className="rounded-xl bg-[#FCFBF8] dark:bg-[#2B2B2B] p-3 shadow-sm">

              <Star
                size={22}
                className={
                  formData.favorite
                    ? "fill-amber-400 text-amber-400"
                    : "text-stone-400"
                }
              />

            </div>

            <div>

              <p className="font-semibold text-[#242527] dark:text-[#F7F4EF]">
                Favorite
              </p>

              <p className="mt-1 text-sm text-[#6F6558] dark:text-[#BCB9AC]">
                Pin this task to the top.
              </p>

            </div>

          </label>

          {/* Archive */}

          <label
            className="
              flex
              cursor-pointer
              items-center
              gap-4
              rounded-2xl
              border
              border-[#BCB9AC]/60
              dark:border-[#4B4540]
              bg-[#F2ECE4]
              dark:bg-[#343434]
              p-5
              transition-all
              hover:border-stone-400
            "
          >

            <input
              type="checkbox"
              name="archived"
              checked={formData.archived}
              onChange={handleChange}
              className="hidden"
            />

            <div className="rounded-xl bg-[#FCFBF8] dark:bg-[#2B2B2B] p-3 shadow-sm">

              <Archive
                size={22}
                className={
                  formData.archived
                    ? "text-[#2F4A61] dark:text-[#F7F4EF]"
                    : "text-stone-400"
                }
              />

            </div>

            <div>

              <p className="font-semibold text-[#242527] dark:text-[#F7F4EF]">
                Archive
              </p>

              <p className="mt-1 text-sm text-[#6F6558] dark:text-[#BCB9AC]">
                Hide from active tasks.
              </p>

            </div>

          </label>

        </div>

        {/* Labels */}

        <div>

          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#2F4A61] dark:text-[#BCB9AC]">

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
              className="
                flex-1
                rounded-2xl
                border
                border-[#BCB9AC]/60
                dark:border-[#4B4540]
                bg-[#F2ECE4]
                dark:bg-[#343434]
                px-5
                py-3
                outline-none
                focus:border-stone-400
                focus:ring-2
                focus:ring-stone-300
              "
            />

            <button
              type="button"
              onClick={addLabel}
              className="
                rounded-2xl
                bg-[#2F4A61]
                dark:bg-stone-200
                px-6
                font-medium
                text-[#FFFFFF]
                dark:text-zinc-900
                transition
                hover:opacity-90
              "
            >
              Add
            </button>

          </div>

          <AnimatePresence>

            <div className="mt-4 flex flex-wrap gap-2">

              {formData.labels.map((label) => (

                <motion.div
                  key={label}
                  initial={{
                    opacity: 0,
                    scale: .85,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: .85,
                  }}
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-[#BCB9AC]/60
                    dark:border-[#4B4540]
                    bg-[#F2ECE4]
                    dark:bg-[#343434]
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-[#2F4A61]
                    dark:text-[#BCB9AC]
                  "
                >

                  #{label}

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

          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#2F4A61] dark:text-[#BCB9AC]">

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
              className="
                flex-1
                rounded-2xl
                border
                border-[#BCB9AC]/60
                dark:border-[#4B4540]
                bg-[#F2ECE4]
                dark:bg-[#343434]
                px-5
                py-3
                outline-none
                focus:border-stone-400
                focus:ring-2
                focus:ring-stone-300
              "
            />

            <button
              type="button"
              onClick={addSubtask}
              className="
                rounded-2xl
                bg-[#2F4A61]
                dark:bg-stone-200
                px-6
                font-medium
                text-[#FFFFFF]
                dark:text-zinc-900
                transition
                hover:opacity-90
              "
            >
              Add
            </button>

          </div>

          <AnimatePresence>

            <div className="mt-5 space-y-3">

              {formData.subtasks.map((task, index) => (

                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-[#BCB9AC]/60
                    dark:border-[#4B4540]
                    bg-[#F2ECE4]
                    dark:bg-[#343434]
                    p-4
                  "
                >

                  <button
                    type="button"
                    onClick={() => toggleSubtask(index)}
                    className="flex items-center gap-3"
                  >

                    {task.completed ? (
                      <CheckSquare
                        size={20}
                        className="text-emerald-500"
                      />
                    ) : (
                      <Square
                        size={20}
                        className="text-stone-400"
                      />
                    )}

                    <span
                      className={
                        task.completed
                          ? "line-through text-stone-400"
                          : "text-[#2F4A61] dark:text-[#F7F4EF]"
                      }
                    >
                      {task.title}
                    </span>

                  </button>

                  <button
                    type="button"
                    onClick={() => removeSubtask(index)}
                    className="
                      rounded-xl
                      p-2
                      text-rose-500
                      transition
                      hover:bg-rose-100
                      dark:hover:bg-rose-500/15
                    "
                  >
                    <Trash2 size={17} />
                  </button>

                </motion.div>

              ))}

            </div>

          </AnimatePresence>

        </div>

                {/* Submit Buttons */}

        <div className="flex flex-col gap-4 border-t border-[#BCB9AC]/60 pt-6 dark:border-[#4B4540] sm:flex-row">

          <motion.button
            whileHover={{
              scale: 1.01,
            }}
            whileTap={{
              scale: 0.98,
            }}
            type="submit"
            disabled={loading}
            className="
              flex
              h-14
              flex-1
              items-center
              justify-center
              gap-3
              rounded-2xl
              bg-stone-900
              dark:bg-[#F2ECE4]
              px-6
              font-semibold
              text-[#FFFFFF]
              dark:text-zinc-900
              shadow-lg
              transition-all
              hover:shadow-xl
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >

            {loading ? (
              <>

                <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />

                {editingTodo
                  ? "Updating Task..."
                  : "Creating Task..."}

              </>
            ) : (
              <>

                {editingTodo ? (
                  <Save size={19} />
                ) : (
                  <Plus size={19} />
                )}

                {editingTodo
                  ? "Update Task"
                  : "Create Task"}

              </>
            )}

          </motion.button>

          {editingTodo && (

            <motion.button
              whileHover={{
                scale: 1.01,
              }}
              whileTap={{
                scale: 0.98,
              }}
              type="button"
              onClick={() => {
                resetForm();
                onCancelEdit();
              }}
              className="
                flex
                h-14
                items-center
                justify-center
                rounded-2xl
                border
                border-stone-300
                dark:border-[#4B4540]
                bg-[#FCFBF8]
                dark:bg-[#343434]
                px-8
                font-medium
                text-[#2F4A61]
                dark:text-[#F7F4EF]
                transition-all
                hover:bg-[#F2ECE4]
                dark:hover:bg-zinc-700
              "
            >

              <X
                size={18}
                className="mr-2"
              />

              Cancel

            </motion.button>

          )}

        </div>

      </form>

    </motion.div>

  );
}