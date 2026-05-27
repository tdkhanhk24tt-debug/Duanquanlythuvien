import { useState } from "react";
import "../App.css";
import bookImg from "../assets/iconbook.jpg";

export default function TaiLieuPage({ type }) {

  const [search, setSearch] = useState("");

  // TITLE
  const titles = {
    "tai-lieu-giay": "Tài liệu giấy",
    "tai-lieu-dien-tu": "Tài liệu điện tử",
    "luan-van": "Luận văn - Luận án",
    "tai-lieu-mo": "Tài liệu mở",
  };

  // DATA
  const books = [
    {
      id: 1,
      title: "Triết học Mác - Lênin",
      author: "Nguyễn Văn A",
    },
    {
      id: 2,
      title: "Kinh tế chính trị",
      author: "Trần Văn B",
    },
  ];

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="tailieu-page">

      {/* HEADER */}
      <div className="tailieu-header">
        Tài liệu theo bộ sưu tập:
        <span> {titles[type]}</span>
      </div>

      {/* SEARCH */}
      <div className="tailieu-search-box">

        <input
          type="text"
          placeholder="Tìm tài liệu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="tailieu-search-input"
        />

        <button className="tailieu-search-btn">
          TÌM KIẾM
        </button>

      </div>

      {/* RESULT */}
      <h2 className="tailieu-result">
        Tìm được {filteredBooks.length} tài liệu
      </h2>

      {/* GRID */}
      <div className="tailieu-grid">

        {filteredBooks.map((book) => (
          <div className="tailieu-card" key={book.id}>

            <div className="tailieu-img-box">
              <img
                src={bookImg}
                alt="book"
                className="tailieu-img"
              />
            </div>

            <h3 className="tailieu-title">
              {book.title}
            </h3>

            <p className="tailieu-author">
              {book.author}
            </p>

            <div className="tailieu-meta">
              <span>📄 0</span>
              <span>📕 0</span>
              <span>👁 3</span>
            </div>

            <button className="tailieu-detail-btn">
              CHI TIẾT
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}