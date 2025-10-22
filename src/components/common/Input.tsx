import { InputProps } from "@/types/common.types";

const Input = ({ label, error, className = "", ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={props.id}
          className="text-[#0f172a] font-sans text-[14px] font-medium leading-[1]"
        >
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3.5 rounded-lg border ${
          error ? "border-red-500" : "border-[#e2e8f0]"
        } bg-white text-[#0f172a] font-sans text-[15px] font-normal placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all ${className}`}
        {...props}
      />
      {error && (
        <span className="text-red-500 text-sm font-normal">{error}</span>
      )}
    </div>
  );
};

export default Input;