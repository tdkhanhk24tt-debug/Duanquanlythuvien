const bcryptjs = require("bcryptjs");

// Hash password
const hashPassword = (password) => {
  return bcryptjs.hashSync(password, 10);
};

// Compare password
const comparePassword = (password, hashedPassword) => {
  return bcryptjs.compareSync(password, hashedPassword);
};

// Generate token (optional - if you want to use JWT)
const generateToken = (user) => {
  // You can implement JWT here in the future
  return {
    userId: user.id,
    username: user.ten_dang_nhap,
    role: user.vai_tro_id,
  };
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
};
