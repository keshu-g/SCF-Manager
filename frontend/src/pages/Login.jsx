import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/user/userSlice";
import { ThemeSwitcher, InputField } from "../components";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(""); // State for form validation errors

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleLogin = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email.trim() || !password.trim()) {
      setFormError("Email and password are required.");
      return;
    }

    setFormError("");
    dispatch(login({ email, password }));
  };

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
            id="Email"
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

          {/* Display validation or API error */}
          {(formError || error) && (
            <p className="text-red-500 text-sm">{formError || error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base rounded-lg bg-accent-color hover:bg-dark-secondary-bg dark:bg-dark-accent-color dark:hover:bg-dark-secondary-bg text-white transition-all duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
