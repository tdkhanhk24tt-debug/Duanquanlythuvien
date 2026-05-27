import { useState } from "react";
import "../App.css";

export default function NhapSach() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    publisher: "",
    year: "",
    quantity: "",
    description: "",
  });

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(book);

    alert("Thêm sách thành công!");

    setBook({
      title: "",
      author: "",
      category: "",
      publisher: "",
      year: "",
      quantity: "",
      description: "",
    });
  };

  return (
    <div className="bookform-page">

      <div className="bookform-container">

        <h1 className="about-title">
          NHẬP SÁCH THƯ VIỆN
        </h1>

        <form onSubmit={handleSubmit}>

          {/* TÊN SÁCH */}
          <div className="bookform-group">
            <label>Tên sách</label>

            <input
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
              placeholder="Nhập tên sách..."
              required
            />
          </div>

          {/* TÁC GIẢ */}
          <div className="bookform-group">
            <label>Tác giả</label>

            <input
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
              placeholder="Nhập tác giả..."
              required
            />
          </div>

          {/* THỂ LOẠI */}
          <div className="bookform-group">
            <label>Thể loại</label>

            <select
              name="category"
              value={book.category}
              onChange={handleChange}
              required
            >
              <option value="">-- Chọn thể loại --</option>
              <option>Giáo trình</option>
              <option>Tài liệu tham khảo</option>
              <option>Luận văn</option>
              <option>Tài liệu điện tử</option>
              <option>Bài giảng</option>
            </select>
          </div>

          {/* NHÀ XUẤT BẢN */}
          <div className="bookform-group">
            <label>Nhà xuất bản</label>

            <input
              type="text"
              name="publisher"
              value={book.publisher}
              onChange={handleChange}
              placeholder="Nhập nhà xuất bản..."
            />
          </div>

          {/* NĂM */}
          <div className="bookform-row">

            <div className="bookform-group">
              <label>Năm xuất bản</label>

              <input
                type="number"
                name="year"
                value={book.year}
                onChange={handleChange}
                placeholder="2026"
              />
            </div>

            <div className="bookform-group">
              <label>Số lượng</label>

              <input
                type="number"
                name="quantity"
                value={book.quantity}
                onChange={handleChange}
                placeholder="10"
              />
            </div>

          </div>

          {/* MÔ TẢ */}
          <div className="bookform-group">
            <label>Mô tả</label>

            <textarea
              name="description"
              value={book.description}
              onChange={handleChange}
              placeholder="Nhập mô tả sách..."
              rows="5"
            ></textarea>
          </div>

          {/* BUTTON */}
          <button type="submit" className="bookform-btn">
            THÊM SÁCH
          </button>

        </form>

      </div>

    </div>
  );
}