import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn } from "lucide-react";
import toast from "react-hot-toast";

import AuthLayout from "../components/layout/AuthLayout";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await login(formData);

      loginUser(response.user, response.token);

      toast.success("Welcome back!");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-lg rounded-[36px] bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl p-10"
      >
        <div className="mb-8">

          <div className="flex items-center gap-3 mb-5">
            <div className="h-14 w-14 rounded-2xl bg-indigo-100 flex items-center justify-center">
              <LogIn className="text-indigo-600" size={28} />
            </div>

            <div>
              <h2 className="text-4xl font-bold text-slate-800">
                Welcome Back
              </h2>

              <p className="text-slate-500 mt-1">
                Sign in to continue using
                <span className="font-semibold text-indigo-600">
                  {" "}TaskFlow
                </span>
              </p>
            </div>
          </div>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <Input
            label="Email Address"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
          />

          <div className="relative">

            <Input
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-[46px] text-slate-500 hover:text-indigo-600"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <div className="flex justify-between items-center mt-6 text-sm">

          <button
            type="button"
            className="text-slate-500 hover:text-indigo-600 transition"
          >
            Forgot Password?
          </button>

          <Link
            to="/signup"
            className="font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Create Account
          </Link>

        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 text-center">

          <p className="text-slate-500">
            New to TaskFlow?
          </p>

          <Link
            to="/signup"
            className="inline-block mt-3 rounded-xl bg-indigo-50 px-5 py-3 text-indigo-600 font-semibold hover:bg-indigo-100 transition"
          >
            Sign Up
          </Link>

        </div>
      </motion.div>
    </AuthLayout>
  );
}