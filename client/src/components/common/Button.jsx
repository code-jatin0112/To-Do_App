export default function Button({
  children,
  type = "button",
  onClick,
  disabled = false,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        group
        relative
        inline-flex
        w-full
        items-center
        justify-center
        overflow-hidden
        rounded-2xl

        px-6
        py-3.5

        text-base
        font-semibold
        text-white

        bg-gradient-to-r
        from-indigo-600
        via-violet-600
        to-fuchsia-600

        shadow-lg
        shadow-indigo-500/25

        transition-all
        duration-300

        hover:scale-[1.02]
        hover:shadow-[0_15px_45px_rgba(99,102,241,.45)]

        active:scale-95

        disabled:cursor-not-allowed
        disabled:opacity-50

        ${className}
      `}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>

      <span
        className="
          absolute
          inset-0
          -translate-x-full
          bg-gradient-to-r
          from-transparent
          via-white/20
          to-transparent
          transition-transform
          duration-700
          group-hover:translate-x-full
        "
      />
    </button>
  );
}