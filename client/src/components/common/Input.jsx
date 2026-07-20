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
      <label className="block text-sm font-medium text-slate-700">
        {label}
      </label>

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
            border-slate-300
            bg-white
            px-4
            py-3
            pr-12
            text-slate-800
            placeholder:text-slate-400
            transition-all
            duration-300
            outline-none
            focus:border-indigo-500
            focus:ring-4
            focus:ring-indigo-100
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
              text-slate-500
              hover:text-indigo-600
              transition-colors
            "
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}