export default function Button({
  children,
  type = "button",
  onClick,
  disabled = false,
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="
        w-full
        rounded-2xl
        bg-gradient-to-r
        from-indigo-600
        to-violet-600
        py-3
        font-semibold
        text-white
        shadow-lg
        shadow-indigo-500/20
        transition-all
        duration-300
        hover:scale-[1.02]
        hover:shadow-xl
        hover:shadow-indigo-500/30
        active:scale-95
        disabled:opacity-50
      "
    >
      {children}
    </button>
  );
}