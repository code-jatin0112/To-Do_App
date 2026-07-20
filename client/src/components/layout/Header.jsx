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
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        rounded-[32px]
        border
        border-[#D7D0C6]
        bg-[#FCFBF8]/90
        px-8
        py-8
        shadow-xl
        shadow-[#BCB9AC]/15
        backdrop-blur-xl

        dark:border-[#4B4540]
        dark:bg-[#2B2B2B]/90
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
              bg-[#F2ECE4]
              px-4
              py-2
              text-sm
              font-medium
              text-[#6F6558]

              dark:bg-[#3A3A3A]
              dark:text-[#D8D2CA]
            "
          >
            <Sparkles size={15} className="text-[#A78963]" />
            {greeting}
          </motion.div>

          <div>

            <h1 className="text-5xl font-bold tracking-tight text-[#242527] dark:text-[#F7F4EF]">
              Welcome back,
              <span className="text-[#2F4A61]">
                {" "}
                {user?.name || "User"}
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-lg leading-7 text-[#6F6558] dark:text-[#BCB9AC]">
              Stay organized, stay focused and make progress one task at a time.
            </p>

          </div>

          <div className="flex flex-wrap items-center gap-4">

            <div
              className="
                flex
                items-center
                gap-2
                rounded-2xl
                bg-[#F2ECE4]
                px-4
                py-3
                text-[#6F6558]

                dark:bg-[#343434]
                dark:text-[#D8D2CA]
              "
            >
              <CalendarDays size={18} />
              <span>{formattedDate}</span>
            </div>

            <div
              className="
                rounded-2xl
                bg-[#2F4A61]
                px-5
                py-3
                font-semibold
                text-[#F7F4EF]
              "
            >
              {formattedTime}
            </div>

          </div>

        </div>

        {/* Right */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

          {/* Search */}

          <motion.div
            whileHover={{ y: -2 }}
            className="relative"
          >
            <Search
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-[#A79E92]"
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
                border-[#D7D0C6]
                bg-[#F7F4EF]
                pl-12
                pr-5

                text-[#242527]
                placeholder:text-[#A79E92]

                shadow-sm
                outline-none
                transition-all

                hover:border-[#BCB9AC]

                focus:border-[#2F4A61]
                focus:ring-4
                focus:ring-[#2F4A61]/10

                dark:border-[#4B4540]
                dark:bg-[#343434]
                dark:text-[#F7F4EF]
              "
            />
          </motion.div>

          {/* Theme */}

          <motion.button
            whileHover={{
              rotate: 180,
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
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
              border-[#D7D0C6]

              bg-[#FCFBF8]

              shadow-md

              dark:border-[#4B4540]
              dark:bg-[#343434]
            "
          >
            {darkMode ? (
              <Sun
                size={20}
                className="text-[#A78963]"
              />
            ) : (
              <Moon
                size={20}
                className="text-[#2F4A61]"
              />
            )}
          </motion.button>

          {/* Notification */}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              relative
              flex
              h-14
              w-14
              items-center
              justify-center

              rounded-2xl

              border
              border-[#D7D0C6]

              bg-[#FCFBF8]

              shadow-md

              dark:border-[#4B4540]
              dark:bg-[#343434]
            "
          >
            <Bell
              size={20}
              className="text-[#2F4A61] dark:text-[#D8D2CA]"
            />

            <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-[#8F6948]" />
          </motion.button>

          {/* Logout */}

          <Button
            onClick={onLogout}
            className="
              relative
              h-14
              min-w-[200px]
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