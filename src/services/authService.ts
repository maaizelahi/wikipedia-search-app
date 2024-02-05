import axios from "axios";

const API_URL = "http://localhost:3333";
const TOKEN_STORAGE_KEY = "auth_token";

// Function to set the JWT token in the Axios headers
export const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } else {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
};

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
};

export const removeToken = () => {
  delete axios.defaults.headers.common["Authorization"];
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    });
    const token = response.data.token;
    setAuthToken(token);
    return token;
  } catch (error) {
    throw error;
  }
};

export const signup = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      username,
      password,
    });
    // Login automatically once sigup happens
    const token = response.data.token;
    setAuthToken(token);
    return token;
  } catch (error) {
    throw error;
  }
};
