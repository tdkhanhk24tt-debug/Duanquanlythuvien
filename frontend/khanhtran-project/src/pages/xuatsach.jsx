import { useState } from "react";
import "../App.css";

export default function XuatSach() {
  const [search, setSearch] = useState("");

  // DATA SÁCH
  const [books] = useState([
    {
      id: 1,
      title: "Triết học Mác - Lênin",
      author: "Nguyễn Văn A",
      category: "Giáo trình",
      quantity: 10,
    },
    {
      id: 2,
      title: "Kinh tế chính trị",
      author: "Trần Văn B",
      category: "Tham khảo",
      quantity: 5,
    },
    {
      id: 3,
      title: "Pháp luật đại cương",
      author: "Lê Văn C",
      category: "Chuyên ngành",
      quantity: 8,
    },
  ]);

  // LỌC SÁCH
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="export-page">

      {/* HEADER */}
   
        <h1 className="about-title">Xuất sách thư viện</h1>
        <p>Quản lý danh sách sách xuất kho</p>
    

      {/* SEARCH */}
      <div className="export-search">
        <input
          type="text"
          placeholder="Tìm kiếm tên sách..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button>Tìm kiếm</button>
      </div>

      {/* TABLE */}
      <div className="export-table-box">

        <table className="export-table">

          <thead>
            <tr>
              <th>Mã sách</th>
              <th>Tên sách</th>
              <th>Tác giả</th>
              <th>Danh mục</th>
              <th>Số lượng</th>
              <th>Thao tác</th>
            </tr>
          </thead>

          <tbody>

            {filteredBooks.map((book) => (
              <tr key={book.id}>

                <td>{book.id}</td>

                <td>{book.title}</td>

                <td>{book.author}</td>

                <td>{book.category}</td>

                <td>{book.quantity}</td>

                <td>
                  <button className="export-btn">
                    Xuất sách
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}