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

        bg-stone-900
        text-white

        dark:bg-stone-100
        dark:text-zinc-900

        shadow-lg
        transition-all
        duration-200

        hover:shadow-xl
        hover:bg-stone-800

        dark:hover:bg-white

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