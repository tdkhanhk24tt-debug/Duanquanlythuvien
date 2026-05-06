import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 🔥 thêm
import { Link } from "react-router-dom";
import logo2 from "../assets/logo2.jpg";
import "../App.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // 🔥 báo lỗi

  const navigate = useNavigate();

  const handleRegister = () => {
    if (!username || !email || !password) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (!email.includes("@")) {
      setError("Email không hợp lệ!");
      return;
    }

    if (password.length < 6) {
      setError("Mật khẩu phải >= 6 ký tự!");
      return;
    }

    setError("");

    console.log("Đăng ký thành công:", { username, email, password });


    navigate("/login");
  };

  return (
    <div className="register-page">

      <div className="register-card">

        <img src={logo2} alt="logo2" className="register-logo" />

        <h2 className="register-title">Đăng ký tài khoản</h2>

        {error && <p className="error-text">{error}</p>}

        <input
          className="register-input"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="register-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="register-input"
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="register-btn" onClick={handleRegister}>
          Đăng ký
        </button>

        <p className="register-text">
          Already have an account? <Link to="/login">Đăng nhập</Link>
        </p>

      </div>
    </div>
  );
}