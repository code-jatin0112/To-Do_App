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
      disabled={disabled}
      onClick={onClick}
      className={`
        relative
        inline-flex
        items-center
        justify-center
        gap-3
        overflow-hidden

        rounded-2xl
        px-6
        py-3

        font-semibold
        text-white

        bg-gradient-to-r
        from-indigo-600
        via-indigo-500
        to-violet-600

        shadow-lg
        shadow-indigo-500/25

        transition-all
        duration-300

        hover:-translate-y-0.5
        hover:shadow-xl
        hover:shadow-indigo-500/35

        active:scale-95

        disabled:cursor-not-allowed
        disabled:opacity-50

        ${className}
      `}
    >
      {children}
    </button>
  );
}