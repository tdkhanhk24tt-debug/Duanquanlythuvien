import { useState } from "react";
import "../App.css";
import news1 from "../assets/new1.jpg";
import news2 from "../assets/new2.jpg";
import { books } from "../data/books";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const booksPerPage = 8;

  // CATEGORY
  const categories = [
    "Giáo trình học tập",
    "Tài liệu tham khảo giấy",
    "Luận văn - Luận án",
    "Bài trích báo - tạp chí",
    "Tài liệu mở",
    "Đồ án tốt nghiệp"
  ];

  // NEWS
  const news = [
    {
      title: "Sáng tác ấn phẩm Chào mừng 20 năm thành lập Phân hiệu ĐHĐN tại Kon Tum",
      date: "14/02/2026",
      img: news1
    },
    {
      title: "Chuỗi sự kiện chào mừng ngày sách và văn hóa đọc Việt Nam lần thứ 5 năm 2026",
      date: "19/04/2026",
      img: news2
    },
  ];

  // MAJOR
  const majors = [
    ["Luật kinh tế", "Ngôn ngữ Anh", "Quản trị kinh doanh", "Thương mại điện tử"],
    ["Kế toán","Giáo dục mầm non", "Giáo dục tiểu học"],
    ["Công nghệ thông tin", "Kỹ thuật xây dựng", "Công nghệ kỹ thuật ô tô"],
    ["Quản lý Nhà nước","Công nghệ kỹ thuật điều khiển và tự động hóa","Quản trị dịch vụ du lịch và lữ hành"],
  ];

  // ===== PAGINATION =====
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  return (
    <div className="dashboard-container">
      {/* MAIN */}
      <div className="main-layout">

        {/* LEFT */}
        <div className="left">
          <div className="category-container">
            {categories.map((item, index) => (
              <div key={index} className="category-card">
                <div className="category-icon">📘</div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
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
          {majors.map((col, colIndex) => (
            <div key={colIndex} className="major-column">
              {col.map((item, index) => (
                <div key={index} className="major-item">
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
          <div className="book-title-box"></div>
          <span className="book-title">GIỚI THIỆU SÁCH</span>
        </div>

        <div className="book-tab">Giới thiệu</div>

        <div className="book-grid">
          {currentBooks.map((book, index) => (
            <div key={index} className="book-card">
              <img src={book.img} alt="book" className="book-img" />
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
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          >
            {"<"}
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <span
              key={index}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => setCurrentPage(index + 1)}
              style={{ cursor: "pointer", margin: "0 5px" }}
            >
              {index + 1}
            </span>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          >
            {">"}
          </button>

        </div>

      </div>
    </div>
  );
}