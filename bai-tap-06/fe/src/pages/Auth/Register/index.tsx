import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Typography, notification } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { motion } from "framer-motion"; // For animations

const { Title, Text } = Typography;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (values: any) => {
    setLoading(true);
    try {
      await axios.post("http://localhost:3069/api/auth/register", {
        full_name: values.fullName,
        email: values.email,
        password: values.password,
      });

      notification.success({
        message: "Đăng ký thành công 🎉",
        description: "Bạn có thể đăng nhập ngay bây giờ!",
        placement: "topRight",
      });

      navigate("/login");
    } catch (error: any) {
      notification.error({
        message: "Đăng ký thất bại",
        description: error.response?.data?.message || "Vui lòng thử lại sau",
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
              Đăng ký tài khoản
            </Title>
            <Text className="text-gray-500">
              Tạo tài khoản để bắt đầu hành trình của bạn!
            </Text>
          </div>

          <Form
            layout="vertical"
            onFinish={handleRegister}
            className="space-y-4"
          >
            <Form.Item
              label="Họ tên"
              name="fullName"
              rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Nhập họ tên"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

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
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold rounded-lg"
              >
                Đăng ký
              </Button>
            </Form.Item>

            <div className="text-center">
              <Text className="text-gray-500">
                Đã có tài khoản?{" "}
                <a
                  href="/login"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Đăng nhập ngay
                </a>
              </Text>
            </div>
          </Form>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;
