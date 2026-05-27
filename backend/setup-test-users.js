/**
 * Script để tạo tài khoản test với mật khẩu được mã hóa
 * Chạy: node setup-test-users.js
 */

require("dotenv").config();
const bcryptjs = require("bcryptjs");
const db = require("./config/db");

// Test users data
const testUsers = [
  {
    ho_ten: "Admin Hệ Thống",
    email: "admin@thuvien.edu.vn",
    so_dien_thoai: "0123456789",
    ten_dang_nhap: "admin",
    mat_khau: "123456",
    vai_tro_id: 1,
  },
  {
    ho_ten: "Thủ Thư Test",
    email: "thuthu@thuvien.edu.vn",
    so_dien_thoai: "0987654321",
    ten_dang_nhap: "thuthu",
    mat_khau: "123456",
    vai_tro_id: 2,
  },
  {
    ho_ten: "Độc Giả Test",
    email: "docgia@thuvien.edu.vn",
    so_dien_thoai: "0912345678",
    ten_dang_nhap: "docgia",
    mat_khau: "123456",
    vai_tro_id: 3,
  },
];

console.log("🚀 Bắt đầu tạo tài khoản test...\n");

// Tạo vai trò trước
const roles = [
  { id: 1, ten_vai_tro: "Admin", mo_ta: "Quản trị viên hệ thống" },
  { id: 2, ten_vai_tro: "Thủ thư", mo_ta: "Nhân viên thư viện" },
  { id: 3, ten_vai_tro: "Độc giả", mo_ta: "Khách đọc" },
];

let rolesCreated = 0;

roles.forEach((role) => {
  const sqlRole = `INSERT IGNORE INTO vai_tro (id, ten_vai_tro, mo_ta) VALUES (?, ?, ?)`;
  db.query(sqlRole, [role.id, role.ten_vai_tro, role.mo_ta], (err) => {
    if (err) {
      console.log(`❌ Lỗi tạo vai trò ${role.ten_vai_tro}:`, err.message);
      return;
    }
    rolesCreated++;
    console.log(`✅ Vai trò "${role.ten_vai_tro}" OK`);

    if (rolesCreated === roles.length) {
      createUsers();
    }
  });
});

function createUsers() {
  console.log("\n📝 Tạo tài khoản test...\n");

  testUsers.forEach((user) => {
    // Hash mật khẩu
    const hashedPassword = bcryptjs.hashSync(user.mat_khau, 10);

    const sql = `
      INSERT INTO nhan_vien
      (ho_ten, email, so_dien_thoai, ten_dang_nhap, mat_khau, vai_tro_id, trang_thai)
      VALUES (?, ?, ?, ?, ?, ?, 'Hoạt động')
    `;

    db.query(
      sql,
      [
        user.ho_ten,
        user.email,
        user.so_dien_thoai,
        user.ten_dang_nhap,
        hashedPassword,
        user.vai_tro_id,
      ],
      (err) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            console.log(`⚠️  ${user.ten_dang_nhap} - Tài khoản đã tồn tại`);
          } else {
            console.log(`❌ Lỗi tạo ${user.ten_dang_nhap}:`, err.message);
          }
          return;
        }
        console.log(`✅ Tạo tài khoản: ${user.ten_dang_nhap} (mật khẩu: 123456)`);
      }
    );
  });

  setTimeout(() => {
    console.log("\n✨ Hoàn thành! Đóng kết nối...\n");
    process.exit(0);
  }, 2000);
}
