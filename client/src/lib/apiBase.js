import axios from "axios";

export const AUTH_TOKEN_KEY = "ug_access_token";

export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8800/api";

axios.defaults.withCredentials = true;

export const clearAccessToken = () => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
  }
};

axios.interceptors.request.use((config) => {
  if (typeof window === "undefined") return config;

  const token = window.localStorage.getItem(AUTH_TOKEN_KEY);

  if (token && !config.headers?.Authorization) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
