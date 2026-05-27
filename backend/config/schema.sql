-- =========================
-- BẢNG NGÀNH HỌC
-- =========================
CREATE TABLE IF NOT EXISTS nganh_hoc (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_nganh VARCHAR(255) NOT NULL UNIQUE,
    mo_ta TEXT
);

-- =========================
-- BẢNG LOẠI TÀI LIỆU
-- =========================
CREATE TABLE IF NOT EXISTS loai_tai_lieu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_loai VARCHAR(255) NOT NULL UNIQUE,
    mo_ta TEXT
);

-- =========================
-- BẢNG NHÀ XUẤT BẢN
-- =========================
CREATE TABLE IF NOT EXISTS nha_xuat_ban (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_nxb VARCHAR(255) NOT NULL,
    dia_chi TEXT,
    email VARCHAR(255),
    so_dien_thoai VARCHAR(20)
);

-- =========================
-- BẢNG TÁC GIẢ
-- =========================
CREATE TABLE IF NOT EXISTS tac_gia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_tac_gia VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    ghi_chu TEXT
);

-- =========================
-- BẢNG TÀI LIỆU (SAU KHI ĐÃ CÓ BẢNG NHẦN VIÊN)
-- =========================
CREATE TABLE IF NOT EXISTS tai_lieu (
    id INT AUTO_INCREMENT PRIMARY KEY,

    ma_tai_lieu VARCHAR(100) NOT NULL UNIQUE,
    ten_tai_lieu VARCHAR(500) NOT NULL,

    loai_tai_lieu_id INT NOT NULL,
    nganh_hoc_id INT,

    nha_xuat_ban_id INT,

    nam_xuat_ban YEAR,

    isbn VARCHAR(100),

    ngon_ngu VARCHAR(100),

    mo_ta TEXT,

    tu_khoa TEXT,

    so_trang INT,

    so_luong INT DEFAULT 0,

    so_luong_con INT DEFAULT 0,

    dinh_dang ENUM(
        'Tài liệu giấy',
        'Tài liệu điện tử',
        'Tài liệu số'
    ) NOT NULL,

    file_pdf VARCHAR(255),

    anh_bia VARCHAR(255),

    vi_tri_ke VARCHAR(255),

    ngay_tao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    nguoi_tao INT,

    FOREIGN KEY (loai_tai_lieu_id) REFERENCES loai_tai_lieu(id),
    FOREIGN KEY (nganh_hoc_id) REFERENCES nganh_hoc(id),
    FOREIGN KEY (nha_xuat_ban_id) REFERENCES nha_xuat_ban(id),
    FOREIGN KEY (nguoi_tao) REFERENCES nhan_vien(id)
);

-- =========================
-- BẢNG LIÊN KẾT TÀI LIỆU - TÁC GIẢ
-- =========================
CREATE TABLE IF NOT EXISTS tai_lieu_tac_gia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tai_lieu_id INT NOT NULL,
    tac_gia_id INT NOT NULL,
    thu_tu INT DEFAULT 1,
    
    FOREIGN KEY (tai_lieu_id) REFERENCES tai_lieu(id) ON DELETE CASCADE,
    FOREIGN KEY (tac_gia_id) REFERENCES tac_gia(id) ON DELETE CASCADE,
    UNIQUE KEY unique_tai_lieu_tac_gia (tai_lieu_id, tac_gia_id)
);
