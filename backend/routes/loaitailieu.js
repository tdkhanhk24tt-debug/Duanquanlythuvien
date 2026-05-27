const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req, res) => {

  const sql = `SELECT * FROM loai_tai_lieu`;

  db.query(sql, (err, result) => {

    if (err) {
      console.error("Error querying loai_tai_lieu:", err);
      return res.status(500).json({
        message: "Lỗi server",
        error: err.message,
      });
    }

    return res.json(result);

  });

});

module.exports = router;