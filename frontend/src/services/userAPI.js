import API from "./axiosConfig";

export const getUser = async () => {
  const response = await API.get("/users/profile");
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await API.post("/users/login", { email, password });
  return response.data;
};
