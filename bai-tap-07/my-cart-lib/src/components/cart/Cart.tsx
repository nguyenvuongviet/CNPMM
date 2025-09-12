import React from "react";
import type { CartItemType } from "../../model/CartItemType";
import Button from "../ui/Button";
import CartItem from "./CartItem";

type CartProps = {
  items: CartItemType[];
  onClear: () => void;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
};

const Cart: React.FC<CartProps> = ({
  items,
  onClear,
  onRemove,
  onUpdateQuantity,
}) => {
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div>
      {items.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <>
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={onRemove}
              onUpdateQuantity={onUpdateQuantity}
            />
          ))}
          <div className="mt-4 font-bold text-right">
            Tổng: {total.toLocaleString()} VND
          </div>
          <Button variant="danger" onClick={onClear} className="mt-3">
            Xóa tất cả
          </Button>
        </>
      )}
    </div>
  );
};

export default Cart;
