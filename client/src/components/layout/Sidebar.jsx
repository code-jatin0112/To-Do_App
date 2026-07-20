import {
  LayoutDashboard,
  ListTodo,
  CheckCircle,
  Clock,
  Settings,
  SquareKanban,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Sidebar() {
  const menu = [
    {
      icon: <LayoutDashboard size={20} />,
      title: "Dashboard",
      active: true,
    },
    {
      icon: <ListTodo size={20} />,
      title: "All Tasks",
    },
    {
      icon: <CheckCircle size={20} />,
      title: "Completed",
    },
    {
      icon: <Clock size={20} />,
      title: "Pending",
    },
    {
      icon: <Settings size={20} />,
      title: "Settings",
    },
  ];

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-stone-200 bg-stone-50/90 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90">

      {/* Logo */}

      <div className="flex h-24 items-center justify-center border-b border-stone-200 dark:border-zinc-800">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="flex items-center gap-4"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-800 shadow-md dark:bg-stone-200">
            <SquareKanban
              size={22}
              className="text-white dark:text-zinc-900"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-800 dark:text-stone-100">
              TaskFlow
            </h1>

            <p className="text-xs text-stone-500 dark:text-stone-400">
              Productivity Workspace
            </p>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}

      <nav className="flex-1 px-4 py-6">
        {menu.map((item, index) => (
          <motion.button
            key={item.title}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: index * 0.06,
            }}
            whileHover={{
              x: 4,
            }}
            whileTap={{
              scale: .98,
            }}
            className={`mb-2 flex w-full items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${
              item.active
                ? "bg-stone-800 text-white shadow-md dark:bg-stone-200 dark:text-zinc-900"
                : "text-stone-600 hover:bg-stone-200 dark:text-stone-300 dark:hover:bg-zinc-900"
            }`}
          >
            {item.icon}

            <span className="font-medium tracking-wide">
              {item.title}
            </span>
          </motion.button>
        ))}
      </nav>

      {/* Motivation Card */}

      <div className="p-5">
        <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-md dark:border-zinc-800 dark:bg-zinc-900">

          <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100">
            🌿 Stay Consistent
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
            Small progress every day leads to big achievements.
            Focus on consistency rather than perfection.
          </p>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-stone-200 dark:bg-zinc-800">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "68%" }}
              transition={{ duration: 1 }}
              className="h-full rounded-full bg-stone-700 dark:bg-stone-300"
            />
          </div>

          <p className="mt-3 text-xs text-stone-500 dark:text-stone-400">
            Today's Progress
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-stone-400 dark:text-stone-500">
          TaskFlow v1.0 • Built with MERN
        </p>
      </div>
    </aside>
  );
}