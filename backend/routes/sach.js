const express = require("express");
const router = express.Router();

const db = require("../config/db");

router.get("/:slug", (req, res) => {

  const slug = req.params.slug;

  const sql = `
    SELECT tb_sach.* 
    FROM tb_sach
    JOIN tb_loaitailieu
      ON tb_sach.loaitailieu_id = tb_loaitailieu.id
    WHERE LOWER(REPLACE(tb_loaitailieu.ten_loai, ' ', '-')) = LOWER(?)
  `;

  db.query(sql, [slug], (err, result) => {

    if (err) {
      console.error("Error querying sach by slug:", err);
      return res.status(500).json({
        message: "Lỗi server",
        error: err.message,
      });
    }

    return res.json(result);

  });

});

// Get all books
router.get("/", (req, res) => {
  const sql = `SELECT * FROM tb_sach`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error querying all sach:", err);
      return res.status(500).json({
        message: "Lỗi server",
        error: err.message,
      });
    }

    return res.json(result);
  });
});

module.exports = router;