import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LogIn,
  ArrowRight,
  Mail,
} from "lucide-react";
import toast from "react-hot-toast";

import AuthLayout from "../components/layout/AuthLayout";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

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

    if (!formData.email.trim()) {
      return toast.error("Please enter your email.");
    }

    if (!formData.password.trim()) {
      return toast.error("Please enter your password.");
    }

    try {
      setLoading(true);

      const response = await login(formData);

      loginUser(response.user, response.token);

      toast.success("Welcome back!");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.35,
        }}
        className="
          w-full
          rounded-3xl
          border
          border-stone-200
          dark:border-zinc-800
          bg-white/80
          dark:bg-zinc-900/80
          backdrop-blur-xl
          shadow-2xl
          p-10
        "
      >
        {/* Header */}

        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-stone-100
              dark:bg-zinc-800
            "
          >
            <LogIn
              size={30}
              className="text-stone-700 dark:text-stone-200"
            />
          </div>

          <div>

            <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
              Welcome Back
            </h1>

            <p className="mt-1 text-stone-500 dark:text-stone-400">
              Sign in to continue using TaskFlow.
            </p>

          </div>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
        >
          <div className="relative">

            <Input
              label="Email Address"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />

            <Mail
              size={18}
              className="absolute right-4 top-[47px] text-stone-400"
            />

          </div>

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

          <div className="flex items-center justify-between text-sm">

            <button
              type="button"
              className="
                text-stone-500
                transition
                hover:text-stone-800
                dark:hover:text-stone-200
              "
            >
              Forgot Password?
            </button>

            <Link
              to="/signup"
              className="
                font-semibold
                text-stone-700
                transition
                hover:text-black
                dark:text-stone-300
                dark:hover:text-white
              "
            >
              Create Account
            </Link>

          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              "Signing In..."
            ) : (
              <>
                Sign In
                <ArrowRight size={18} />
              </>
            )}
          </Button>

        </form>

        {/* Footer */}

        <div className="mt-10 border-t border-stone-200 dark:border-zinc-800 pt-6 text-center">

          <p className="text-stone-500 dark:text-stone-400">
            New to TaskFlow?
          </p>

          <Link
            to="/signup"
            className="
              mt-4
              inline-flex
              items-center
              justify-center
              rounded-2xl
              bg-stone-100
              dark:bg-zinc-800
              px-6
              py-3
              font-semibold
              text-stone-700
              dark:text-stone-200
              transition
              hover:bg-stone-200
              dark:hover:bg-zinc-700
            "
          >
            Create an Account
          </Link>

        </div>
      </motion.div>
    </AuthLayout>
  );
}