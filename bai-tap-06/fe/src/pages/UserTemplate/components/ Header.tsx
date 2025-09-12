import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const menuItems = [
    {
      key: "user",
      label: (
        <div className="flex items-center gap-2">
          <UserOutlined />
          {user?.full_name}
        </div>
      ),
    },
    {
      key: "logout",
      label: (
        <div
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"
        >
          <LogoutOutlined />
          Đăng xuất
        </div>
      ),
    },
  ];

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/90 backdrop-blur-sm shadow-lg fixed top-0 left-0 right-0 z-10"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="https://nguyenvuongviet.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500"
        >
          vieet
        </Link>

        <nav className="flex gap-6 items-center">
          {user ? (
            <Dropdown
              menu={{ items: menuItems }}
              placement="bottomRight"
              trigger={["click"]}
              overlayClassName="shadow-lg rounded-lg bg-white/95 backdrop-blur-sm"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 cursor-pointer"
              >
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Xin chào,</span>
                  <span className="font-semibold text-gray-800">
                    {user.full_name}
                  </span>
                </div>
                <Avatar
                  src={user.avatar || undefined}
                  icon={!user.avatar && <UserOutlined />}
                  size="large"
                  className="border border-gray-200"
                />
              </motion.div>
            </Dropdown>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-md"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold shadow-md"
              >
                Đăng ký
              </Link>
            </>
          )}
        </nav>
      </div>
    </motion.header>
  );
}
