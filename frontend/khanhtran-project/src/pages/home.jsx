import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

// ===== API BASE =====
const API = "http://127.0.0.1:5000";

export default function Dashboard() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // State lưu danh sách ngành học từ Database
  const [majors, setMajors] = useState([]);
  const [loadingMajors, setLoadingMajors] = useState(true);

  // ================= FETCH CATEGORIES =================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API}/api/loaitailieu`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const categoriesWithSlug = data.map((cat) => ({
          ...cat,
          slug:
            cat.slug ||
            cat.ten_loai.toLowerCase().replace(/\s+/g, "-"),
        }));

        setCategories(categoriesWithSlug || []);
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // ================= FETCH MAJORS (TỪ TABLE nganh_hoc) =================
  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const response = await fetch(`${API}/api/nganhhoc`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // Nhận danh sách mảng phẳng từ API

        // Thuật toán: Chia mảng phẳng thành các cột nhỏ (mỗi cột chứa tối đa 4 ngành)
        // để hiển thị song song đúng như thiết kế CSS ban đầu của bạn
        const chunkedMajors = [];
        for (let i = 0; i < data.length; i += 4) {
          chunkedMajors.push(data.slice(i, i + 4));
        }

        setMajors(chunkedMajors);
      } catch (error) {
        console.error("Lỗi khi tải ngành học từ database:", error);
      } finally {
        setLoadingMajors(false);
      }
    };

    fetchMajors();
  }, []);

  return (
    <div className="dashboard-container">

      {/* LEFT - CATEGORY */}
      <div className="main-layout">

        <div className="left">
          <div className="category-container">

            {loadingCategories ? (
              <p>Đang tải danh mục...</p>
            ) : (
              categories.map((item) => (
                <div
                  key={item.id}
                  className="category-card"
                  onClick={() => navigate(`/resources/${item.slug}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="category-icon">📘</div>
                  <span>{item.ten_loai}</span>
                </div>
              ))
            )}

          </div>
        </div>

        {/* RIGHT - TỔNG QUAN THƯ VIỆN (GIỮ NGUYÊN VẸN) */}
        <div className="right">

          <div className="about-container1">

            <h1 className="about-title1">
              Tổng quan thư viện
            </h1>

            <p className="italic1">1. Giới thiệu chung</p>
            <p className="text1">
              Thư viện UDCK là hệ thống cung cấp tài nguyên học tập và nghiên cứu dành cho sinh viên, giảng viên và người dùng quan tâm. Thư viện trực thuộc Phân Hiệu Đại học Đà Nẵng tại Kon Tum, được xây dựng nhằm hỗ trợ hiệu quả cho quá trình học tập và nghiên cứu. Với nguồn tài liệu phong phú và hệ thống quản lý hiện đại, UDCK giúp người dùng tiếp cận tri thức một cách nhanh chóng và tiện lợi.
            </p>

            <p className="italic1">2. Tài nguyên hiện có</p>
            <p className="text1">
              Thư viện UDCK sở hữu nguồn tài nguyên đa dạng, bao gồm hàng nghìn đầu sách thuộc nhiều lĩnh vực khác nhau. Ngoài sách giấy, thư viện còn cung cấp ebook, luận văn, tạp chí và nhiều loại tài liệu số phục vụ nhu cầu học tập và nghiên cứu. Hệ thống tài nguyên được cập nhật thường xuyên nhằm đảm bảo tính mới và phù hợp với người dùng.
            </p>

            <p className="italic1">3. Cơ sở vật chất</p>
            <p className="text1">
              Thư viện được trang bị đầy đủ cơ sở vật chất hiện đại nhằm phục vụ tốt nhất cho người dùng. Bao gồm các phòng đọc yên tĩnh, phòng máy tính kết nối internet, hệ thống wifi miễn phí và khu vực tự học hoặc học nhóm. Không gian thư viện được thiết kế thân thiện, tạo điều kiện thuận lợi cho việc học tập và nghiên cứu.
            </p>

            <p className="italic1">4. Đối tượng phục vụ</p>
            <p className="text1">
              Thư viện UDCK phục vụ chủ yếu cho sinh viên, giảng viên và cán bộ trong đơn vị. Ngoài ra, thư viện cũng mở rộng phục vụ cho các cá nhân có nhu cầu tìm kiếm tài liệu và nghiên cứu trong nhiều lĩnh vực khác nhau.
            </p>

            <p className="italic1">5. Hệ thống & công nghệ</p>
            <p className="text1">
              Thư viện UDCK được tích hợp hệ thống website hiện đại, cho phép người dùng tra cứu tài liệu trực tuyến một cách nhanh chóng. Người dùng có thể đăng ký tài khoản, tìm kiếm sách, xem thông tin chi tiết ngay trên hệ thống. Công nghệ được áp dụng nhằm nâng cao trải nghiệm và tối ưu hóa việc quản lý thư viện.
            </p>

            <p className="italic1">6. Điểm nổi bật</p>
            <p className="text1">
              Thư viện UDCK nổi bật với hệ thống tìm kiếm nhanh, giao diện thân thiện và dễ sử dụng. Nguồn tài liệu phong phú, đặc biệt là tài liệu số, giúp người dùng dễ dàng tiếp cận mọi lúc mọi nơi. Ngoài ra, hệ thống hỗ trợ trực tuyến giúp giải đáp thắc mắc và hỗ trợ người dùng kịp thời.
            </p>

            <p className="italic1">7. Thông tin cơ bản</p>

            <p className="text1">
              Địa chỉ: 704 Phan Đình Phùng, Phường Kon Tum, tỉnh Quảng Ngãi
            </p>

            <p className="text1">
              Email: thuvien@kontum.udn.vn
            </p>

            <p className="text1">
              Số điện thoại: 0260.6287.775
            </p>

          </div>

        </div>
      </div>

      {/* MAJOR - TÀI LIỆU CHUYÊN NGÀNH ĐÃ XỔ DATA TỪ DATABASE */}
      <div className="major-section">

        <h2 className="major-title">TÀI LIỆU CHUYÊN NGÀNH</h2>

        <div className="major-subtitle">Đại học</div>

        <div className="major-grid">

          {loadingMajors ? (
            <p style={{ textTransform: "none", color: "#777", paddingLeft: "15px" }}>
              Đang tải danh sách ngành học...
            </p>
          ) : (
            majors.map((col, i) => (
              <div key={i} className="major-column">

                {col.map((item) => (
                  <div
                    key={item.id} // Sử dụng ID chính khóa từ database
                    className="major-item"
                    // Chuyển hướng trang theo slug (Ví dụ: /major/cong-nghe-thong-tin)
                    onClick={() => navigate(`/major/${item.slug}`)}
                    style={{ cursor: "pointer" }}
                  >
                    ▶ {item.ten_nganh}
                  </div>
                ))}

              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
}