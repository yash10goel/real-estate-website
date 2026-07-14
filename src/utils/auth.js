export const ADMIN_EMAIL = "ankur@gmail.com";
export const ADMIN_PASSWORD = "12345admin";

export const isAuthenticated = () => {
  return localStorage.getItem("adminAuth") === "true";
};