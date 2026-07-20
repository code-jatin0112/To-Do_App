import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  UserPlus,
  ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";

import AuthLayout from "../components/layout/AuthLayout";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

export default function Signup() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      /*
        Replace this block with your real signup API.

        Example:

        await registerUser(formData);
      */

      await new Promise((resolve) =>
        setTimeout(resolve, 1200)
      );

      toast.success("Account created successfully!");

      navigate("/login");
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Registration failed"
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

              <UserPlus
                size={24}
                className="text-indigo-300"
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold text-white">
                Create Account
              </h1>

              <p className="mt-1 text-slate-300">
                Join TaskFlow and start organizing your work.
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
              label="Full Name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />

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
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />

          </div>

          <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-4">

            <p className="text-sm leading-6 text-indigo-100">
              By creating an account, you agree to our Terms of
              Service and Privacy Policy. Your data is securely
              protected and encrypted.
            </p>

          </div>

          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? (
              "Creating Account..."
            ) : (
              <>
                Create Account
                <ArrowRight size={18} />
              </>
            )}
          </Button>

                    <div className="pt-2 text-center">

            <p className="text-slate-300">
              Already have an account?{" "}

              <Link
                to="/login"
                className="
                  font-semibold
                  text-indigo-300
                  transition-colors
                  hover:text-indigo-200
                "
              >
                Sign In
              </Link>

            </p>

          </div>

        </form>

        <div className="mt-8 border-t border-white/10 pt-6">

          <div className="flex items-center justify-center gap-2">

            <User
              size={16}
              className="text-slate-400"
            />

            <p className="text-center text-sm text-slate-400">
              Start your productivity journey with TaskFlow today.
            </p>

          </div>

        </div>

      </motion.div>

    </AuthLayout>
  );
}