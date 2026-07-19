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
      ? "Good Morning ☀️"
      : hour < 17
      ? "Good Afternoon 🌤️"
      : "Good Evening 🌙";

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
      transition={{ duration: 0.45 }}
      className="
        rounded-[32px]
        border
        border-white/40
        dark:border-slate-700/60
        bg-white/75
        dark:bg-slate-900/75
        backdrop-blur-2xl
        shadow-2xl
        px-8
        py-8
      "
    >
      <div className="flex flex-col xl:flex-row justify-between gap-8">

        {/* LEFT */}

        <div className="space-y-5">

          <motion.div
            whileHover={{ x: 4 }}
            className="inline-flex items-center gap-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400"
          >
            <Sparkles size={16} />
            {greeting}
          </motion.div>

          <div>
            <h1 className="text-5xl font-extrabold tracking-tight text-slate-800 dark:text-white">

              Welcome back,

              <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                {" "}
                {user?.name || "User"}
              </span>

            </h1>

            <p className="mt-3 max-w-xl text-lg leading-7 text-slate-500 dark:text-slate-400">
              Stay focused, manage your workflow efficiently and finish
              today's tasks with confidence.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">

            <div className="flex items-center gap-2 rounded-2xl bg-slate-100 dark:bg-slate-800 px-4 py-2 text-slate-600 dark:text-slate-300">

              <CalendarDays size={18} />

              <span className="font-medium">
                {formattedDate}
              </span>

            </div>

            <div className="rounded-2xl bg-indigo-600 px-5 py-2 font-bold tracking-wide text-white shadow-lg shadow-indigo-500/30">
              {formattedTime}
            </div>

          </div>

        </div>

                {/* RIGHT */}

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">

          {/* Search */}

          <motion.div
            whileHover={{ y: -2 }}
            className="relative"
          >
            <Search
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks..."
              className="
                h-14
                w-full
                sm:w-80
                rounded-2xl
                border
                border-slate-200
                dark:border-slate-700
                bg-white/80
                dark:bg-slate-800
                pl-12
                pr-5
                text-slate-800
                dark:text-white
                placeholder:text-slate-400
                outline-none
                transition-all
                duration-300
                focus:border-indigo-500
                focus:ring-4
                focus:ring-indigo-500/20
              "
            />
          </motion.div>

          {/* Theme */}

          <motion.button
            whileHover={{ scale: 1.08, rotate: 180 }}
            whileTap={{ scale: 0.94 }}
            onClick={toggleTheme}
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              border
              border-slate-200
              dark:border-slate-700
              bg-white/80
              dark:bg-slate-800
              shadow-lg
              transition
            "
          >
            {darkMode ? (
              <Sun
                size={22}
                className="text-yellow-400"
              />
            ) : (
              <Moon
                size={22}
                className="text-slate-700 dark:text-white"
              />
            )}
          </motion.button>

          {/* Notification */}

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="
              relative
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              border
              border-slate-200
              dark:border-slate-700
              bg-white/80
              dark:bg-slate-800
              shadow-lg
            "
          >
            <Bell
              size={22}
              className="text-slate-700 dark:text-white"
            />

            <span className="absolute right-3 top-3 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative h-3 w-3 rounded-full border-2 border-white bg-red-500"></span>
            </span>
          </motion.button>

          {/* Logout */}

          <Button
            onClick={onLogout}
            className="
              relative
              h-14
              min-w-[220px]
              px-8
              text-lg
              font-bold
            "
          >
            <LogOut
              size={22}
              className="absolute left-6"
            />

            <span className="mx-auto">
              Logout
            </span>
          </Button>

        </div>

      </div>

    </motion.header>
  );
}