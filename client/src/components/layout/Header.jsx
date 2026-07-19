import { useEffect, useState } from "react";
import {
  Search,
  LogOut,
  Bell,
  CalendarDays,
  Sparkles,
  Moon,
  Sun,
} from "lucide-react";
import { motion } from "framer-motion";

import { useTheme } from "../../context/ThemeContext";
import Button from "../common/Button";

export default function Header({
  user,
  onLogout,
  search,
  setSearch,
}) {
  const [time, setTime] = useState(new Date());
  const { darkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hour = time.getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  const formattedDate = time.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.header
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/40 dark:border-slate-700 shadow-xl px-8 py-7"
    >
      <div className="flex flex-col xl:flex-row justify-between gap-8">
        {/* Left Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold">
            <Sparkles size={18} />
            {greeting}
          </div>

          <h1 className="text-4xl font-bold text-slate-800 dark:text-white leading-tight">
            Welcome back,
            <span className="text-indigo-600 dark:text-indigo-400">
              {" "}
              {user?.name || "User"}
            </span>
          </h1>

          <p className="text-slate-500 dark:text-slate-400 max-w-xl">
            Stay productive, organize your work efficiently,
            and accomplish more today.
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-slate-400 pt-2">
            <div className="flex items-center gap-2">
              <CalendarDays size={16} />
              {formattedDate}
            </div>

            <div className="font-semibold text-slate-700 dark:text-slate-200">
              {formattedTime}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks..."
              className="w-full sm:w-80 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-3 pl-11 pr-5 text-slate-800 dark:text-white placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="h-12 w-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition flex items-center justify-center"
          >
            {darkMode ? (
              <Sun
                size={20}
                className="text-yellow-400"
              />
            ) : (
              <Moon
                size={20}
                className="text-slate-700 dark:text-slate-200"
              />
            )}
          </motion.button>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="relative h-12 w-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition flex items-center justify-center"
          >
            <Bell
              size={20}
              className="text-slate-700 dark:text-slate-200"
            />

            <span className="absolute top-3 right-3 h-2.5 w-2.5 rounded-full bg-red-500"></span>
          </motion.button>

          {/* Logout */}
          <Button onClick={onLogout}>
            <div className="flex items-center gap-2">
              <LogOut size={18} />
              Logout
            </div>
          </Button>
        </div>
      </div>
    </motion.header>
  );
}