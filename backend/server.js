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

// ================= ROUTES =================
const routes = require("./routes");
const sachRoutes = require("./routes/sach");
const loaiTaiLieuRoutes = require("./routes/loaitailieu");

app.use("/", routes(db));
app.use("/api/sach", sachRoutes);
app.use("/api/loaitailieu", loaiTaiLieuRoutes);

// ================= TEST ROUTE =================
app.get("/test", (req, res) => {
  res.json({ message: "Server OK" });
});

// ================= ERROR HANDLING =================
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);

  res.status(500).json({
    message: "Lỗi server",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// ================= 404 =================
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