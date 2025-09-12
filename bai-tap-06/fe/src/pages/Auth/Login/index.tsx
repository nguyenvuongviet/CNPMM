import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Typography, notification } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

const { Title, Text } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values: any) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3069/api/auth/login", {
        email: values.email,
        password: values.password,
      });

      localStorage.setItem("token", res.data.data.tokens.accessToken);
      localStorage.setItem("user", JSON.stringify(res.data.data.user));

      notification.success({
        message: "Đăng nhập thành công 🎉",
        description: `Chào mừng bạn quay lại, ${res.data.data.user.full_name}!`,
        placement: "topRight",
      });

      navigate("/");
    } catch (error: any) {
      notification.error({
        message: "Đăng nhập thất bại",
        description: error.response?.data?.message || "Sai email hoặc mật khẩu",
        placement: "topRight",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card
          className="shadow-2xl rounded-2xl p-6 bg-white/90 backdrop-blur-sm"
          style={{ border: "none" }}
        >
          <div className="text-center mb-8">
            <Title level={2} className="!text-3xl font-bold text-gray-800">
              Đăng nhập
            </Title>
            <Text className="text-gray-500">Chào mừng bạn quay lại!</Text>
          </div>

          <Form layout="vertical" onFinish={handleLogin} className="space-y-4">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder="Nhập email"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Nhập mật khẩu"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                size="large"
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold rounded-lg"
              >
                Đăng nhập
              </Button>
            </Form.Item>

            <div className="text-center">
              <Text className="text-gray-500">
                Chưa có tài khoản?{" "}
                <a
                  href="/register"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Đăng ký ngay
                </a>
              </Text>
            </div>
          </Form>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
