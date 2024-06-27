import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const setToken = (token) => {
  localStorage.setItem("authToken", token);
};

export const fetchToken = () => {
  return localStorage.getItem("authToken");
};

export const fetchUserRole = () => {
  const token = fetchToken();
  if (token) {
    const decoded = jwtDecode(token);
    return decoded.role;
  }
  return null;
};

export const validateToken = async () => {
  const token = fetchToken();
  if (!token) {
    return false;
  }

  try {
    const response = await axios.get("http://localhost:8000/validate-token", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Token validation failed", error);
  }

  return false;
};

export const getUserData = async () => {
  const token = fetchToken();
  if (!token) {
    return false;
  }

  try {
    const response = await axios.get("http://localhost:8000/get-user-data", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Can't get user data", error);
  }

  return false;
};
