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
          border-[#BCB9AC]/60
          dark:border-[#4B4540]
          bg-[#FCFBF8]/95
          dark:bg-[#2B2B2B]
          backdrop-blur-md
          shadow-xl
          shadow-[#2F4A61]/5
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
              bg-[#F2ECE4]
              dark:bg-[#343434]
            "
          >
            <ClipboardList
              size={42}
              className="text-[#5F8396]"
            />
          </div>
        </div>

        {/* Title */}

        <h2 className="text-3xl font-bold text-[#242527] dark:text-[#F7F4EF]">
          Nothing here yet
        </h2>

        {/* Description */}

        <p className="mx-auto mt-4 max-w-md leading-7 text-[#6F6558] dark:text-[#BCB9AC]">
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
            border-[#BCB9AC]
            dark:border-[#4B4540]
            bg-[#F7F4EF]
            dark:bg-[#343434]
            px-5
            py-4
          "
        >
          <Sparkles
            size={18}
            className="text-[#A78963]"
          />

          <span className="text-sm font-medium text-[#6F6558] dark:text-[#BCB9AC]">
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