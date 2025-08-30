import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // ✅ Validate
    if (formData.username.length < 3) {
      setError("Tên đăng nhập phải có ít nhất 3 ký tự!");
      return;
    }
    if (formData.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    try {
      const res = await api.post("/users", formData);
      console.log("Phản hồi từ server:", res.data);

      setSuccess("Đăng ký thành công! Bạn có thể đăng nhập.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("Lỗi đăng ký:", err.response?.data || err);
      setError("Đăng ký thất bại! Vui lòng kiểm tra lại thông tin.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Đăng ký</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Tên đăng nhập</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Mật khẩu</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Họ</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Tên</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Ngày sinh</label>
          <input
            type="date"
            className="form-control"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p className="text-danger">{error}</p>}
        {success && <p className="text-success">{success}</p>}

        <button type="submit" className="btn btn-success">
          Đăng ký
        </button>
      </form>
    </div>
  );
}

export default Register;
