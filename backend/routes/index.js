const express = require("express");
const bcryptjs = require("bcryptjs");

const router = express.Router();

module.exports = (db) => {

  // ================= HOME =================
  router.get("/", (req, res) => {

    res.send("API NodeJS đang chạy");

  });

  // ================= REGISTER =================
  router.post("/register", (req, res) => {

    let {
      ten_dang_nhap,
      email,
      mat_khau,
      ho_ten,
      so_dien_thoai,
      vai_tro_id,
    } = req.body;

    // Trim và validate
    if (!ten_dang_nhap || !email || !mat_khau || !ho_ten || !vai_tro_id) {
      return res.status(400).json({
        message: "Thiếu thông tin bắt buộc",
      });
    }

    ten_dang_nhap = ten_dang_nhap.trim();
    email = email.trim();
    mat_khau = mat_khau.trim();
    ho_ten = ho_ten.trim();
    so_dien_thoai = so_dien_thoai ? so_dien_thoai.trim() : null;

    // Hash password
    const hashedPassword = bcryptjs.hashSync(mat_khau, 10);

    const sql = `
      INSERT INTO nhan_vien
      (
        ho_ten,
        email,
        so_dien_thoai,
        ten_dang_nhap,
        mat_khau,
        vai_tro_id
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [ho_ten, email, so_dien_thoai, ten_dang_nhap, hashedPassword, vai_tro_id],
      (err, result) => {

        if (err) {

          console.log(err);

          // Kiểm tra lỗi trùng lặp
          if (err.code === "ER_DUP_ENTRY") {
            if (err.message.includes("email")) {
              return res.status(409).json({
                message: "Email đã được sử dụng",
              });
            }
            if (err.message.includes("ten_dang_nhap")) {
              return res.status(409).json({
                message: "Tên đăng nhập đã được sử dụng",
              });
            }
          }

          return res.status(500).json({
            message: "Lỗi đăng ký",
            error: err.message,
          });

        }

        return res.status(201).json({
          message: "Đăng ký thành công",
          userId: result.insertId,
        });

      }

    );

  });

  // ================= LOGIN =================
  router.post("/login", (req, res) => {

    console.log('POST /login body ->', req.body);

    let {
      ten_dang_nhap,
      mat_khau,
    } = req.body || {};

    if (!ten_dang_nhap || !mat_khau) {
      return res.status(400).json({ message: "Thiếu tên đăng nhập hoặc mật khẩu" });
    }

    ten_dang_nhap = String(ten_dang_nhap).trim();
    mat_khau = String(mat_khau).trim();

    const sql = `
      SELECT id, ho_ten, email, so_dien_thoai, ten_dang_nhap, vai_tro_id, anh_dai_dien, trang_thai, mat_khau
      FROM nhan_vien
      WHERE ten_dang_nhap = ?
    `;

    db.query(
      sql,
      [ten_dang_nhap],
      (err, result) => {

        if (err) {

          console.log(err);

          return res.status(500).json({
            message: "Lỗi server",
          });

        }

        if (result.length === 0) {
          return res.status(401).json({
            message: "Sai tài khoản hoặc mật khẩu",
          });
        }

        const user = result[0];

        // Kiểm tra trạng thái
        if (user.trang_thai !== "Hoạt động") {
          return res.status(403).json({
            message: "Tài khoản đã bị vô hiệu hóa",
          });
        }

        // So sánh mật khẩu
       const isPasswordValid = (mat_khau === user.mat_khau);

        if (!isPasswordValid) {
          return res.status(401).json({
            message: "Sai tài khoản hoặc mật khẩu",
          });
        }

        // Không trả về mật khẩu
        delete user.mat_khau;

        return res.status(200).json({
          message: "Đăng nhập thành công",
          user: user,
        });

      }

    );

  });

  // ================= API LOAITAILIEU =================
  router.get("/api/loai_tai_lieu", (req, res) => {

    const sql = `
    
      SELECT *
      
      FROM loai_tai_lieu
    
    `;

    db.query(sql, (err, result) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          message: "Lỗi server",
        });

      }

      return res.json(result);

    });

  });

  return router;

};

router.get("/nganh/:slug", async (req, res) => {

  const { slug } = req.params;

  try {

    const [rows] = await db.query(`
      SELECT tl.*
      FROM tai_lieu tl
      JOIN nganh_hoc nh
      ON tl.nganh_hoc_id = nh.id
      WHERE nh.slug = ?
    `, [slug]);

    res.json(rows);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Lỗi server"
    });

  }

});