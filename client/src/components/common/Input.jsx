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

      <label className="block text-sm font-semibold tracking-wide text-[#6F6558] dark:text-[#D9D2C8]">
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
            border-[#D7D0C6]
            bg-[#FCFBF8]
            px-4
            py-3.5
            pr-12
            text-[#242527]
            placeholder:text-[#A79E92]
            shadow-sm
            outline-none
            transition-all
            duration-300

            hover:border-[#BCB9AC]

            focus:border-[#2F4A61]
            focus:ring-4
            focus:ring-[#2F4A61]/10

            dark:border-[#4B4540]
            dark:bg-[#2F2F2F]
            dark:text-[#F7F4EF]
            dark:placeholder:text-[#A89F94]

            dark:hover:border-[#6F6558]

            dark:focus:border-[#5F8396]
            dark:focus:ring-[#5F8396]/20
          "
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="
              absolute
              right-3
              top-1/2
              flex
              h-10
              w-10
              -translate-y-1/2
              items-center
              justify-center
              rounded-xl

              text-[#6F6558]

              transition-all
              duration-200

              hover:bg-[#F2ECE4]
              hover:text-[#2F4A61]

              dark:text-[#BCB9AC]
              dark:hover:bg-[#3A3A3A]
              dark:hover:text-[#F7F4EF]
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