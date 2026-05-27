import { useState } from "react";
import "../App.css";
import bookImg from "../assets/iconbook.jpg";

export default function TaiLieuDienTu() {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const books = Array(8).fill({
    title: "Dự án và kế hoạch kinh doanh",
    author: "Đỗ, Huy Khánh",
  });

  return (
    <div className="tailieu-page">

      {/* HEADER */}
      <div className="tailieu-header">
        Tài liệu theo bộ sưu tập: <span>Tài liệu điện tử</span>
      </div>

      {/* SEARCH */}
      <div className="tailieu-search-box">
        <input
          type="text"
          placeholder="🔍 Tìm tài liệu, giáo trình mong muốn ..."
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
        Tìm được 204 tài liệu
      </h2>

      {/* TOOLBAR */}
      <div className="tailieu-toolbar">
        <button
          className={`toolbar-btn ${
            viewMode === "grid" ? "active-view" : ""
          }`}
          onClick={() => setViewMode("grid")}
        >
          ⊞
        </button>

        <button
          className={`toolbar-btn ${
            viewMode === "list" ? "active-view" : ""
          }`}
          onClick={() => setViewMode("list")}
        >
          ☰
        </button>
      </div>

      {/* GRID VIEW */}
      {viewMode === "grid" ? (
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

              <h3 className="tailieu-title">
                {book.title}
              </h3>

              <p className="tailieu-author">
                {book.author}
              </p>

              <div className="tailieu-meta">
                <span>📄 1</span>
                <span>📚 1</span>
                <span>👁 3</span>
              </div>

              <button className="tailieu-detail-btn">
                CHI TIẾT
              </button>

            </div>
          ))}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="tailieu-list">
          {books.map((book, index) => (
            <div className="tailieu-list-card" key={index}>

              <div className="tailieu-img-box">
                <img
                  src={bookImg}
                  alt="book"
                  className="tailieu-img"
                />
              </div>

              <div className="tailieu-content">
                <h3 className="tailieu-title">
                  {book.title}
                </h3>

                <p className="tailieu-author">
                  {book.author}
                </p>

                <div className="tailieu-meta">
                  <span>📄 1</span>
                  <span>📚 1</span>
                  <span>👁 3</span>
                </div>

                <button className="tailieu-detail-btn">
                  CHI TIẾT
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}