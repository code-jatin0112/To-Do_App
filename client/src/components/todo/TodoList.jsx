import { AnimatePresence, motion } from "framer-motion";
import { ClipboardList } from "lucide-react";
import TodoCard from "./TodoCard";

export default function TodoList({
  todos,
  onDelete,
  onEdit,
  onToggleStatus,
}) {
  if (todos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl p-14 text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center">
            <ClipboardList
              size={42}
              className="text-indigo-600"
            />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-slate-800">
          Nothing here yet
        </h2>

        <p className="text-slate-500 mt-3 max-w-md mx-auto leading-7">
          You don't have any tasks matching the current filters.
          Create a new task or change your filters to get started.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      className="space-y-6"
    >
      <AnimatePresence mode="popLayout">
        {todos.map((todo, index) => (
          <motion.div
            key={todo._id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{
              duration: 0.25,
              delay: index * 0.05,
            }}
            layout
          >
            <TodoCard
              todo={todo}
              onDelete={onDelete}
              onEdit={onEdit}
              onToggleStatus={onToggleStatus}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}