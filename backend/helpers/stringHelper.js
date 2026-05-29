// Hàm chuyển đổi tiếng Việt có dấu thành slug không dấu (Ví dụ: "Kế toán" -> "ke-toan")
function slugify(text) {
    if (!text) return '';
    return text
        .toString()
        .toLowerCase()
        .normalize('NFD')                     // Tách các dấu ra khỏi chữ cái gốc
        .replace(/[\u0300-\u036f]/g, '')     // Xóa các ký tự dấu vừa tách
        .replace(/[đĐ]/g, 'd')               // Chuyển chữ đ, Đ thành d
        .replace(/[^a-z0-9\s-]/g, '')        // Xóa ký tự đặc biệt ngoài chữ, số, khoảng trắng, gạch ngang
        .trim()
        .replace(/\s+/g, '-')                // Thay thế khoảng trắng bằng dấu gạch ngang
        .replace(/-+/g, '-');                // Thay thế nhiều dấu gạch ngang liên tiếp bằng 1 dấu
}

module.exports = { slugify };