import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function SachGiay() {
  const navigate = useNavigate();

  const collections = [
    "Tài liệu giấy",
    "Luận án, luận văn",
    "Ấn phẩm định kỳ",
    "Tài liệu điện tử",
  ];

  const categories = [
    "Luật kinh tế",
    "Kế toán",
    "Quản lý nhà nước ",
    "Công nghệ thông tin",
    "Ngôn ngữ Anh",
    "Giáo dục mầm non",
    "Kỹ thuật xây dựng",
    "Công nghệ kỹ thuật điều khiển và tự động hóa",
    "Quản trị kinh doanh",
    "Giáo dục tiểu học",
    "Công nghệ kỹ thuật ô tô",
    "Thương mại điện tử",
    "Quản trị dịch vụ du lịch và lữ hành",
  ];

  const [selected, setSelected] = useState("");

  // SAMPLE DATA (prevent undefined `books` error)
  const books = [
    { id: 1, title: "Triết học Mác - Lênin", category: "Luật kinh tế" },
    { id: 2, title: "Kinh tế chính trị", category: "Kế toán" },
    { id: 3, title: "Chủ nghĩa xã hội khoa học", category: "Quản trị kinh doanh" },
    { id: 4, title: "Tư tưởng Hồ Chí Minh", category: "Ngôn ngữ Anh" },
    { id: 5, title: "Lịch sử Đảng Cộng sản", category: "Giáo dục tiểu học" },
    { id: 6, title: "Pháp luật đại cương", category: "Quản lý nhà nước " },
  ];

  const filteredBooks =
    selected === ""
      ? books
      : books.filter((book) => book.category === selected);

  return (
    <div className="list-container">

      {/* BỘ SƯU TẬP */}
      <h1 className="about-title">BỘ SƯU TẬP</h1>
      <div className="list-box">
        {collections.map((item, index) => (
          <div
            key={index}
            className="list-item"
            onClick={() => {
              if (item === "Tài liệu điện tử") {
                navigate("/resources/tai-lieu-dien-tu");
              }
              if (item === "Tài liệu giấy") {
                navigate("/resources/danh-sach-tai-lieu-giay");
              }
            }}
            style={{ cursor: "pointer" }}
          >
            {item}
          </div>
        ))}
      </div>

      {/* DANH SÁCH NGÀNH */}
      <h1 className="about-title">DANH SÁCH NGÀNH</h1>
      <div className="list-box">
        {categories.map((cat, index) => (
          <div
            key={index}
            className={`list-item ${selected === cat ? "active-item" : ""}`}
            onClick={() => setSelected(cat)}
          >
            {cat}
          </div>
        ))}
      </div>

    </div>
  );
}