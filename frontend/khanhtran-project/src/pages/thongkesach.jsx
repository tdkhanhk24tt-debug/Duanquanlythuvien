import { useState } from "react";
import "../App.css";

export default function ThongKeSach() {

  // DATA
  const [stats] = useState([
    {
      id: 1,
      category: "Giáo trình",
      total: 120,
      imported: 100,
      exported: 30,
      remain: 90,
    },
    {
      id: 2,
      category: "Tài liệu tham khảo",
      total: 95,
      imported: 80,
      exported: 20,
      remain: 60,
    },
    {
      id: 3,
      category: "Luận văn - Luận án",
      total: 60,
      imported: 50,
      exported: 10,
      remain: 40,
    },
    {
      id: 4,
      category: "Tài liệu điện tử",
      total: 210,
      imported: 180,
      exported: 40,
      remain: 140,
    },
  ]);

  // TỔNG
  const totalBooks = stats.reduce((sum, item) => sum + item.total, 0);

  const totalImport = stats.reduce(
    (sum, item) => sum + item.imported,
    0
  );

  const totalExport = stats.reduce(
    (sum, item) => sum + item.exported,
    0
  );

  const totalRemain = stats.reduce(
    (sum, item) => sum + item.remain,
    0
  );

  return (
    <div className="stats-page">

      {/* HEADER */}
      <div className="stats-header">
        <h1 className="about-title">Thống kê sách thư viện</h1>
        <p>Quản lý nhập - xuất sách trong thư viện</p>
      </div>

      {/* CARD */}
      <div className="stats-card-container">

        <div className="stats-card">
          <h3>Tổng số sách</h3>
          <p>{totalBooks}</p>
        </div>

        <div className="stats-card">
          <h3>Sách đã nhập</h3>
          <p>{totalImport}</p>
        </div>

        <div className="stats-card">
          <h3>Sách đã xuất</h3>
          <p>{totalExport}</p>
        </div>

        <div className="stats-card">
          <h3>Sách còn lại</h3>
          <p>{totalRemain}</p>
        </div>

      </div>

      {/* TABLE */}
      <div className="stats-table-box">

        <table className="stats-table">

          <thead>
            <tr>
              <th>STT</th>
              <th>Danh mục</th>
              <th>Tổng sách</th>
              <th>Đã nhập</th>
              <th>Đã xuất</th>
              <th>Còn lại</th>
            </tr>
          </thead>

          <tbody>

            {stats.map((item, index) => (
              <tr key={item.id}>

                <td>{index + 1}</td>

                <td>{item.category}</td>

                <td>{item.total}</td>

                <td>{item.imported}</td>

                <td>{item.exported}</td>

                <td>{item.remain}</td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}