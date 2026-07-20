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
    <aside
      className="
        fixed
        left-0
        top-0
        hidden
        h-screen
        w-72
        flex-col
        border-r
        border-[#D7D0C6]
        bg-[#F2ECE4]
        shadow-xl
        shadow-[#BCB9AC]/10
        backdrop-blur-xl

        dark:border-[#4B4540]
        dark:bg-[#242527]

        lg:flex
      "
    >
      {/* Logo */}

      <div className="flex h-24 items-center border-b border-[#D7D0C6] px-8 dark:border-[#4B4540]">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="flex items-center gap-4"
        >
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-[#2F4A61]
              shadow-lg
              shadow-[#2F4A61]/20
            "
          >
            <SquareKanban
              size={24}
              className="text-[#F7F4EF]"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#242527] dark:text-[#F7F4EF]">
              TaskFlow
            </h1>

            <p className="text-xs text-[#8A8177] dark:text-[#BCB9AC]">
              Productivity Workspace
            </p>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}

      <nav className="mt-6 flex-1 px-5">
        {menu.map((item, index) => (
          <motion.button
            key={item.title}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: index * 0.05,
            }}
            whileHover={{
              x: 4,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className={`
              mb-3
              flex
              w-full
              items-center
              gap-4
              rounded-2xl
              px-5
              py-4
              font-medium
              transition-all
              duration-300

              ${
                item.active
                  ? `
                    bg-[#FCFBF8]
                    text-[#2F4A61]
                    shadow-lg
                    shadow-[#BCB9AC]/15
                  `
                  : `
                    text-[#6F6558]
                    hover:bg-[#FCFBF8]
                    hover:text-[#2F4A61]

                    dark:text-[#BCB9AC]
                    dark:hover:bg-[#343434]
                  `
              }
            `}
          >
            {item.icon}
            <span>{item.title}</span>
          </motion.button>
        ))}
      </nav>

      {/* Bottom Card */}

      <div className="p-6">
        <div
          className="
            rounded-3xl
            border
            border-[#D7D0C6]
            bg-[#FCFBF8]
            p-6
            shadow-lg
            shadow-[#BCB9AC]/15

            dark:border-[#4B4540]
            dark:bg-[#2E2E2E]
          "
        >
          <h3 className="text-lg font-semibold text-[#242527] dark:text-[#F7F4EF]">
            🌿 Stay Consistent
          </h3>

          <p className="mt-3 text-sm leading-7 text-[#6F6558] dark:text-[#BCB9AC]">
            Small progress every day leads to big achievements.
            Focus on consistency rather than perfection.
          </p>

          <div className="mt-6 h-2 overflow-hidden rounded-full bg-[#DDD6CC]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "68%" }}
              transition={{ duration: 1 }}
              className="h-full rounded-full bg-[#2F4A61]"
            />
          </div>

          <div className="mt-4 flex items-center justify-between">

            <span className="text-sm text-[#8A8177]">
              Today's Progress
            </span>

            <span className="font-semibold text-[#2F4A61]">
              68%
            </span>

          </div>
        </div>

        <p className="mt-6 text-center text-xs tracking-wide text-[#8A8177] dark:text-[#8A8177]">
          TaskFlow v1.0 • Built with MERN
        </p>
      </div>
    </aside>
  );
}