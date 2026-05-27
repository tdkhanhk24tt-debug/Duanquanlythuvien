import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../App.css";

export default function ResourceListPage() {
  const { slug } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/sach/${slug}`);
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

  // Lọc tài liệu theo tìm kiếm
  const filteredBooks = books.filter((book) =>
    (book.ten_sach || book.ten_tai_lieu || "")
      .toString()
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    (book.ten_tac_gia || book.ten_tac_gia || "")
      .toString()
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="tailieu-page"><p>Đang tải dữ liệu...</p></div>;
  }

  if (error) {
    return <div className="tailieu-page"><p style={{ color: "red" }}>Lỗi: {error}</p></div>;
  }

  return (
    <div className="tailieu-page">
      {/* HEADER */}
      <div className="tailieu-header">
        Tài liệu:
        <span> {slug}</span>
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
        <button className="tailieu-search-btn">TÌM KIẾM</button>
      </div>

      {/* VIEW MODE */}
      <div className="view-mode">
        <button
          className={`view-btn ${view === "grid" ? "active" : ""}`}
          onClick={() => setView("grid")}
        >
          Grid
        </button>
        <button
          className={`view-btn ${view === "list" ? "active" : ""}`}
          onClick={() => setView("list")}
        >
          List
        </button>
      </div>

      {/* RESULT */}
      {filteredBooks.length > 0 ? (
        // Grid or List view using existing CSS classes
        view === "grid" ? (
          <div className="tailieu-grid">
            {filteredBooks.map((book) => (
              <div key={book.id} className="tailieu-card">
                <div className="tailieu-img-box">
                  <img
                    className="tailieu-img"
                    src={
                      book.hinh_anh || book.anh_bia
                        ? `http://localhost:5000${book.hinh_anh || book.anh_bia}`
                        : "/placeholder.jpg"
                    }
                    alt={book.ten_sach || book.ten_tai_lieu}
                  />
                </div>
                <div>
                  <div className="tailieu-title">{book.ten_sach || book.ten_tai_lieu}</div>
                  <div className="tailieu-author">Tác giả: {book.ten_tac_gia || "Không rõ"}</div>
                  <div className="tailieu-meta">👁️ {book.view || book.so_luot_xem || 0} lượt xem</div>
                  <button className="tailieu-detail-btn">Chi tiết</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="tailieu-list">
            {filteredBooks.map((book) => (
              <div key={book.id} className="tailieu-list-card">
                <div className="tailieu-img-box">
                  <img
                    className="tailieu-img"
                    src={
                      book.hinh_anh || book.anh_bia
                        ? `http://localhost:5000${book.hinh_anh || book.anh_bia}`
                        : "/placeholder.jpg"
                    }
                    alt={book.ten_sach || book.ten_tai_lieu}
                  />
                </div>
                <div className="tailieu-content">
                  <h3 className="tailieu-title">{book.ten_sach || book.ten_tai_lieu}</h3>
                  <p className="tailieu-author">Tác giả: {book.ten_tac_gia || "Không rõ"}</p>
                  <p className="tailieu-meta">👁️ {book.view || book.so_luot_xem || 0} lượt xem</p>
                  <button className="tailieu-detail-btn">Chi tiết</button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <p className="no-results">Không tìm thấy tài liệu nào</p>
      )}
    </div>
  );
}
