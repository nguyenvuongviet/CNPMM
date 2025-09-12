import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`border rounded-lg p-4 shadow bg-white ${className || ""}`}>
      {children}
    </div>
  );
};

export default Card;
