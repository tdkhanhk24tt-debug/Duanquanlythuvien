import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Menu from "./components/Menu";
import Footer from "./components/footer";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/dangky";
import LichSu from "./pages/lichsu";
import ChucNangNhiemVu from "./pages/ChucNangNhiemVu";
import NoiQuy from "./pages/NoiQuy";
import SuMenhTamNhin from "./pages/SuMenhTamNhin";
import TongQuanThuVien from "./pages/TongQuanThuVien";
import SachGiay from "./pages/TaiLieugiay";
import SoDoToChuc from "./pages/CoCauToChuc"; 
import HuongDanPhongDoc from "./pages/HuongDanPhongDoc";
import TaiLieuDienTu from "./pages/TaiLieuDienTu";
function Layout() {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {!hideLayout && <Menu />}

      <Routes>
        <Route path="/" element={<Home />} />

        {/* GIỚI THIỆU */}
        <Route path="/about/lichsu" element={<LichSu />} />
        <Route path="/about/chucnangnhiemvu" element={<ChucNangNhiemVu />} />
        <Route path="/about/noiquy" element={<NoiQuy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/guide/NoiQuy" element={<NoiQuy />} />
        <Route path="/about/sumenhtamnhin" element={<SuMenhTamNhin />} />
        <Route path="/about/tongquanthuvien" element={<TongQuanThuVien />} />
        <Route path="/resources/tai-lieu-giay" element={<SachGiay />} />
        <Route path="/about/sodotochuc" element={<SoDoToChuc />} />
        <Route path="/services/HuongDanPhongDoc" element={<HuongDanPhongDoc />} />
        <Route path="/resources/tai-lieu-dien-tu" element={<TaiLieuDienTu />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}