const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export async function authFetch(path, options = {}) {
  const authUser = JSON.parse(localStorage.getItem("authUser") || "null");
  const headers = new Headers(options.headers || {});
  if (authUser?.access_token) {
    headers.set("Authorization", `Bearer ${authUser.access_token}`);
  }
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    cache: options.cache || "no-store",
  });
  if (response.status === 401 && authUser?.access_token) {
    localStorage.removeItem("authUser");
    if (window.location.pathname.startsWith("/admin") || window.location.pathname.startsWith("/dashboard")) {
      window.location.href = "/login";
    }
  }
  return response;
}

export { API_BASE_URL };
