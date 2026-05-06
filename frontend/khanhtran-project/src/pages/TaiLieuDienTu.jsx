import { useState } from "react";
import "../App.css";
import bookImg from "../assets/iconbook.jpg";
export default function TaiLieuDienTu() {
  const [search, setSearch] = useState("");

  const books = Array(8).fill({
    title: "Dự án và kế hoạch kinh doanh",
    author: "Đỗ, Huy Khánh",
  });

  return (
    <div className="search-page">

      {/* HEADER */}
      <div className="search-header">
        Tài liệu theo bộ sưu tập: <b>Tài liệu điện tử</b>
      </div>

      {/* SEARCH */}
      <div className="search-box-main">
        <input
          type="text"
          placeholder="Tìm tài liệu, giáo trình mong muốn ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="search-btn">TÌM KIẾM</button>
      </div>

      {/* RESULT */}
      <h2 className="result-text">Tìm được 204 tài liệu</h2>
      {/* LIST (đã đổi tên class) */}
      <div className="tailieu-grid">
        {books.map((book, index) => (
          <div className="tailieu-card" key={index}>

            <div className="tailieu-img-box">
              <img
                src={bookImg}
                alt="book"
                className="tailieu-img"
              />
            </div>

            <h3>{book.title}</h3>
            <p className="author">{book.author}</p>

            <div className="tailieu-meta">
              <span>📄 1</span>
              <span>📚 1</span>
              <span>👁 3</span>
            </div>

            <button className="detail-btn">CHI TIẾT</button>

          </div>
        ))}
      </div>

    </div>
  );
}