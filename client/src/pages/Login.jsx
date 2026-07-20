import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

import AuthLayout from "../components/layout/AuthLayout";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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

      /*
        Replace this section with your actual login API call.
        Example:

        await loginUser(formData);
      */

      await new Promise((resolve) => setTimeout(resolve, 1200));

      toast.success("Welcome back!");

      navigate("/dashboard");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="
          rounded-[32px]
          border
          border-white/10
          bg-white/10
          p-10
          backdrop-blur-3xl
          shadow-[0_25px_80px_rgba(0,0,0,.45)]
        "
      >

        <div className="mb-10">

          <div className="flex items-center gap-3">

            <div className="rounded-2xl bg-indigo-500/20 p-3">

              <LogIn
                className="text-indigo-300"
                size={24}
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold text-white">
                Welcome Back
              </h1>

              <p className="mt-1 text-slate-300">
                Sign in to continue managing your tasks.
              </p>

            </div>

          </div>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

                    <div className="space-y-5">

            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />

          </div>

          <div className="flex items-center justify-between">

            <label className="flex cursor-pointer items-center gap-3">

              <input
                type="checkbox"
                className="
                  h-4
                  w-4
                  rounded
                  border-white/20
                  bg-transparent
                  accent-indigo-500
                "
              />

              <span className="text-sm text-slate-300">
                Remember me
              </span>

            </label>

            <button
              type="button"
              className="
                text-sm
                font-medium
                text-indigo-300
                transition-colors
                hover:text-indigo-200
              "
            >
              Forgot Password?
            </button>

          </div>

          <Button
            type="submit"
            disabled={loading}
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

                    <div className="pt-2 text-center">

            <p className="text-slate-300">
              Don't have an account?{" "}

              <Link
                to="/signup"
                className="
                  font-semibold
                  text-indigo-300
                  transition-colors
                  hover:text-indigo-200
                "
              >
                Create one
              </Link>

            </p>

          </div>

        </form>

        <div className="mt-8 border-t border-white/10 pt-6">

          <div className="flex items-center justify-center gap-2">

            <Mail
              size={16}
              className="text-slate-400"
            />

            <p className="text-sm text-slate-400">
              Secure authentication powered by TaskFlow
            </p>

          </div>

        </div>

      </motion.div>

    </AuthLayout>
  );
}