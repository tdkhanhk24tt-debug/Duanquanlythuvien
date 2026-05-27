import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

import news1 from "../assets/new1.jpg";
import news2 from "../assets/new2.jpg";
import iconbook from "../assets/iconbook.jpg";

// ===== API BASE =====
const API = "http://127.0.0.1:5000";

export default function Dashboard() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const booksPerPage = 8;

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
        console.error("❌ Lỗi load categories:", error);

        // fallback data
        setCategories([
          { id: 1, ten_loai: "Giáo trình học tập", slug: "giao-trinh-hoc-tap" },
          { id: 2, ten_loai: "Tài liệu tham khảo giấy", slug: "tai-lieu-tham-khao-giay" },
          { id: 3, ten_loai: "Luận văn - Luận án", slug: "luan-van-luan-an" },
          { id: 4, ten_loai: "Bài trích báo - tạp chí", slug: "bai-trich-bao-tap-chi" },
          { id: 5, ten_loai: "Tài liệu mở", slug: "tai-lieu-mo" },
          { id: 6, ten_loai: "Đồ án tốt nghiệp", slug: "do-an-tot-nghiep" },
        ]);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // ================= NEWS =================
  const news = [
    {
      title:
        "Sáng tác ấn phẩm Chào mừng 20 năm thành lập Phân hiệu ĐHĐN tại Kon Tum",
      date: "14/02/2026",
      img: news1,
    },
    {
      title:
        "Chuỗi sự kiện chào mừng ngày sách và văn hóa đọc Việt Nam lần thứ 5 năm 2026",
      date: "19/04/2026",
      img: news2,
    },
  ];

  // ================= MAJORS =================
  const majors = [
    ["Luật kinh tế", "Ngôn ngữ Anh", "Quản trị kinh doanh", "Thương mại điện tử"],
    ["Kế toán", "Giáo dục mầm non", "Giáo dục tiểu học"],
    ["Công nghệ thông tin", "Kỹ thuật xây dựng", "Công nghệ kỹ thuật ô tô"],
    ["Quản lý Nhà nước", "Công nghệ kỹ thuật điều khiển và tự động hóa", "Quản trị du lịch"],
  ];

  // ================= BOOKS =================
  const books = [
    { title: "Hướng dẫn học tập", author: "Nguyễn Văn A", img: news1, views: 120 },
    { title: "Tài liệu tham khảo", author: "Lê Thị B", img: news2, views: 95 },
    { title: "Luận văn mẫu", author: "Trần C", img: news1, views: 180 },
    { title: "Phương pháp nghiên cứu", author: "Phạm D", img: news2, views: 135 },
    { title: "Quản trị kinh doanh", author: "Hoàng E", img: news1, views: 210 },
    { title: "Kỹ thuật máy tính", author: "Võ F", img: news2, views: 160 },
    { title: "Thương mại điện tử", author: "Nguyễn G", img: news1, views: 88 },
    { title: "Luật kinh tế", author: "Lê H", img: news2, views: 132 },
    { title: "Giáo dục mầm non", author: "Trần I", img: news1, views: 74 },
    { title: "Công nghệ ô tô", author: "Phạm J", img: news2, views: 101 },
    { title: "Đồ án tốt nghiệp", author: "Hoàng K", img: news1, views: 175 },
    { title: "Công nghệ mở", author: "Vũ L", img: news2, views: 142 },
  ];

  // ================= PAGINATION =================
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

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

        {/* RIGHT - NEWS */}
        <div className="right">

          <div className="news-header">
            <span className="news-title">BẢN TIN</span>
          </div>

          <div className="news-box">
            <div className="news-container">
              {news.map((item, index) => (
                <div key={index} className="news-card">
                  <img src={item.img} alt="news" className="news-img" />
                  <div className="news-content">
                    <p className="news-text">{item.title}</p>
                    <span className="news-date">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* MAJOR */}
      <div className="major-section">
        <h2 className="major-title">TÀI LIỆU CHUYÊN NGÀNH</h2>
        <div className="major-subtitle">Đại học</div>

        <div className="major-grid">
          {majors.map((col, i) => (
            <div key={i} className="major-column">
              {col.map((item, j) => (
                <div key={j} className="major-item">
                  ▶ {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* BOOK */}
      <div className="book-section">

        <div className="book-header">
          <span className="book-title">GIỚI THIỆU SÁCH</span>
        </div>

        <div className="book-grid">
          {currentBooks.map((book, index) => (
            <div key={index} className="book-card">
              <img src={iconbook} alt="book" className="book-img" />
              <p className="book-name">{book.title}</p>
              <span className="book-author">{book.author}</span>

              <div className="book-info">
                <span>👁 {book.views}</span>
              </div>

              <button className="detail-btn">Chi tiết</button>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="pagination">

          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          >
            {"<"}
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <span
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
              style={{ cursor: "pointer", margin: "0 5px" }}
            >
              {i + 1}
            </span>
          ))}

          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(p + 1, totalPages))
            }
          >
            {">"}
          </button>

        </div>

      </div>

    </div>
  );
}