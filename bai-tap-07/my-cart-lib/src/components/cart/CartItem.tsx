import React from "react";
import type { CartItemType } from "../../model/CartItemType";
import Button from "../ui/Button";

type Props = {
  item: CartItemType;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
};

const CartItem: React.FC<Props> = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <div className="flex items-center justify-between border-b py-2">
      <div>
        <p className="font-medium">{item.name}</p>
        <p className="text-sm text-gray-500">
          {item.price.toLocaleString()} VND
        </p>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={item.quantity}
          min={1}
          className="w-16 border rounded px-2 py-1"
          onChange={(e) => onUpdateQuantity(item.id, Number(e.target.value))}
        />
        <Button variant="danger" onClick={() => onRemove(item.id)}>
          Xóa
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
