import axios from "axios";

// Example base URL for your API
const API = axios.create({
  baseURL: "http://localhost:5000/api/v1", // Replace with your backend URL
});

// The login function which will be used to send the credentials to the backend
export const login = async (credentials) => {
  const response = await API.post("//login", credentials); // Sending POST request
  return response.data; // Assuming it returns { user, token }
};

export default API;
