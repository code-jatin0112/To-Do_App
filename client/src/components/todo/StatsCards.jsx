export default function StatsCards({ todos }) {
  const total = todos.length;

  const completed = todos.filter(
    (todo) => todo.status === "Completed"
  ).length;

  const pending = todos.filter(
    (todo) => todo.status === "Pending"
  ).length;

  const cards = [
    {
      title: "Total Todos",
      value: total,
      bg: "bg-indigo-50",
      text: "text-indigo-600",
    },
    {
      title: "Pending",
      value: pending,
      bg: "bg-amber-50",
      text: "text-amber-600",
    },
    {
      title: "Completed",
      value: completed,
      bg: "bg-emerald-50",
      text: "text-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`${card.bg} rounded-3xl p-6 shadow-md border border-slate-100`}
        >
          <p className="text-slate-500 text-sm">
            {card.title}
          </p>

          <h2
            className={`text-4xl font-bold mt-3 ${card.text}`}
          >
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}