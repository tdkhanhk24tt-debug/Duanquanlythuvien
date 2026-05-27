-- Create vai_tro table
CREATE TABLE IF NOT EXISTS vai_tro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_vai_tro VARCHAR(100) NOT NULL UNIQUE,
    mo_ta TEXT,
    ngay_tao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create nhan_vien table
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

-- Insert default roles
INSERT IGNORE INTO vai_tro (id, ten_vai_tro, mo_ta) VALUES 
(1, 'Admin', 'Quản trị viên hệ thống'),
(2, 'Thủ thư', 'Nhân viên thư viện'),
(3, 'Độc giả', 'Khách đọc');
