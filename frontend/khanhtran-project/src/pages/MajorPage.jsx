
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import iconbook from "../assets/iconbook.jpg";

export default function MajorPage() {
  const { slug } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 12;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/nganh/${slug}`
        );
        if (!response.ok) {
          throw new Error("Lỗi khi tải dữ liệu");
        }
        const data = await response.json();
        setBooks(data || []);
        setError(null);
      } catch (err) {
        setError(err.message);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      fetchBooks();
    }
  }, [slug]);

  const filteredBooks = books.filter((book) =>
    (book.ten_sach || book.ten_tai_lieu || "")
      .toString()
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    (book.ten_tac_gia || "")
      .toString()
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  if (loading) {
    return (
      <div className="tailieu-page">
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tailieu-page">
        <p style={{ color: "red" }}>Lỗi: {error}</p>
      </div>
    );
  }

  return (
    <div className="tailieu-page">
      {/* HEADER */}
      <div className="tailieu-header">
        Tài liệu: <span> {slug}</span>
      </div>

      {/* SEARCH */}
      <div className="tailieu-search-box">
        <input
          type="text"
          placeholder="Tìm tài liệu, giáo trình mong muốn ..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="tailieu-search-input"
        />
      </div>

      {/* VIEW MODE */}
      <div className="view-mode">
        <button
          className={`view-btn ${view === "grid" ? "active" : ""}`}
          onClick={() => setView("grid")}
        ></button>
        <button
          className={`view-btn ${view === "list" ? "active" : ""}`}
          onClick={() => setView("list")}
        ></button>
      </div>

      {/* RESULT */}
      {currentBooks.length > 0 ? (
        view === "grid" ? (
          <div className="tailieu-grid">
            {currentBooks.map((book) => (
              <div key={book.id} className="tailieu-card">
                <div className="tailieu-img-box">
                  <img
                    className="tailieu-img"
                    src={
                      book.anh_bia
                        ? `http://localhost:5000/images/${book.anh_bia}`
                        : iconbook
                    }
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = iconbook;
                    }}
                    alt={book.ten_sach || book.ten_tai_lieu}
                  />
                </div>
                <div>
                  <div className="tailieu-title">
                    {book.ten_sach || book.ten_tai_lieu}
                  </div>
                  {book.ten_tac_gia && (
                    <p className="tailieu-author">
                      Tác giả: {book.ten_tac_gia}
                    </p>
                  )}
                  <div className="tailieu-meta">
                    👁️ {book.view || book.so_luot_xem || 0} lượt xem
                  </div>
                  <button className="tailieu-detail-btn">Chi tiết</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="tailieu-list">
            {currentBooks.map((book) => (
              <div key={book.id} className="tailieu-list-card">
                <div className="tailieu-img-box">
                  <img
                    className="tailieu-img"
                    src={
                      book.anh_bia
                        ? `http://localhost:5000/images/${book.anh_bia}`
                        : iconbook
                    }
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = iconbook;
                    }}
                    alt={book.ten_sach || book.ten_tai_lieu}
                  />
                </div>
                <div className="tailieu-content">
                  <h3 className="tailieu-title">
                    {book.ten_sach || book.ten_tai_lieu}
                  </h3>
                  {book.ten_tac_gia && (
                    <p className="tailieu-author">
                      Tác giả: {book.ten_tac_gia}
                    </p>
                  )}
                  <p className="tailieu-meta">
                    👁️ {book.view || book.so_luot_xem || 0} lượt xem
                  </p>
                  <button className="tailieu-detail-btn">Chi tiết</button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <p className="no-results">Không tìm thấy tài liệu nào</p>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            {"<<"}
          </button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <span
              key={index}
              className={currentPage === index + 1 ? "active-page" : ""}
              onClick={() => setCurrentPage(index + 1)}
              style={{ cursor: "pointer", margin: "0 5px" }}
            >
              {index + 1}
            </span>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            {">>"}
          </button>
        </div>
      )}
    </div>
  );
}