import { NavLink, useNavigate } from "react-router-dom";

import { useState, useEffect, useRef } from "react";

import logo from "../assets/logo.jpg";

import { isAdmin, isLoggedIn, logout, getUser } from "../utils/auth";



import banner1 from "../assets/banner1.jpg";

import banner2 from "../assets/banner2.jpg";

import banner3 from "../assets/banner3.jpg";

import banner4 from "../assets/banner4.jpg";



import "../App.css";



export default function Menu() {

  const navigate = useNavigate();

  const banners = [banner1, banner2, banner3, banner4];

  const [current, setCurrent] = useState(0);

  const [search, setSearch] = useState("");

  const loggedIn = isLoggedIn();

  const user = getUser();

  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef();



  // Đóng dropdown khi click ngoài

  useEffect(() => {

    if (!showDropdown) return;

    const handleClickOutside = (e) => {

      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {

        setShowDropdown(false);

      }

    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);

  }, [showDropdown]);



  const handleLogout = () => {

    logout();

    setShowDropdown(false);

    navigate("/");

  };



  useEffect(() => {

    const interval = setInterval(() => {

      setCurrent((prev) => (prev + 1) % banners.length);

    }, 3000);

    return () => clearInterval(interval);

  }, []);



  return (

    <div className="wrapper">



      {/* HEADER */}

      <div className="header">

        <div className="logo-group">

          <div className="logo-badge">

            <img src={logo} alt="logo" className="logo-img" />

          </div>



          <div>

            <h1 className="brand-title">Thư Viện UDCK</h1>

            <p className="brand-slogan">Trí thức là sức mạnh</p>

          </div>

        </div>



        {/* SEARCH + AUTH */}

        <div className="auth-group">



          <div className="search-box">

            <input

              type="text"

              placeholder="Tìm kiếm..."

              className="search-input"

              value={search}

              onChange={(e) => setSearch(e.target.value)}

            />

          </div>





          {loggedIn && user ? (

            <div className="user-dropdown" ref={dropdownRef} style={{ position: "relative" }}>

              <button

                className="user-btn"

                onClick={() => setShowDropdown((v) => !v)}

                style={{

                  display: "flex",

                  alignItems: "center",

                  gap: 6,

                  background: "#f5f7fa",

                  border: "1px solid #d1d5db",

                  borderRadius: 20,

                  padding: "6px 18px 6px 14px",

                  fontWeight: 600,

                  fontSize: 17,

                  color: "#1a237e",

                  cursor: "pointer",

                  boxShadow: showDropdown ? "0 2px 8px rgba(0,0,0,0.10)" : "none"

                }}

              >

                <span style={{ fontWeight: 600 }}>

                  {user.ten_dang_nhap || user.username || user.email || "User"}

                </span>

                <span style={{ fontSize: 18, marginLeft: 2, transition: "transform 0.2s", transform: showDropdown ? "rotate(180deg)" : "none" }}>▼</span>

              </button>

              {showDropdown && (

                <div className="dropdown-menu" style={{

                  position: "absolute",

                  right: 0,

                  top: "110%",

                  display: "flex",

                  flexDirection: "column",

                  background: "#fff",

                  border: "1px solid #d1d5db",

                  borderRadius: 10,

                  minWidth: 140,

                  boxShadow: "0 4px 16px rgba(0,0,0,0.13)",

                  zIndex: 9999,

                  marginTop: 4,

                  padding: "6px 0"

                }}>

                  <button

                    className="logout-btn"

                    style={{

                      width: "100%",

                      textAlign: "left",

                      padding: "10px 22px",

                      background: "none",

                      border: "none",

                      cursor: "pointer",

                      fontSize: 16,

                      color: "#d32f2f",

                      borderRadius: 6,

                      transition: "background 0.15s"

                    }}

                    onClick={handleLogout}

                    onMouseOver={e => e.currentTarget.style.background = '#fbe9e7'}

                    onMouseOut={e => e.currentTarget.style.background = 'none'}

                  >

                    Đăng xuất

                  </button>

                </div>

              )}

            </div>

          ) : (

            <>

              <NavLink to="/login" className="login-btn">Đăng nhập</NavLink>

              <NavLink to="/register" className="register-btn">Đăng ký</NavLink>

            </>

          )}



        </div>

      </div>



      {/* MENU */}

      <div className="menu-bar">

        <nav className="nav-container">



          {/* TRANG CHỦ */}

          <div className="nav-item dropdown">

            <span className="nav-link">TRANG CHỦ</span>

            <div className="dropdown-menu">

              <a href="https://kontum.udn.vn/" target="_blank" rel="noreferrer">

                UDCK

              </a>



              <NavLink to="/" end className={({ isActive }) => isActive ? "active-link" : ""}>

                Thư viện

              </NavLink>

            </div>

          </div>



          {/* GIỚI THIỆU */}

          <div className="nav-item dropdown">

            <span className="nav-link">GIỚI THIỆU</span>

            <div className="dropdown-menu">



              <NavLink to="/about/lichsu" className={({ isActive }) => isActive ? "active-link" : ""}>

                Lịch sử hình thành

              </NavLink>



              <NavLink to="/about/sumenhtamnhin" className={({ isActive }) => isActive ? "active-link" : ""}>

                Sứ mệnh - Tầm nhìn

              </NavLink>



              <NavLink to="/about/chucnangnhiemvu" className={({ isActive }) => isActive ? "active-link" : ""}>

                Chức năng nhiệm vụ

              </NavLink>



              <NavLink to="/about/sodotochuc" className={({ isActive }) => isActive ? "active-link" : ""}>

                Cơ cấu tổ chức

              </NavLink>



              <NavLink to="/about/thanhvien" className={({ isActive }) => isActive ? "active-link" : ""}>

                Đội ngũ nhân sự

              </NavLink>



              <NavLink to="/about/noiquy" className={({ isActive }) => isActive ? "active-link" : ""}>

                Nội quy thư viện

              </NavLink>



            </div>

          </div>



          {/* TÀI NGUYÊN */}

          <div className="nav-item dropdown">

            <span className="nav-link">TÀI NGUYÊN</span>

            <div className="dropdown-menu">



              <NavLink to="/resources/tai-lieu-giay" className={({ isActive }) => isActive ? "active-link" : ""}>

                Tài liệu giấy

              </NavLink>



              <NavLink to="/resources/tai-lieu-dien-tu" className={({ isActive }) => isActive ? "active-link" : ""}>

                Tài liệu điện tử

              </NavLink>



              <NavLink to="/resources/" className={({ isActive }) => isActive ? "active-link" : ""}>

                Tài liệu số

              </NavLink>

            </div>

          </div>



         



          {/* HƯỚNG DẪN */}

          <div className="nav-item dropdown">

            <span className="nav-link">HƯỚNG DẪN</span>

            <div className="dropdown-menu">



              <NavLink to="/guide/" className={({ isActive }) => isActive ? "active-link" : ""}>

                Hướng dẫn đăng nhập tài khoản

              </NavLink>



              <NavLink to="/guide/" className={({ isActive }) => isActive ? "active-link" : ""}>

                Hướng dẫn tìm kiếm tài liệu

              </NavLink>



              <NavLink to="/services/HuongDanSuDungThuVien" className={({ isActive }) => isActive ? "active-link" : ""}>

                Hướng dẫn sử dụng thư viện

              </NavLink>



              <NavLink to="/services/HuongDanPhongDoc" className={({ isActive }) => isActive ? "active-link" : ""}>

                Hướng dẫn sử dụng phòng học nhóm - phòng đọc

              </NavLink>



            </div>

          </div>

          {/* QUẢN LÝ */}

          {isAdmin() && (

            <div className="nav-item dropdown">



              <span className="nav-link">

                QUẢN LÝ

              </span>



              <div className="dropdown-menu">



                <NavLink

                  to="/thanhvien"

                  className={({ isActive }) =>

                    isActive ? "active-link" : ""

                  }

                >

                  Quản lý nhân viên

                </NavLink>



                <NavLink

                  to="/them-sach"

                  className={({ isActive }) =>

                    isActive ? "active-link" : ""

                  }

                >

                  Thêm sách

                </NavLink>



                <NavLink

                  to="/xoa-sach"

                  className={({ isActive }) =>

                    isActive ? "active-link" : ""

                  }

                >

                  Xóa sách

                </NavLink>



                <NavLink

                  to="/sua-sach"

                  className={({ isActive }) =>

                    isActive ? "active-link" : ""

                  }

                >

                  Sửa sách

                </NavLink>



              </div>



            </div>

          )}

         

          {/* LIÊN HỆ */}

          <div className="nav-item dropdown">

            <span className="nav-link">LIÊN HỆ</span>

            <div className="dropdown-menu">



              <NavLink to="/contact" className={({ isActive }) => isActive ? "active-link" : ""}>

                Thông tin liên hệ

              </NavLink>



              <NavLink to="/contact/" className={({ isActive }) => isActive ? "active-link" : ""}>

                Gửi phản hồi - góp ý

              </NavLink>

            </div>

          </div>



        </nav>

      </div>



      {/* BANNER */}

      <div className="banner-container">

        <img src={banners[current]} alt="banner" className="banner-img" />

      </div>



    </div>

  );

} 