require("dotenv").config();
const mysql = require("mysql2");

// Sử dụng createPool thay vì createConnection
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "123456",
  database: process.env.DB_NAME || "qlthuvienudck",
  
  // Các thông số tối ưu cho Pool
  waitForConnections: true,
  connectionLimit: 10, // Tối đa 10 kết nối cùng lúc
  queueLimit: 0        // Không giới hạn số lượng yêu cầu xếp hàng
});

// Test thử kết nối ngay khi khởi động server
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Lỗi kết nối MySQL:", err.message);
    
    // Bắt các lỗi phổ biến
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("⚠️ Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("⚠️ Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("⚠️ Database connection was refused (Có thể MySQL chưa chạy).");
    }
  } 
  
  if (connection) {
    console.log("✅ MySQL Pool Connected");
    connection.release(); // Quan trọng: Trả kết nối lại cho Pool sau khi test xong
  }
});

module.exports = db;