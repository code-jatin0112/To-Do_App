import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  UserPlus,
  User,
  Mail,
  Lock,
} from "lucide-react";
import toast from "react-hot-toast";

import AuthLayout from "../components/layout/AuthLayout";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

import { signup } from "../services/authService";

export default function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
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

    if (!formData.name.trim()) {
      return toast.error("Please enter your name.");
    }

    if (!formData.email.trim()) {
      return toast.error("Please enter your email.");
    }

    if (formData.password.length < 6) {
      return toast.error(
        "Password should be at least 6 characters."
      );
    }

    try {
      setLoading(true);

      await signup(formData);

      toast.success("Account created successfully!");

      navigate("/login");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Signup Failed"
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
        transition={{ duration: 0.45 }}
        className="w-full max-w-lg rounded-[36px] bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl p-10"
      >
        {/* Header */}

        <div className="flex items-center gap-4 mb-8">
          <div className="h-14 w-14 rounded-2xl bg-indigo-100 flex items-center justify-center">
            <UserPlus
              size={28}
              className="text-indigo-600"
            />
          </div>

          <div>
            <h2 className="text-4xl font-bold text-slate-800">
              Create Account
            </h2>

            <p className="text-slate-500 mt-1">
              Join
              <span className="font-semibold text-indigo-600">
                {" "}TaskFlow
              </span>{" "}
              and start organizing smarter.
            </p>
          </div>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="relative">
            <Input
              label="Full Name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
            />

            <User
              size={18}
              className="absolute right-4 top-[46px] text-slate-400"
            />
          </div>

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
              className="absolute right-4 top-[46px] text-slate-400"
            />
          </div>

          <div className="relative">
            <Input
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
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

          <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-4 text-sm text-slate-600">
            <div className="flex items-center gap-2 font-semibold text-indigo-600 mb-2">
              <Lock size={16} />
              Password Tips
            </div>

            <ul className="list-disc list-inside space-y-1">
              <li>At least 6 characters</li>
              <li>Use letters and numbers</li>
              <li>A special character is recommended</li>
            </ul>
          </div>

          <Button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </Button>
        </form>

        {/* Footer */}

        <div className="mt-8 border-t border-slate-200 pt-6 text-center">

          <p className="text-slate-500">
            Already have an account?
          </p>

          <Link
            to="/login"
            className="inline-block mt-3 rounded-xl bg-indigo-50 px-5 py-3 text-indigo-600 font-semibold hover:bg-indigo-100 transition"
          >
            Sign In
          </Link>

        </div>
      </motion.div>
    </AuthLayout>
  );
}