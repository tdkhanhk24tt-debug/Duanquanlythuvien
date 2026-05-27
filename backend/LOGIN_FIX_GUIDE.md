# 🔐 LỖI ĐĂNG NHẬP - HƯỚNG DẪN SỬA CHỮA VÀ SETUP

## 📋 Các Vấn Đề Đã Được Phát Hiện Và Sửa Chữa

### ❌ Vấn Đề Ban Đầu:
1. **Mật khẩu không được mã hóa** - Lưu trữ dưới dạng plain text (rất nguy hiểm)
2. **Không so sánh mật khẩu an toàn** - So sánh plain text thay vì hash
3. **Thiếu xác nhận trạng thái tài khoản** - Không kiểm tra tài khoản có hoạt động không
4. **Trả về mật khẩu trong response** - Lộ thông tin nhạy cảm
5. **Xử lý lỗi không đầy đủ** - Không xử lý lỗi trùng lặp email/tên đăng nhập
6. **Cấu trúc bảng dữ liệu không rõ ràng** - Sử dụng bảng `tb_taikhoan` thay vì `nhan_vien`

### ✅ Các Sửa Chữa:
1. **Mã hóa mật khẩu** - Sử dụng bcryptjs với salt 10
2. **So sánh mật khẩu an toàn** - Dùng `bcryptjs.compareSync()`
3. **Kiểm tra trạng thái tài khoản** - Chỉ cho phép đăng nhập tài khoản "Hoạt động"
4. **Không trả về mật khẩu** - Xóa `mat_khau` trước khi response
5. **Xử lý lỗi chi tiết** - Phân biệt email/tên đăng nhập đã tồn tại
6. **Bảng dữ liệu mới** - Sử dụng `nhan_vien` với cấu trúc rõ ràng

---

## 🚀 SETUP HƯỚNG DẪN

### 1️⃣ Cập Nhật Dependencies

```bash
cd backend
npm install
```

Nếu chưa cài `dotenv`:
```bash
npm install dotenv
```

### 2️⃣ Tạo Bảng Dữ Liệu

#### Cách 1: Chạy SQL Script trong MySQL Workbench
1. Mở MySQL Workbench
2. Kết nối tới database `thuvienudck`
3. Chạy script từ file: `backend/config/database.sql`

#### Cách 2: Chạy qua Command Line
```bash
mysql -u root -p123456 thuvienudck < backend/config/database.sql
```

#### Cách 3: Chạy SQL Queries Thủ Công
```sql
-- Tạo bảng vai_tro
CREATE TABLE IF NOT EXISTS vai_tro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_vai_tro VARCHAR(100) NOT NULL UNIQUE,
    mo_ta TEXT,
    ngay_tao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng nhan_vien
CREATE TABLE IF NOT EXISTS nhan_vien (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ho_ten VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    so_dien_thoai VARCHAR(20),
    ten_dang_nhap VARCHAR(100) NOT NULL UNIQUE,
    mat_khau VARCHAR(255) NOT NULL,
    vai_tro_id INT NOT NULL,
    anh_dai_dien VARCHAR(255),
    trang_thai ENUM('Hoạt động', 'Ngưng hoạt động') DEFAULT 'Hoạt động',
    ngay_tao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (vai_tro_id) REFERENCES vai_tro(id) ON DELETE RESTRICT
);

-- Thêm vai trò mặc định
INSERT IGNORE INTO vai_tro (id, ten_vai_tro, mo_ta) VALUES 
(1, 'Admin', 'Quản trị viên hệ thống'),
(2, 'Thủ thư', 'Nhân viên thư viện'),
(3, 'Độc giả', 'Khách đọc');
```

### 3️⃣ Kiểm Tra Cấu Hình .env

File: `backend/.env`
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_NAME=thuvienudck
```

### 4️⃣ Khởi Động Backend

```bash
cd backend
npm start
```

Kết quả mong đợi:
```
✅ MySQL Connected
Server đang chạy tại port 5000
```

---

## 📝 HƯỚNG DẪN ĐĂNG KÝ & ĐĂNG NHẬP

### Đăng Ký (POST /register)

**Request:**
```json
{
  "ho_ten": "Nguyễn Văn A",
  "email": "nguyenvana@example.com",
  "so_dien_thoai": "0987654321",
  "ten_dang_nhap": "nguyenvana",
  "mat_khau": "password123",
  "vai_tro_id": 3
}
```

**vai_tro_id:**
- `1` = Admin
- `2` = Thủ thư
- `3` = Độc giả

**Response (Thành Công):**
```json
{
  "message": "Đăng ký thành công",
  "userId": 1
}
```

**Response (Lỗi):**
```json
{
  "message": "Email đã được sử dụng"
}
```

### Đăng Nhập (POST /login)

**Request:**
```json
{
  "ten_dang_nhap": "nguyenvana",
  "mat_khau": "password123"
}
```

**Response (Thành Công):**
```json
{
  "message": "Đăng nhập thành công",
  "user": {
    "id": 1,
    "ho_ten": "Nguyễn Văn A",
    "email": "nguyenvana@example.com",
    "so_dien_thoai": "0987654321",
    "ten_dang_nhap": "nguyenvana",
    "vai_tro_id": 3,
    "anh_dai_dien": null,
    "trang_thai": "Hoạt động"
  }
}
```

**Response (Lỗi):**
```json
{
  "message": "Sai tài khoản hoặc mật khẩu"
}
```

---

## 🧪 KIỂM TRA (Testing)

### Kiểm Tra với Postman hoặc Insomnia:

1. **Đăng ký người dùng:**
   - Method: POST
   - URL: `http://localhost:5000/register`
   - Body: (xem phần "Đăng Ký" phía trên)

2. **Đăng nhập:**
   - Method: POST
   - URL: `http://localhost:5000/login`
   - Body: (xem phần "Đăng Nhập" phía trên)

---

## 🔒 HỆ THỐNG VAI TRÒ (Roles)

| ID | Tên | Mô Tả |
|----|-----|-------|
| 1 | Admin | Quản trị viên hệ thống |
| 2 | Thủ thư | Nhân viên thư viện |
| 3 | Độc giả | Khách đọc |

### Kiểm Tra Quyền Hạn (Frontend):

```javascript
import { isAdmin, isLibrarian, isReader, isLoggedIn } from "../utils/auth";

if (isAdmin()) {
  // Chỉ Admin
}

if (isLibrarian()) {
  // Chỉ Thủ thư
}

if (isReader()) {
  // Chỉ Độc giả
}

if (!isLoggedIn()) {
  // Chưa đăng nhập
}
```

---

## 📁 CẤU TRÚC FILE ĐÃ CẬP NHẬT

```
backend/
├── config/
│   ├── db.js                 ✅ Cập nhật: đọc từ .env
│   └── database.sql          ✨ MỚI: SQL setup script
├── routes/
│   └── index.js              ✅ Cập nhật: mã hóa & so sánh mật khẩu
├── utils/
│   └── auth.js               ✨ MỚI: hàm mã hóa mật khẩu
├── .env                       ✅ Cập nhật: thêm dotenv
├── package.json              ✅ Cập nhật: thêm dotenv
└── app.js                     (không thay đổi)

frontend/
└── src/
    ├── pages/
    │   └── login.jsx         ✅ Cập nhật: lưu vai_tro_id
    ├── utils/
    │   └── auth.js           ✅ Cập nhật: thêm hàm kiểm tra vai trò
    └── routes/
        └── PrivateRoute.jsx  (sử dụng được ngay)
```

---

## 🛡️ KIẾN THỨC BẢO MẬT

### 1. Mã Hóa Mật Khẩu (Hashing)
- Sử dụng bcryptjs thay vì lưu plain text
- Salt rounds: 10 (càng cao càng an toàn nhưng chậm hơn)

### 2. So Sánh Mật Khẩu
```javascript
// ❌ KHÔNG LÀM (so sánh plain text)
if (mat_khau === user.mat_khau) { }

// ✅ LÀM (so sánh hash)
if (bcryptjs.compareSync(mat_khau, user.mat_khau)) { }
```

### 3. Không Trả Về Mật Khẩu
```javascript
// ❌ KHÔNG LÀM
return res.json({ user }); // lộ mật khẩu

// ✅ LÀM
delete user.mat_khau;
return res.json({ user });
```

---

## 🐛 KHẮC PHỤC LỖI THƯỜNG GẶP

### Lỗi: "MySQL Connection Error"
- Kiểm tra MySQL Service đang chạy
- Kiểm tra username/password trong .env
- Kiểm tra database name

### Lỗi: "Email đã được sử dụng"
- Email này đã được đăng ký rồi
- Dùng email khác

### Lỗi: "Sai tài khoản hoặc mật khẩu"
- Kiểm tra tên đăng nhập
- Kiểm tra mật khẩu (phân biệt hoa/thường)
- Kiểm tra tài khoản có "Hoạt động" không

### Lỗi: Không thể đăng nhập sau khi đăng ký
- Kiểm tra bảng `nhan_vien` có dữ liệu không
- Kiểm tra mật khẩu được mã hóa không (`bcrypt$...`)

---

## 📞 GHI CHÚ

- Mật khẩu được mã hóa với bcryptjs, không thể giải mã
- Nếu quên mật khẩu, phải reset (cập nhật mật khẩu mới được mã hóa)
- Không nên lưu mật khẩu plain text ở bất kỳ đâu
- Luôn validate input từ client
- Sử dụng HTTPS khi deploy (bảo vệ trong transit)

---

## ✨ NEXT STEPS

1. ✅ Setup database (đã hướng dẫn)
2. ✅ Cấu hình .env (đã setup)
3. ✅ Backend code (đã sửa chữa)
4. ✅ Frontend code (đã cập nhật)
5. 🔄 Tiếp theo: Thêm JWT tokens cho authentication an toàn hơn
6. 🔄 Tiếp theo: Thêm password reset functionality
7. 🔄 Tiếp theo: Thêm 2FA (Two-Factor Authentication)

