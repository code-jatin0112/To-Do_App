import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  UserPlus,
  User,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";

import AuthLayout from "../components/layout/AuthLayout";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

import { signup } from "../services/authService";

export default function Signup() {
  const navigate = useNavigate();

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
        error.response?.data?.message ||
          "Signup failed."
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
          border-[#BCB9AC]/60
          dark:border-[#4B4540]
          bg-[#FCFBF8]/95
          dark:bg-[#2B2B2B]
          backdrop-blur-xl
          shadow-2xl
          shadow-[#2F4A61]/5
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
              bg-[#F2ECE4]
              dark:bg-[#343434]
            "
          >
            <UserPlus
              size={30}
              className="text-[#2F4A61] dark:text-[#F7F4EF]"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-[#242527] dark:text-[#F7F4EF]">
              Create Account
            </h1>

            <p className="mt-1 text-[#6F6558] dark:text-[#BCB9AC]">
              Welcome to TaskFlow. Let's get started.
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
              label="Full Name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
            />

            <User
              size={18}
              className="absolute right-4 top-[47px] text-[#A78963]"
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
              className="absolute right-4 top-[47px] text-[#A78963]"
            />
          </div>

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
          />

          {/* Password Tips */}

          <div
            className="
              rounded-2xl
              border
              border-[#BCB9AC]
              dark:border-[#4B4540]
              bg-[#F7F4EF]
              dark:bg-[#343434]
              p-5
            "
          >
            <div className="mb-3 flex items-center gap-2 font-semibold text-[#2F4A61] dark:text-[#F7F4EF]">
              <Lock size={16} />

              Password Tips
            </div>

            <ul className="space-y-2 text-sm text-[#6F6558] dark:text-[#BCB9AC]">
              <li>• Minimum 6 characters</li>

              <li>• Mix letters and numbers</li>

              <li>• Special characters are recommended</li>
            </ul>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
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
        </form>

        {/* Footer */}

        <div className="mt-10 border-t border-[#BCB9AC] dark:border-[#4B4540] pt-6 text-center">
          <p className="text-[#6F6558] dark:text-[#BCB9AC]">
            Already have an account?
          </p>

          <Link
            to="/login"
            className="
              mt-4
              inline-flex
              items-center
              justify-center
              rounded-2xl
              bg-[#F2ECE4]
              dark:bg-[#343434]
              px-6
              py-3
              font-semibold
              text-[#2F4A61]
              dark:text-[#F7F4EF]
              transition
              hover:bg-[#E7DDD2]
              dark:hover:bg-[#4B4540]
            "
          >
            Sign In
          </Link>
        </div>
      </motion.div>
    </AuthLayout>
  );
}