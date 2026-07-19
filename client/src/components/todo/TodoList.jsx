import TodoCard from "./TodoCard";

export default function TodoList({
  todos,
  onDelete,
  onEdit,
  onToggleStatus,
}) {
  if (!todos.length) {
    return (
      <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-10 text-center">
        <h2 className="text-2xl font-semibold text-slate-700">
          No Todos Yet
        </h2>

        <p className="text-slate-500 mt-2">
          Create your first task using the form above.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {todos.map((todo) => (
        <TodoCard
          key={todo._id}
          todo={todo}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
}