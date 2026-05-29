const express = require("express");
const router = express.Router();
const db = require("../config/db");

function generateSlug(text) {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// 1. LẤY TOÀN BỘ NGÀNH (Sẽ map thành: GET /api/nganh)
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.promise().query(
      "SELECT id, ma_nganh, ten_nganh, mo_ta FROM nganh_hoc"
    );

    const result = rows.map((row) => ({
      id: row.id,
      ma_nganh: row.ma_nganh,
      ten_nganh: row.ten_nganh,
      mo_ta: row.mo_ta || "",
      slug: generateSlug(row.ten_nganh),
    }));

    return res.json(result);
  } catch (error) {
    console.error("🔥 Lỗi lấy danh sách ngành học:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
});

// 2. LẤY TÀI LIỆU THEO NGÀNH (Sẽ map thành: GET /api/nganh/:slug)
router.get("/:slug", async (req, res) => {
  const targetSlug = req.params.slug;
  try {
    // Tìm ID ngành dựa trên slug tự sinh
    const [nganhRows] = await db.promise().query("SELECT id, ten_nganh FROM nganh_hoc");
    const currentNganh = nganhRows.find(row => generateSlug(row.ten_nganh) === targetSlug);

    if (!currentNganh) {
      return res.status(404).json({ message: "Không tìm thấy ngành học tương ứng" });
    }

    // Truy vấn tài liệu thuộc ngành đó
    const [taiLieuRows] = await db.promise().query(`
      SELECT id, ten_tai_lieu, nam_xuat_ban
      FROM tai_lieu
      WHERE id_nganh = ?
    `, [currentNganh.id]);

    return res.json(taiLieuRows);
  } catch (error) {
    console.error("🔥 Lỗi lấy tài liệu theo ngành:", error);
    return res.status(500).json({ message: "Lỗi server nội bộ" });
  }
});

module.exports = router;