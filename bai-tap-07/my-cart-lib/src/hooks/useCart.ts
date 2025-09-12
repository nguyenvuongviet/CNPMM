import { useState } from "react";
import type { CartItemType } from "../model/CartItemType";

export const useCart = () => {
  const [cart, setCart] = useState<CartItemType[]>([]);

  const addItem = (item: CartItemType) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.id === item.id);
      if (exist) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeItem = (id: string) =>
    setCart((prev) => prev.filter((i) => i.id !== id));

  const updateQuantity = (id: string, quantity: number) =>
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));

  const clearCart = () => setCart([]);

  return { cart, addItem, removeItem, updateQuantity, clearCart };
};
