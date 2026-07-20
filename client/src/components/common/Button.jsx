import { motion } from "framer-motion";

export default function Button({
  children,
  type = "button",
  onClick,
  disabled = false,
  className = "",
}) {
  return (
    <motion.button
      whileHover={
        disabled
          ? {}
          : {
              scale: 1.02,
              y: -1,
            }
      }
      whileTap={
        disabled
          ? {}
          : {
              scale: 0.98,
            }
      }
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2

        rounded-2xl

        px-6
        py-3.5

        font-semibold
        tracking-wide

        bg-[#2F4A61]
        text-[#F7F4EF]

        border
        border-[#2F4A61]

        shadow-lg
        shadow-[#2F4A61]/15

        transition-all
        duration-300

        hover:bg-[#3D617D]
        hover:border-[#3D617D]
        hover:shadow-xl
        hover:shadow-[#2F4A61]/20

        active:bg-[#243B4D]

        dark:bg-[#5F8396]
        dark:text-[#F7F4EF]
        dark:border-[#5F8396]

        dark:hover:bg-[#6F92A4]
        dark:hover:border-[#6F92A4]

        disabled:cursor-not-allowed
        disabled:opacity-50
        disabled:hover:shadow-lg

        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}