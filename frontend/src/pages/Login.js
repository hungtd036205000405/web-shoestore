// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/token", { username, password });
      console.log("Phản hồi từ server:", res.data);

      const result = res.data?.result;
      const token = result?.token;
      const userId = result?.userid;
      const authenticated = result?.authenticated;

      console.log("Token:", token, "UserId:", userId, "Authenticated:", authenticated);

      if (token && userId != null && authenticated) {
        // Lưu token, userId và username vào localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userId", String(userId));
        localStorage.setItem("username", username);
        
        // Dispatch event để thông báo cho Navbar update ngay lập tức
        window.dispatchEvent(new Event('storage'));
        
        navigate("/", { replace: true });
      } else {
        setError("Không nhận được token hoặc userId từ server!");
      }
    } catch (err) {
      console.error("Lỗi đăng nhập:", err.response?.data || err);
      setError("Đăng nhập thất bại! Sai tài khoản hoặc mật khẩu.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Tên đăng nhập</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Mật khẩu</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary">
          Đăng nhập
        </button>
      </form>
    </div>
  );
}

export default Login;