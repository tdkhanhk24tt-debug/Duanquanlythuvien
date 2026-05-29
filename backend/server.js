require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= STATIC =================
app.use("/images", express.static("images"));

// ================= DATABASE =================
const db = require("./config/db");

// Hàm sinh slug dùng chung tại server
function generateSlug(text) {
  if (!text) return "";
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// ================= ROUTES CHUYÊN BIỆT CHO TRANG CHI TIẾT NGÀNH =================
// Đặt ở đây để Express ưu tiên xử lý trước khi check 404 ngầm bên trong routes(db)
app.get("/api/nganh/:slug", async (req, res) => {
  const slug = req.params.slug;

  try {
    const [nganhRows] = await db.promise().query(
      "SELECT id, ma_nganh, ten_nganh FROM nganh_hoc"
    );

    const major = nganhRows.find((item) => generateSlug(item.ten_nganh) === slug);

    if (!major) {
      return res.status(404).json({ message: "Không tìm thấy ngành học" });
    }

    const [rows] = await db.promise().query(
      "SELECT * FROM tai_lieu WHERE nganh_hoc_id = ?",
      [major.id]
    );

    return res.json(rows);
  } catch (error) {
    console.error("❌ Lỗi chi tiết tại route /api/nganh/:slug:", error);
    return res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
});

// ================= ROUTES HỆ THỐNG CŨ =================
const routes = require("./routes");
const sachRoutes = require("./routes/sach");
const loaiTaiLieuRoutes = require("./routes/loaitailieu");
const nganhHocRoutes = require("./routes/nganhhoc");

app.use("/api/sach", sachRoutes);
app.use("/api/loaitailieu", loaiTaiLieuRoutes);
app.use("/api/nganhhoc", nganhHocRoutes);
app.use("/", routes(db)); // Route tổng hợp ôm các URL rễ cây

// ================= TEST ROUTE =================
app.get("/test", (req, res) => {
  res.json({ message: "Server OK" });
});

// ================= ERROR HANDLING (BẮT LỖI) =================
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);

  res.status(500).json({
    message: "Lỗi server",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// ================= 404 NOT FOUND (ĐẶT Ở CUỐI CÙNG CỦA CÁC ROUTE) =================
app.use((req, res) => {
  res.status(404).json({ message: "Không tìm thấy route" });
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy: http://127.0.0.1:${PORT}`);
});

// ================= SAFETY CRASH =================
process.on("uncaughtException", (err) => {
  console.error("🔥 Uncaught Exception:", err);
});