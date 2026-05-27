# 🔧 KHẮC PHỤC LỖI 500 INTERNAL SERVER ERROR

## 🚨 Các Lỗi Đã Phát Hiện

1. **❌ POST :5000/api/sach/giao-trinh-hoc-tap → 500 Error**
2. **❌ POST :5000/login → 500 Error**
3. **⚠️ React Router Future Flag Warnings** (v7_startTransition, v7_relativeSplatPath)

---

## ✅ NGUYÊN NHÂN & CÁC GIẢI PHÁP

### 1. **LỖI DATABASE CONNECTION**

#### Nguyên Nhân:
- `server.js` sử dụng database name sai: `qlthuvienudck` thay vì `thuvienudck`
- `server.js` có nhiều kết nối database mâu thuẫn
- Tệp `.env` không được load đúng

#### Giải Pháp:
- ✅ Cập nhật `.env` để sử dụng database name đúng: `thuvienudck`
- ✅ Tạo file `config/db.js` centralized cho kết nối database
- ✅ Simplify `server.js` để chỉ sử dụng 1 kết nối database
- ✅ Thêm proper error handling & reconnection logic

---

### 2. **LỖI ROUTES KHÔNG ĐƯỢC ĐĂNG KÝ ĐÚNG**

#### Nguyên Nhân:
- `sach.js` và `loaitailieu.js` routes không được register vào main router
- Routes API cũ không được xoá

#### Giải Pháp:
- ✅ Cập nhật `server.js` để đăng ký routes:
  ```javascript
  app.use("/", routes(db));
  app.use("/api/sach", sachRoutes);
  app.use("/api/loaitailieu", loaiTaiLieuRoutes);
  ```
- ✅ Cải thiện error handling trong `sach.js` và `loaitailieu.js`

---

### 3. **REACT ROUTER WARNINGS**

#### Nguyên Nhân:
- React Router v6 deprecating cách sử dụng cũ
- Cần activate future flags để tránh warnings

#### Giải Pháp:
- ✅ Thay đổi từ `BrowserRouter` sang `createBrowserRouter`
- ✅ Thêm future flags: `v7_startTransition` và `v7_relativeSplatPath`
- ✅ Tạo `MainLayout` component để handle layout logic
- ✅ Sử dụng `RouterProvider` với proper route configuration

---

## 📝 CÁC FILE ĐÃ CẬP NHẬT

### Backend
| File | Thay Đổi |
|------|---------|
| [server.js](../server.js) | ✅ Centralized routes, fixed database connection |
| [config/db.js](../config/db.js) | ✅ Added error handling & reconnection logic |
| [routes/sach.js](../routes/sach.js) | ✅ Better error handling, added GET / endpoint |
| [routes/loaitailieu.js](../routes/loaitailieu.js) | ✅ Better error handling |
| [.env](../.env) | ✅ Fixed database name: qlthuvienudck → thuvienudck |

### Frontend
| File | Thay Đổi |
|------|---------|
| [src/App.jsx](../src/App.jsx) | ✅ Migrate to createBrowserRouter with future flags |
| [src/layouts/MainLayout.jsx](../src/layouts/MainLayout.jsx) | ✨ NEW: Handle layout logic |

---

## 🚀 TEST & VERIFY

### Step 1: Kiểm Tra Backend

```bash
cd backend
npm install
npm start
```

Kết quả mong đợi:
```
✅ MySQL Connected
✅ Server đang chạy tại port 5000
```

### Step 2: Kiểm Tra Kết Nối Database

```bash
# Verify bảng tb_loaitailieu tồn tại
SELECT * FROM tb_loaitailieu;

# Verify bảng nhan_vien tồn tại
SELECT * FROM nhan_vien;

# Verify bảng tb_sach tồn tại
SELECT * FROM tb_sach;
```

### Step 3: Test Các API Endpoints

#### Test Login (POST /login)
```bash
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{
    "ten_dang_nhap": "admin",
    "mat_khau": "password123"
  }'
```

Expected: 
```json
{
  "message": "Đăng nhập thành công",
  "user": { ... }
}
```

#### Test Sách API (GET /api/sach/giao-trinh-hoc-tap)
```bash
curl http://localhost:5000/api/sach/giao-trinh-hoc-tap
```

Expected:
```json
[
  { "id": 1, "ten_sach": "...", "loaitailieu_id": ... },
  ...
]
```

#### Test Loại Tài Liệu API (GET /api/loaitailieu)
```bash
curl http://localhost:5000/api/loaitailieu
```

### Step 4: Kiểm Tra Frontend

```bash
cd frontend/khanhtran-project
npm run dev
```

Kết quả mong đợi:
- ✅ Không có React Router warnings
- ✅ Login page load thành công
- ✅ API calls hoạt động

---

## 🐛 TROUBLESHOOTING ADVANCED

### Nếu vẫn gặp 500 Error trên /login

**Kiểm tra:**
1. Bảng `nhan_vien` tồn tại?
   ```sql
   SHOW TABLES LIKE 'nhan_vien';
   ```

2. Có dữ liệu user trong `nhan_vien`?
   ```sql
   SELECT * FROM nhan_vien LIMIT 1;
   ```

3. Mật khẩu được mã hóa không (starts with `$2a$`)?
   ```sql
   SELECT mat_khau FROM nhan_vien LIMIT 1;
   ```

4. Check backend console logs:
   ```bash
   # Terminal đang chạy backend
   # Sẽ hiển thị chi tiết lỗi SQL
   ```

### Nếu vẫn gặp 500 Error trên /api/sach/:slug

**Kiểm tra:**
1. Bảng `tb_sach` tồn tại?
   ```sql
   SHOW TABLES LIKE 'tb_sach';
   ```

2. Bảng `tb_loaitailieu` tồn tại?
   ```sql
   SHOW TABLES LIKE 'tb_loaitailieu';
   ```

3. Có data loại tài liệu với slug "giao-trinh-hoc-tap"?
   ```sql
   SELECT * FROM tb_loaitailieu 
   WHERE LOWER(REPLACE(ten_loai, ' ', '-')) = 'giao-trinh-hoc-tap';
   ```

---

## 📊 DATABASE DEPENDENCIES

```
nhan_vien
├── FOREIGN KEY: vai_tro_id → vai_tro.id
└── UNIQUE: email, ten_dang_nhap

tb_sach
├── FOREIGN KEY: loaitailieu_id → tb_loaitailieu.id
└── ...

tb_loaitailieu
├── id (PK)
├── ten_loai (string)
└── ...

vai_tro
├── id (PK)
└── ten_vai_tro (string)
```

---

## ✨ NEXT IMPROVEMENTS

1. **Add Logging**: Implement proper logging system (winston, morgan)
2. **Add Validation**: Implement input validation middleware (joi, yup)
3. **Add Authentication**: Implement JWT tokens for better security
4. **Add Caching**: Implement Redis caching for frequently accessed data
5. **Add Rate Limiting**: Prevent abuse of APIs
6. **Add API Documentation**: Swagger/OpenAPI documentation

---

## 📞 QUICK REFERENCE

| Issue | Solution |
|-------|----------|
| 500 Error on /login | Check nhan_vien table exists, has data, password hashed |
| 500 Error on /api/sach/:slug | Check tb_sach & tb_loaitailieu tables exist |
| React warnings | Already fixed with future flags in App.jsx |
| DB connection fails | Check .env file, MySQL service running |
| Routes not found | Ensure server.js properly registers routes |

