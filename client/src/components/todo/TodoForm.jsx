import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "../common/Button";

export default function TodoForm({
  onAddTodo,
  editingTodo,
  onUpdateTodo,
  onCancelEdit,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingTodo) {
      setFormData({
        title: editingTodo.title,
        description: editingTodo.description || "",
        priority: editingTodo.priority,
        dueDate: editingTodo.dueDate
          ? editingTodo.dueDate.slice(0, 10)
          : "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        dueDate: "",
      });
    }
  }, [editingTodo]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    try {
      setLoading(true);

      if (editingTodo) {
        await onUpdateTodo(editingTodo._id, formData);
      } else {
        await onAddTodo(formData);
      }

      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        dueDate: "",
      });

      if (editingTodo) {
        onCancelEdit();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
      <h2 className="text-2xl font-bold mb-6">
        {editingTodo ? "Edit Todo" : "Add New Todo"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Todo Title"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-indigo-200 outline-none"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          rows={4}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 resize-none focus:ring-2 focus:ring-indigo-200 outline-none"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-indigo-200 outline-none"
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-indigo-200 outline-none"
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading
            ? editingTodo
              ? "Updating..."
              : "Adding..."
            : editingTodo
            ? "Update Todo"
            : "Add Todo"}
        </Button>

        {editingTodo && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="w-full rounded-xl border border-slate-300 py-3 hover:bg-slate-100 transition"
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}