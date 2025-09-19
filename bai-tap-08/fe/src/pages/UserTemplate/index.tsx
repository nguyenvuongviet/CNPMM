import { Outlet } from "react-router-dom";
import Header from "./components/ Header";

export default function UserTemplate() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 container mx-auto px-6 pt-10 pb-6 mt-16">
        <Outlet />
      </main>

      <footer className="bg-gray-100 py-4 mt-8 border-t">
        <div className="container mx-auto text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} 4Stay. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
