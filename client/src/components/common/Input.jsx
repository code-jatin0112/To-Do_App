import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Input({
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  disabled = false,
  required = false,
  autoComplete = "off",
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="space-y-2">

      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium tracking-wide text-slate-200"
        >
          {label}
        </label>
      )}

      <div className="relative">

        <input
          id={name}
          name={name}
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          className="
            w-full
            rounded-2xl
            border
            border-white/10
            bg-white/5
            backdrop-blur-xl

            px-5
            py-3.5

            text-base
            text-white

            placeholder:text-slate-400

            outline-none

            transition-all
            duration-300

            hover:border-indigo-400/40

            focus:border-indigo-500
            focus:bg-white/10
            focus:ring-4
            focus:ring-indigo-500/20

            disabled:cursor-not-allowed
            disabled:opacity-60

            pr-12
          "
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2

              text-slate-400

              transition
              duration-300

              hover:text-indigo-300
            "
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        )}

      </div>

    </div>
  );
}