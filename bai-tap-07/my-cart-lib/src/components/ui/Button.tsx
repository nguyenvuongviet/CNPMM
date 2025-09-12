import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  className,
}) => {
  const base =
    "px-4 py-2 rounded font-medium transition duration-200 focus:outline-none";
  const styles =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : variant === "secondary"
      ? "bg-gray-200 text-black hover:bg-gray-300"
      : "bg-red-600 text-white hover:bg-red-700";

  return (
    <button
      onClick={onClick}
      className={`${base} ${styles} ${className || ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
