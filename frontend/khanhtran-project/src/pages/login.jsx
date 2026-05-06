import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 🔥 thêm cái này
import { Link } from "react-router-dom";
import logo2 from "../assets/logo2.jpg";
import "../App.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // 🔥 báo lỗi

  const navigate = useNavigate(); // 🔥 dùng để chuyển trang

  const handleLogin = () => {
    if (!username || !password) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    setError("");

    navigate("/"); // 🔥 chuyển về trang chủ
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <img src={logo2} alt="logo2" className="login-logo" />

        <div className="login-alert">
          Your session has timed out. Please log in again.
        </div>

        {error && <p className="error-text">{error}</p>}

        <input
          className="login-input"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="login-input"
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={handleLogin}>
          Đăng nhập
        </button>

        <a href="#" className="login-link">
          Quên mật khẩu?
        </a>
        <p className="register-text">
          Chưa có tài khoản <Link to="/register">Đăng ký ngay</Link>
        </p>
      </div>
    </div>
  );
}