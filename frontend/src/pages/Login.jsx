import React, { useState, useEffect } from "react";
import { useLoginUserMutation } from "../redux/api/userApiSlice";
import { ThemeSwitcher, InputField } from "../components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "../utils/helper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isTokenValid(token)) {
      navigate("/");
    }
  }, [navigate]);

  const [loginUser, { isLoading, isSuccess, isError, data, error }] =
    useLoginUserMutation();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setFormError("Email and password are required.");
      return;
    }

    setFormError("");

    loginUser({ email, password });
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Login failed. Please try again.");
    }
    if (isSuccess) {
      toast.success(data?.message || "Login success, redirecting...");
      localStorage.setItem("token", data?.data?.token || "");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  }, [isError, isSuccess, error, navigate]);

  return (
    <div className="h-dvh flex justify-center items-center bg-primary-bg dark:bg-dark-primary-bg transition-all duration-300 px-6 sm:px-8">
      <div className="absolute top-4 right-4">
        <ThemeSwitcher />
      </div>

      <div className="w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-lg bg-primary-bg dark:bg-dark-primary-bg transition-all duration-300 border shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold mb-5 text-primary-text dark:text-dark-primary-text text-center">
          Welcome to SCF Manager
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <InputField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            isPassword={true}
          />

          {formError && (
            <p className="text-red-500 text-sm text-center">{formError}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base rounded-lg bg-accent-color hover:bg-dark-secondary-bg dark:bg-dark-accent-color dark:hover:bg-dark-secondary-bg text-white transition-all duration-300"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
