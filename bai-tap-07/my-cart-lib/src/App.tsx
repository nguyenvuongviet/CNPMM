import { useState } from "react";
import { useCart } from "./hooks/useCart";
import CartButton from "./components/cart/CartButton";
import CartModal from "./components/cart/CartModal";
import Button from "./components/ui/Button";
import Card from "./components/ui/Card";

function App() {
  const { cart, addItem, removeItem, updateQuantity, clearCart } = useCart();
  const [open, setOpen] = useState(false);

  const products = [
    { id: "1", name: "Sản phẩm A", price: 100000 },
    { id: "2", name: "Sản phẩm B", price: 150000 },
    { id: "3", name: "Sản phẩm C", price: 200000 },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Demo Cart Library</h1>
        <CartButton count={cart.length} onClick={() => setOpen(true)} />
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <Card key={p.id}>
            <h2 className="text-lg font-semibold">{p.name}</h2>
            <p className="mb-2">{p.price.toLocaleString()} VND</p>
            <Button onClick={() => addItem({ ...p, quantity: 1 })}>
              Thêm vào giỏ
            </Button>
          </Card>
        ))}
      </div>

      <CartModal
        open={open}
        onClose={() => setOpen(false)}
        items={cart}
        onClear={clearCart}
        onRemove={removeItem}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  );
}

export default App;
