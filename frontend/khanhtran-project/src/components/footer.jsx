import { useState, useEffect } from "react";
import "../App.css";
import iconfacebook from "../assets/iconfacebook.jpg";
import icontiktok from "../assets/icontiktok.jpg";
import iconyoutube from "../assets/iconyoutube.jpg";

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

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  // scroll top mượt
  const scrollToTop = () => {
    const duration = 1000;
    const start = window.scrollY;
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const timeElapsed = currentTime - startTime;

      const progress = Math.min(
        timeElapsed / duration,
        1
      );

      const ease =
        1 - Math.pow(1 - progress, 3);

      window.scrollTo(
        0,
        start * (1 - ease)
      );

      if (progress < 1) {
        requestAnimationFrame(
          animateScroll
        );
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

          <p>
            Địa chỉ: 704 Phan Đình Phùng,
            Phường Kon Tum, tỉnh Quảng Ngãi
          </p>

          <p>
            Điện thoại: 0260.6287.775
          </p>

          <p>
            Email: thuvien@kontum.udn.vn
          </p>

          <p>
            Fanpage:
            <a
              href="https://kontum.udn.vn/"
              target="_blank"
              rel="noreferrer"
            >
              https://kontum.udn.vn/
            </a>
          </p>

        </div>

        {/* RIGHT */}
        <div className="footer-right">

          <div className="footer-time">

            <h4 className="footer-subtitle">
              Giờ mở cửa
            </h4>

            <p>
              Buổi Sáng : 7h20 - 11h00 (Thứ 2 - Chủ nhật)
            </p>

            <p>
              Buổi Chiều : 13h20 - 17h30 (Thứ 2 - Chủ nhật)
            </p>

            <p>
              Buổi tối : 18h00 - 21h00 (Thứ 2 - Chủ nhật)
            </p>

          </div>
          {/* SOCIAL */}
          <div className="social-group">

            <div className="social-box">
              <a
                href="https://www.facebook.com/kontum.udn.vn"
                target="_blank"
                
              >
                <img
                  src={iconfacebook}
                  alt="facebook"
                />
              </a>
            </div>

            <div className="social-box">
              <a
                href="https://www.tiktok.com/@kontum.udn.vn"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={icontiktok}
                  alt="tiktok"
                />
              </a>
            </div>

            <div className="social-box">
              <a
                href="https://www.youtube.com/@UDCKchannel"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={iconyoutube}
                  alt="youtube"
                />
              </a>
            </div>

          </div>

        </div>

      </div>
      {/* SCROLL TOP */}
      {showTopBtn && (
        <button
          className="scroll-top"
          onClick={scrollToTop}
        >
          ↑
        </button>
      )}

    </div>
  );
}