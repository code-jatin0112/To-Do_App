import { Pencil, Trash2, CheckCircle2, RotateCcw } from "lucide-react";

export default function TodoCard({
  todo,
  onDelete,
  onEdit,
  onToggleStatus,
}) {
  const priorityColor = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-yellow-100 text-yellow-600",
    Low: "bg-green-100 text-green-600",
  };

  const statusColor = {
    Pending: "bg-orange-100 text-orange-600",
    Completed: "bg-emerald-100 text-emerald-600",
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-slate-800">
            {todo.title}
          </h3>

          <p className="text-slate-500 mt-2">
            {todo.description || "No description"}
          </p>
        </div>

        <div className="flex gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColor[todo.priority]}`}
          >
            {todo.priority}
          </span>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[todo.status]}`}
          >
            {todo.status}
          </span>
        </div>
      </div>

      {todo.dueDate && (
        <p className="text-sm text-slate-500 mt-4">
          📅 Due: {new Date(todo.dueDate).toLocaleDateString()}
        </p>
      )}

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => onToggleStatus(todo)}
          className="text-emerald-600 hover:text-emerald-700"
          title={
            todo.status === "Completed"
              ? "Mark Pending"
              : "Mark Completed"
          }
        >
          {todo.status === "Completed" ? (
            <RotateCcw size={20} />
          ) : (
            <CheckCircle2 size={20} />
          )}
        </button>

        <button
          onClick={() => onEdit(todo)}
          className="text-indigo-600 hover:text-indigo-700"
          title="Edit"
        >
          <Pencil size={20} />
        </button>

        <button
          onClick={() => onDelete(todo._id)}
          className="text-red-600 hover:text-red-700"
          title="Delete"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}