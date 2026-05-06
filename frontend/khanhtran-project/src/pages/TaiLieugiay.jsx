import { useState } from "react";
import { books } from "../data/books";
import "../App.css";

export default function SachGiay() {
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

  const filteredBooks =
    selected === ""
      ? books
      : books.filter((book) => book.category === selected);

  return (
    <div className="list-container">

      {/* ===== BỘ SƯU TẬP ===== */}
      <h1 className="about-title">BỘ SƯU TẬP</h1>
      <div className="list-box">
        {collections.map((item, index) => (
          <div key={index} className="list-item">
            {item}
          </div>
        ))}
      </div>

      {/* ===== DANH SÁCH NGÀNH ===== */}
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