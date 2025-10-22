import { ButtonProps } from "@/types/common.types";

const Button = ({
  variant = "primary",
  size = "md",
  icon: Icon,
  loading = false,
  fullWidth = false,
  className = "",
  children,
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-[#E8F0FF] text-blue-600 hover:bg-gray-50 focus:ring-blue-500",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
    ghost: "bg-gray-100 text-blue-600 hover:bg-gray-200 focus:ring-gray-500",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-xs min-w-[120px]",
    md: "px-5 sm:px-6 py-2.5 sm:py-3 text-sm min-w-[140px] sm:min-w-[160px]",
    lg: "px-6 py-3.5 text-base min-w-[160px]",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        Icon && <Icon className="w-4 h-4" />
      )}
      {children}
    </button>
  );
};

export default Button;