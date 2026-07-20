import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Input({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="space-y-2">

      {/* Label */}

      <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300">
        {label}
      </label>

      {/* Input */}

      <div className="relative">

        <input
          name={name}
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="
            w-full
            rounded-2xl
            border
            border-stone-200
            dark:border-zinc-700
            bg-stone-100
            dark:bg-zinc-800
            px-4
            py-3.5
            pr-12
            text-stone-800
            dark:text-stone-100
            placeholder:text-stone-400
            outline-none
            transition-all
            duration-200
            focus:border-stone-400
            focus:ring-2
            focus:ring-stone-300
            dark:focus:border-stone-500
            dark:focus:ring-stone-700
          "
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              text-stone-500
              transition-all
              hover:bg-stone-200
              hover:text-stone-700
              dark:text-stone-400
              dark:hover:bg-zinc-700
              dark:hover:text-stone-200
            "
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        )}

      </div>

    </div>
  );
}