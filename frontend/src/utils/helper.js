import { jwtDecode } from "jwt-decode";

export const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);

    if (!decoded || !decoded.exp) {
      return false;
    }

    if (Date.now() / 1000 > decoded.exp) {
      return false;
    }

    return true;
  } catch (error) {
    console.log("Error in isTokenValid : ",error);
    return false;
  }
};
