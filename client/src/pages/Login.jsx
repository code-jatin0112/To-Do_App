import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

    try {
      setLoading(true);

      const response = await login(formData);

      loginUser(response.user, response.token);

      alert("Login Successful ✅");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="bg-white rounded-[32px] border border-slate-200 shadow-2xl p-12 w-full max-w-lg">

        <h2 className="text-4xl font-bold">
          Welcome Back
        </h2>

        <p className="text-slate-500 mt-3">
          Sign in to continue to{" "}
          <span className="font-semibold text-indigo-600">
            TaskFlow
          </span>
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >
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
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />

          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <p className="text-center mt-8 text-slate-500">
          Don't have an account?

          <Link
            to="/signup"
            className="ml-2 text-indigo-600 font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}