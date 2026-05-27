const express = require("express");
const router = express.Router();

const db = require("../config/db");

router.get("/:slug", (req, res) => {

  const slug = req.params.slug;

  const sql = `
    SELECT tai_lieu.* 
    FROM tai_lieu
    JOIN loai_tai_lieu
      ON tai_lieu.loai_tai_lieu_id = loai_tai_lieu.id
    WHERE LOWER(REPLACE(loai_tai_lieu.ten_loai, ' ', '-')) = LOWER(?)
  `;

  db.query(sql, [slug], (err, result) => {

    if (err) {
      console.error("Error querying tai_lieu by slug:", err);
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
  const sql = `SELECT * FROM tai_lieu`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error querying all tai_lieu:", err);
      return res.status(500).json({
        message: "Lỗi server",
        error: err.message,
      });
    }

    return res.json(result);
  });
});

module.exports = router;