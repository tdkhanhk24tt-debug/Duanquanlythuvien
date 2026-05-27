import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

export default function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    hoTen: "",
    tenDangNhap: "",
    email: "",
    soDienThoai: "",
    matKhau: "",
    nhapLaiMatKhau: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleRegister = async (e) => {

    e.preventDefault();

    if (
      !formData.hoTen ||
      !formData.tenDangNhap ||
      !formData.email ||
      !formData.soDienThoai ||
      !formData.matKhau ||
      !formData.nhapLaiMatKhau
    ) {
      alert("Vui lòng nhập đầy đủ");
      return;
    }

    if (
      formData.matKhau !==
      formData.nhapLaiMatKhau
    ) {
      alert("Mật khẩu không khớp");
      return;
    }

    try {

      const response = await fetch(
        "http://localhost:5000/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            ho_ten: formData.hoTen,
            ten_dang_nhap: formData.tenDangNhap,
            email: formData.email,
            so_dien_thoai: formData.soDienThoai,
            mat_khau: formData.matKhau,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {

        alert(data.message);

        navigate("/login");

      }

      else {

        alert(data.message);

      }

    }

    catch (error) {

      console.log(error);

      alert("Lỗi server");

    }

  };

  return (
    <div className="register-page">

      <div className="register-container">

        <h1>ĐĂNG KÝ</h1>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            name="hoTen"
            placeholder="Họ và tên"
            value={formData.hoTen}
            onChange={handleChange}
          />

          <input
            type="text"
            name="tenDangNhap"
            placeholder="Tên đăng nhập"
            value={formData.tenDangNhap}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="soDienThoai"
            placeholder="Số điện thoại"
            value={formData.soDienThoai}
            onChange={handleChange}
          />

          <input
            type="password"
            name="matKhau"
            placeholder="Mật khẩu"
            value={formData.matKhau}
            onChange={handleChange}
          />

          <input
            type="password"
            name="nhapLaiMatKhau"
            placeholder="Nhập lại mật khẩu"
            value={formData.nhapLaiMatKhau}
            onChange={handleChange}
          />

          <button type="submit">
            Đăng ký
          </button>

        </form>

        <p>
          Đã có tài khoản ?

          <Link to="/login">
            Đăng nhập
          </Link>

        </p>

      </div>

    </div>
  );
}