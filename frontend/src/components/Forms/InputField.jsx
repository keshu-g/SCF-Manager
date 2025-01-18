import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const InputField = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  isPassword = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="mb-3 sm:mb-4">
      {/* Label */}
      <label
        htmlFor={id}
        className="block text-xs sm:text-sm mb-1 sm:mb-2 text-primary-text dark:text-dark-primary-text"
      >
        {label}
      </label>

      {/* Input with Password Toggle */}
      <div className="relative">
        <input
          type={isPassword && showPassword ? "text" : type} // Toggle between password and text type
          id={id}
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 sm:py-3 border rounded-md sm:rounded-lg focus:outline-none 
          bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text placeholder:text-gray-500 dark:placeholder:text-gray-400 border-border-color dark:border-dark-border-color focus:ring-2 focus:ring-accent-color dark:focus:ring-dark-accent-color transition-all duration-300 text-sm sm:text-base"
          placeholder={placeholder}
          aria-label={label}
        />
        {isPassword && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-text dark:text-dark-primary-text focus:outline-none"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
