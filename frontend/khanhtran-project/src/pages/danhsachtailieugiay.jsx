import { useState } from "react";
import "../App.css";
import bookImg from "../assets/iconbook.jpg";

export default function DanhSachTaiLieuGiay() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");

  // DATA
  const books = [
    {
      id: 1,
      title: "Triết học Mác - Lênin",
      author: "Nguyen, Van A",
      view: 3,
    },
    {
      id: 2,
      title: "Kinh tế chính trị",
      author: "Tran, Van B",
      view: 5,
    },
    {
      id: 3,
      title: "Chủ nghĩa xã hội khoa học",
      author: "Le, Thi C",
      view: 2,
    },
    {
      id: 4,
      title: "Tư tưởng Hồ Chí Minh",
      author: "Pham, Van D",
      view: 6,
    },
    {
      id: 5,
      title: "Lịch sử Đảng Cộng sản",
      author: "Hoang, Van E",
      view: 1,
    },
    {
      id: 6,
      title: "Pháp luật đại cương",
      author: "Nguyen, Thi F",
      view: 4,
    },
  ];

  // SEARCH
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="tailieu-page">

      {/* HEADER */}
      <div className="tailieu-header">
        Tài liệu theo bộ sưu tập:
        <span> Tài liệu giấy</span>
      </div>

      {/* SEARCH */}
      <div className="tailieu-search-box">

        <input
          type="text"
          placeholder="Tìm tài liệu, giáo trình mong muốn ..."
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

      {/* VIEW BUTTON */}
      <div className="tailieu-toolbar">

        <button
          className={
            view === "grid"
              ? "toolbar-btn active-view"
              : "toolbar-btn"
          }
          onClick={() => setView("grid")}
        >
          ⊞
        </button>

        <button
          className={
            view === "list"
              ? "toolbar-btn active-view"
              : "toolbar-btn"
          }
          onClick={() => setView("list")}
        >
          ☰
        </button>

      </div>

      {/* GRID */}
      <div
        className={
          view === "grid"
            ? "tailieu-grid"
            : "tailieu-list"
        }
      >

        {filteredBooks.map((book) => (
          <div
            className={
              view === "grid"
                ? "tailieu-card"
                : "tailieu-list-card"
            }
            key={book.id}
          >

            {/* IMAGE */}
            <div className="tailieu-img-box">
              <img
                src={bookImg}
                alt="book"
                className="tailieu-img"
              />
            </div>

            {/* CONTENT */}
            <div className="tailieu-content">

              <h3 className="tailieu-title">
                {book.title}
              </h3>

              <p className="tailieu-author">
                {book.author}
              </p>

              <div className="tailieu-meta">
                <span>📄 0</span>
                <span>📕 0</span>
                <span>👁 {book.view}</span>
              </div>

              <button className="tailieu-detail-btn">
                CHI TIẾT
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}