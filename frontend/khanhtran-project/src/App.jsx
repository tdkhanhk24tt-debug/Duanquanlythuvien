import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/dangky";
import LichSu from "./pages/lichsu";
import ChucNangNhiemVu from "./pages/ChucNangNhiemVu";
import NoiQuy from "./pages/NoiQuy";
import SuMenhTamNhin from "./pages/SuMenhTamNhin";
import TongQuanThuVien from "./pages/TongQuanThuVien";
import SoDoToChuc from "./pages/CoCauToChuc";
import ThanhVien from "./pages/thanhvien";
import SachGiay from "./pages/TaiLieugiay"; 
import HuongDanPhongDoc from "./pages/HuongDanPhongDoc";
import HuongDanSuDungThuVien from "./pages/huongdansudungthuvien";
import TaiLieuDienTu from "./pages/TaiLieuDienTu";
import NhapSach from"./pages/nhapsach";
import XuatSach from"./pages/xuatsach";
import ThongKeSach from"./pages/thongkesach";
import ResourceListPage from "./pages/ResourceListPage";
import AdminRoute from "./routes/AdminRoute";
import PrivateRoute from "./routes/PrivateRoute";
import ThemSach from "./pages/ThemSach";
import XoaSach from "./pages/XoaSach";
import SuaSach from "./pages/SuaSach"

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        
        // ABOUT
        { path: "/about/tongquanthuvien", element: <TongQuanThuVien /> },
        { path: "/about/lichsu", element: <LichSu /> },
        { path: "/about/sumenhtamnhin", element: <SuMenhTamNhin /> },
        { path: "/about/chucnangnhiemvu", element: <ChucNangNhiemVu /> },
        { path: "/about/sodotochuc", element: <SoDoToChuc /> },
        { path: "/about/thanhvien", element: <ThanhVien /> },
        { path: "/about/noiquy", element: <NoiQuy /> },
        
        // RESOURCES / SERVICES
        { path: "/resources/tai-lieu-giay", element: <SachGiay /> },
        { path: "/resources/:slug", element: <ResourceListPage /> },
        { path: "/services/huongdanphongdoc", element: <HuongDanPhongDoc /> },
        { path: "/services/huongdansudungthuvien", element: <HuongDanSuDungThuVien /> },
        { path: "/resources/tai-lieu-dien-tu", element: <TaiLieuDienTu /> },
        { path: "/services/nhap-sach", element: <NhapSach /> },
        { path: "/services/xuat-sach", element: <XuatSach /> },
        { path: "/services/thong-ke-sach", element: <ThongKeSach /> },
        { path: "/thanhvien", element: <AdminRoute><ThanhVien /></AdminRoute> },
        { path: "/them-sach", element: <PrivateRoute><ThemSach /></PrivateRoute> },
        { path: "/xoa-sach", element: <PrivateRoute><XoaSach /></PrivateRoute> },
        { path: "/sua-sach", element: <PrivateRoute><SuaSach /></PrivateRoute> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

export default function App() {
  return <RouterProvider router={router} />;
}