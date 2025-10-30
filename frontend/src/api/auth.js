// frontend/src/api/auth.js
import axios from "./api";

export const loginUser = async (credentials) => {
  const response = await axios.post("/login", credentials);
  return response.data; // ✅ returns { access_token, token_type }
};
