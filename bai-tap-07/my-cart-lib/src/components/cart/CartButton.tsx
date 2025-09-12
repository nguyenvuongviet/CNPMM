import React from "react";

type CartButtonProps = {
  count: number;
  onClick: () => void;
};

const CartButton: React.FC<CartButtonProps> = ({ count, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      🛒
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-2">
          {count}
        </span>
      )}
    </button>
  );
};

export default CartButton;
