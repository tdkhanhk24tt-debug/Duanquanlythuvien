import { Outlet, useLocation } from "react-router-dom";
import Menu from "../components/Menu";
import Footer from "../components/footer";

export default function MainLayout() {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {!hideLayout && <Menu />}
      <main>
        <Outlet />
      </main>
      {!hideLayout && <Footer />}
    </>
  );
}
