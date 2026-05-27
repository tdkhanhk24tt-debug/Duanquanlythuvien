export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const getRole = () => {
  return parseInt(localStorage.getItem("role")) || null;
};

export const getUserId = () => {
  return parseInt(localStorage.getItem("userId")) || null;
};

export const isAdmin = () => {
  const role = getRole();
  return role === 1;
};

export const isLibrarian = () => {
  const role = getRole();
  return role === 2;
};

export const isReader = () => {
  const role = getRole();
  return role === 3;
};

export const isLoggedIn = () => {
  return localStorage.getItem("user") !== null;
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("role");
  localStorage.removeItem("userId");
};