import "../App.css";
import sodotochuc from "../assets/cocautochuc.jpg";

export default function SoDoToChuc() {
  return (
    <div className="org-image-container">
      <h2 className="org-title">CƠ CẤU TỔ CHỨC</h2>

      <img
        src={sodotochuc}
        alt="Sơ đồ tổ chức"
        className="org-image"
      />
    </div>
  );
}