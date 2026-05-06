import { useState, useEffect } from "react";
import "../App.css";

export default function Footer() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  // theo dõi scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 👉 scroll mượt kiểu custom (từ từ)
  const scrollToTop = () => {
    const duration = 1000; 
    const start = window.scrollY;
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // easeOutCubic (mượt xịn hơn)
      const ease = 1 - Math.pow(1 - progress, 3);

      window.scrollTo(0, start * (1 - ease));

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  return (
    <div className="footer">

      <div className="footer-container">

        {/* LEFT */}
        <div className="footer-left">
          <h3 className="footer-title">
            Phân hiệu Đại học Đà Nẵng tại Kon Tum - UDCK
          </h3>

          <p>Địa chỉ: 704 Phan Đình Phùng, Phường Kon Tum, tỉnh Quảng Ngãi</p>
          <p>Điện thoại: 0260.6287.775</p>
          <p>Email: thuvien@kontum.udn.vn</p>
          <p>
            Fanpage: 
            <a href="https://kontum.udn.vn/">
              https://kontum.udn.vn/
            </a>
          </p>
        </div>

        {/* RIGHT */}
        <div className="footer-right">
          <div>
            <h4 className="footer-subtitle">Giờ mở cửa</h4>
            <p>Buổi Sáng : 7h20 - 11h00 (Thứ 2 - Chủ nhật)</p>
            <p>Buổi Chiều : 13h20 - 17h30 (Thứ 2 - Chủ nhật)</p>
            <p>Buổi tối : 18h00 - 21h00 (Thứ 2 - Chủ nhật)</p>
          </div>

          <div className="social-group"></div>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom"></div>

      {/* NÚT SCROLL TOP */}
      {showTopBtn && (
        <button className="scroll-top" onClick={scrollToTop}>
          ↑
        </button>
      )}

    </div>
  );
}