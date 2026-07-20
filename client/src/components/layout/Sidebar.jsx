import {
  LayoutDashboard,
  ListTodo,
  CheckCircle,
  Clock,
  Settings,
  Sparkles,
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
    <aside className="hidden lg:flex flex-col w-60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border-r border-slate-200 dark:border-slate-800 shadow-2xl transition-all duration-300">
      {/* Logo */}
      <div className="h-24 flex items-center justify-center border-b border-slate-200 dark:border-slate-800">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3"
        >
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
            <SquareKanban size={42} />
          </div>

          <div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              TaskFlow
            </h1>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Productivity Workspace
            </p>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-5 py-6">
        {menu.map((item, index) => (
          <motion.button
            key={item.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: index * 0.08,
            }}
            whileHover={{
              scale: 1.03,
              x: 4,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className={`group w-full flex items-center gap-4 px-5 py-4 rounded-2xl mb-3 transition-all duration-300 ${
              item.active
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <div
              className={`transition-transform duration-300 ${
                item.active
                  ? ""
                  : "group-hover:scale-110"
              }`}
            >
              {item.icon}
            </div>

            <span className="font-semibold tracking-wide">
              {item.title}
            </span>
          </motion.button>
        ))}
      </nav>

      {/* Bottom Card */}
      <div className="p-6">
        <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-5 text-white shadow-xl">
          <h3 className="font-bold text-lg">
            🚀 Keep Going!
          </h3>

          <p className="text-sm text-indigo-100 mt-2 leading-relaxed">
            Every completed task brings you one step closer to your goals.
          </p>

          <div className="mt-4 h-2 rounded-full bg-white/20 overflow-hidden">
            <div className="h-full w-2/3 rounded-full bg-white"></div>
          </div>

          <p className="mt-2 text-xs text-indigo-100">
            Stay productive today 💪
          </p>
        </div>

        <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6">
          TaskFlow v1.0 • Built with MERN ❤️
        </p>
      </div>
    </aside>
  );
}