import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

const API = "http://localhost:5000";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    tenDangNhap: "",
    matKhau: "",
  });

  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/login`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ten_dang_nhap: formData.tenDangNhap,
          mat_khau: formData.matKhau,
        }),
      });

      const text = await response.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch {
        console.error("Server trả về không phải JSON:", text);
        alert("Server lỗi");
        return;
      }

      if (response.ok) {
        alert(data.message);

        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("role", data.user.vai_tro_id);
        localStorage.setItem("userId", data.user.id);

        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      alert("Không kết nối được server (backend chưa chạy hoặc sai port)");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>ĐĂNG NHẬP</h1>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="tenDangNhap"
            placeholder="Tên đăng nhập"
            value={formData.tenDangNhap}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="matKhau"
            placeholder="Mật khẩu"
            value={formData.matKhau}
            onChange={handleChange}
            required
          />

          <button type="submit">Đăng nhập</button>
        </form>

        <p>
          Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
        </p>
      </div>
    </div>
  );
}