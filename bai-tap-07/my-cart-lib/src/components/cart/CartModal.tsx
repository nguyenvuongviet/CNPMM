import React from "react";
import type { CartItemType } from "../../model/CartItemType";
import Modal from "../ui/Modal";
import Cart from "./Cart";

type CartModalProps = {
  open: boolean;
  onClose: () => void;
  items: CartItemType[];
  onClear: () => void;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
};

const CartModal: React.FC<CartModalProps> = ({
  open,
  onClose,
  items,
  onClear,
  onRemove,
  onUpdateQuantity,
}) => {
  return (
    <Modal open={open} onClose={onClose} title="Giỏ hàng">
      <Cart
        items={items}
        onClear={onClear}
        onRemove={onRemove}
        onUpdateQuantity={onUpdateQuantity}
      />
    </Modal>
  );
};

export default CartModal;
