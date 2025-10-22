interface PageContainerProps {
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "6xl" | "7xl";
  className?: string;
}

const PageContainer = ({
  children,
  maxWidth = "7xl",
  className = "",
}: PageContainerProps) => {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "4xl": "max-w-4xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
  };

  return (
    <main
      className={`${maxWidthClasses[maxWidth]} w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 ${className}`}
    >
      {children}
    </main>
  );
};

export default PageContainer;