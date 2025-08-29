import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Mật khẩu không trùng khớp");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3069/api/auth/register", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.accessToken);
      window.location.href = "/";
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Register</button>
        <p style={{ color: "red" }}>{error}</p>
      </form>
    </div>
  );
};

export default Register;
