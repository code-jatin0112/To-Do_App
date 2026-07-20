import { AnimatePresence, motion } from "framer-motion";
import { ClipboardList, Sparkles } from "lucide-react";
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
          border-stone-200
          dark:border-zinc-800
          bg-white/70
          dark:bg-zinc-900/70
          backdrop-blur-md
          shadow-lg
          p-14
          text-center
        "
      >
        {/* Icon */}

        <div className="mb-8 flex justify-center">

          <div
            className="
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-full
              bg-stone-100
              dark:bg-zinc-800
            "
          >
            <ClipboardList
              size={42}
              className="text-stone-500"
            />
          </div>

        </div>

        {/* Title */}

        <h2 className="text-3xl font-bold text-stone-800 dark:text-stone-100">
          Nothing here yet
        </h2>

        {/* Description */}

        <p className="mx-auto mt-4 max-w-md leading-7 text-stone-500 dark:text-stone-400">
          No tasks match your current filters.
          Create a new task or adjust your filters to start organizing your work.
        </p>

        {/* Hint Card */}

        <div
          className="
            mx-auto
            mt-8
            flex
            max-w-sm
            items-center
            justify-center
            gap-3
            rounded-2xl
            border
            border-stone-200
            dark:border-zinc-700
            bg-stone-100
            dark:bg-zinc-800
            px-5
            py-4
          "
        >
          <Sparkles
            size={18}
            className="text-emerald-500"
          />

          <span className="text-sm font-medium text-stone-600 dark:text-stone-300">
            Your next task is just one click away.
          </span>

        </div>

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
            layout
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              x: -40,
              scale: 0.96,
            }}
            transition={{
              duration: 0.25,
              delay: index * 0.04,
            }}
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