import { useState } from "react";
import { useLoginMutation } from "../features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/components/login-form";
import { toast } from "sonner";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      const user = await login(data).unwrap();
      dispatch(setUser(user));
      navigate("/dashboard");
    } catch (err) {
      const errorMsg =
        err?.data?.message || "Something went wrong. Please try again.";
      toast.error("Login error", {
        description: errorMsg,
        duration: 1000,
      });
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          defaultValues={credentials}
        />
      </div>
    </div>
  );
};

export default Login;
