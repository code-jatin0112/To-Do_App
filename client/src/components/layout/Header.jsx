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
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .4 }}
      className="
        rounded-3xl
        border
        border-stone-200
        dark:border-zinc-800
        bg-white/70
        dark:bg-zinc-900/70
        backdrop-blur-md
        shadow-lg
        px-8
        py-8
      "
    >
      <div className="flex flex-col justify-between gap-8 xl:flex-row">

        {/* Left */}

        <div className="space-y-5">

          <motion.div
            whileHover={{ x: 3 }}
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-stone-200
              dark:bg-zinc-800
              px-4
              py-2
              text-sm
              font-medium
              text-stone-700
              dark:text-stone-300
            "
          >
            <Sparkles size={15} />
            {greeting}
          </motion.div>

          <div>
            <h1 className="text-5xl font-bold tracking-tight text-stone-800 dark:text-stone-100">

              Welcome back,

              <span className="text-stone-500 dark:text-stone-400">
                {" "}
                {user?.name || "User"}
              </span>

            </h1>

            <p className="mt-4 max-w-xl text-lg leading-7 text-stone-500 dark:text-stone-400">
              Stay organized, stay focused and make progress one task at a time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">

            <div className="
              flex
              items-center
              gap-2
              rounded-2xl
              bg-stone-100
              dark:bg-zinc-800
              px-4
              py-3
              text-stone-600
              dark:text-stone-300
            ">
              <CalendarDays size={18}/>
              <span>{formattedDate}</span>
            </div>

            <div className="
              rounded-2xl
              bg-stone-800
              dark:bg-stone-200
              px-5
              py-3
              font-semibold
              text-white
              dark:text-zinc-900
            ">
              {formattedTime}
            </div>

          </div>

        </div>

        {/* Right */}

        <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">

          {/* Search */}

          <motion.div
            whileHover={{ y: -2 }}
            className="relative"
          >
            <Search
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400"
            />

            <input
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              placeholder="Search tasks..."
              className="
                h-14
                w-full
                sm:w-80
                rounded-2xl
                border
                border-stone-200
                dark:border-zinc-700
                bg-stone-100
                dark:bg-zinc-800
                pl-12
                pr-5
                text-stone-800
                dark:text-white
                placeholder:text-stone-400
                outline-none
                transition-all
                focus:border-stone-400
                focus:ring-4
                focus:ring-stone-300/40
              "
            />
          </motion.div>

          {/* Theme */}

          <motion.button
            whileHover={{
              rotate:180,
              scale:1.05,
            }}
            whileTap={{
              scale:.95,
            }}
            onClick={toggleTheme}
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              border
              border-stone-200
              dark:border-zinc-700
              bg-white
              dark:bg-zinc-800
              shadow-sm
            "
          >
            {darkMode ? (
              <Sun
                size={21}
                className="text-amber-500"
              />
            ) : (
              <Moon
                size={21}
                className="text-stone-700"
              />
            )}
          </motion.button>

          {/* Notifications */}

          <motion.button
            whileHover={{scale:1.05}}
            whileTap={{scale:.95}}
            className="
              relative
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              border
              border-stone-200
              dark:border-zinc-700
              bg-white
              dark:bg-zinc-800
              shadow-sm
            "
          >
            <Bell
              size={20}
              className="text-stone-700 dark:text-stone-300"
            />

            <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-rose-400"/>
          </motion.button>

          {/* Logout */}

          <Button
            onClick={onLogout}
            className="
              relative
              h-14
              min-w-[200px]
              rounded-2xl
              bg-stone-800
              hover:bg-stone-700
              dark:bg-stone-200
              dark:text-zinc-900
              dark:hover:bg-white
              text-white
              font-semibold
              shadow-md
            "
          >
            <LogOut
              size={20}
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