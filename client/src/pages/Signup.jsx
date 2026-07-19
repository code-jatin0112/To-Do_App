import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

    try {
      setLoading(true);

      await signup(formData);

      alert("Account created successfully! 🎉");

      navigate("/login");
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="bg-white rounded-[32px] border border-slate-200 shadow-2xl p-12 w-full max-w-lg">
        <h2 className="text-4xl font-bold">Create Account</h2>

        <p className="text-slate-500 mt-3">
          Join{" "}
          <span className="font-semibold text-indigo-600">
            TaskFlow
          </span>{" "}
          and start organizing your work.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >
          <Input
            label="Full Name"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
          />

          <Input
            label="Email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
          />

          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <p className="text-center mt-8 text-slate-500">
          Already have an account?
          <Link
            to="/login"
            className="ml-2 text-indigo-600 font-semibold"
          >
            Sign In
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}