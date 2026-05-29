const express = require('express');
const router = express.Router();
const db = require('../config/db'); // !!! LƯU Ý: Thay đường dẫn này bằng file kết nối MySQL (pool hoặc connection) hiện tại của bạn
const { slugify } = require('./stringHelper'); // Gọi hàm tạo slug từ File 1

// Định nghĩa API: GET http://localhost:5000/api/nganhhoc
router.get('/api/nganhhoc', (req, res) => {
    // Câu lệnh query lấy đúng các trường trong bảng nganh_hoc của bạn
    const sql = "SELECT id, ma_nganh, ten_nganh, mo_ta FROM nganh_hoc";

    db.query(sql, (err, rows) => {
        if (err) {
            console.error("Lỗi khi kết nối database:", err);
            return res.status(500).json({ error: "Lỗi kết nối cơ sở dữ liệu" });
        }

        // Chuyển đổi dữ liệu và tự động đính kèm thêm trường slug động
        const formatData = rows.map(row => ({
            id: row.id,
            ma_nganh: row.ma_nganh,
            ten_nganh: row.ten_nganh,
            mo_ta: row.mo_ta,
            slug: slugify(row.ten_nganh) // Kết quả trả về sẽ có thêm slug: "cong-nghe-thong-tin", "ke-toan",...
        }));

        // Trả data dạng JSON về cho React nhận
        return res.status(200).json(formatData);
    });
});

module.exports = router;