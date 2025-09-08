import { Outlet, Link } from "react-router-dom";

export default function UserTemplate() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            to="https://nguyenvuongviet.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl font-bold text-blue-600"
          >
            vieet
          </Link>

          <nav className="flex gap-4">
            <Link
              to="/login"
              className="px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors font-medium shadow-md"
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors font-medium shadow-md"
            >
              Đăng ký
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-6">
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
