/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { z } from "zod";

// Zod validation schemas
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data: { password: any; confirmPassword: any; }) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// API response types
interface LoginResponse {
  token: string;
}

interface RegisterResponse {
  user: {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
  token: string;
}

interface UserResponse {
  user: {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
  };
}

function LoginPage() {
  const [isLogin, setIsLogin] = useState(false); // Default to signup mode
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Configure axios base URL
  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setNameError(""); // Clear error on input change
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError(""); // Clear error on input change
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordError(""); // Clear error on input change
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordError(""); // Clear error on input change
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6; // Example: Minimum password length of 6
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setNameError("");
  };

  const setValidationErrors = (errors: any) => {
    clearErrors();
    errors.forEach((error: any) => {
      switch (error.path[0]) {
        case "name":
          setNameError(error.message);
          break;
        case "email":
          setEmailError(error.message);
          break;
        case "password":
          setPasswordError(error.message);
          break;
        case "confirmPassword":
          setConfirmPasswordError(error.message);
          break;
      }
    });
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);

      // Validate with Zod
      const validationResult = loginSchema.safeParse({ email, password });
      if (!validationResult.success) {
        setValidationErrors(validationResult.error.errors);
        return;
      }

      const response = await api.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      const { token } = response.data;

      // Store token in localStorage
      localStorage.setItem("token", token);

      // Get user data
      const userResponse = await api.get<UserResponse>("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(userResponse.data.user));

      // Show success toast with user name
      toast.success(`Welcome back, ${userResponse.data.user.name}!`);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      setIsLoading(true);

      // Validate with Zod
      const validationResult = registerSchema.safeParse({
        name,
        email,
        password,
        confirmPassword,
      });

      if (!validationResult.success) {
        setValidationErrors(validationResult.error.errors);
        return;
      }

      const response = await api.post<RegisterResponse>("/auth/register", {
        name,
        email,
        password,
      });

      const { user, token } = response.data;

      // Store token and user data in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Show success toast with user name
      toast.success(`Welcome, ${user.name}! Account created successfully.`);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Registration error:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.data?.errors) {
        // Handle validation errors from backend
        const backendErrors = error.response.data.errors;
        Object.keys(backendErrors).forEach((field) => {
          const message = backendErrors[field][0];
          switch (field) {
            case "name":
              setNameError(message);
              break;
            case "email":
              setEmailError(message);
              break;
            case "password":
              setPasswordError(message);
              break;
          }
        });
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let isValid = true;

    // Clear previous errors
    clearErrors();

    if (!isLogin) {
      if (!name.trim()) {
        setNameError("Name is required");
        isValid = false;
      }
    }

    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      isValid = false;
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    }

    if (!isLogin && password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    if (isValid) {
      if (isLogin) {
        await handleLogin();
      } else {
        await handleRegister();
      }
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    // Clear errors when toggling mode
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setNameError("");
    // Clear form fields
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-6">{isLogin ? "Login" : "Sign Up for AgriYield"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Your Name
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${nameError ? "border-red-500" : ""}`}
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={handleNameChange}
                required={!isLogin}
                disabled={isLoading}
              />
              {nameError && <p className="text-red-500 text-xs italic">{nameError}</p>}
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${emailError ? "border-red-500" : ""}`}
              id="email"
              type="email"
              placeholder="Your Email Address"
              value={email}
              onChange={handleEmailChange}
              required
              disabled={isLoading}
            />
            {emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${passwordError ? "border-red-500" : ""}`}
              id="password"
              type="password"
              placeholder="Choose a Password (min 6 characters)"
              value={password}
              onChange={handlePasswordChange}
              required
              disabled={isLoading}
            />
            {passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>}
          </div>
          {!isLogin && (
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${confirmPasswordError ? "border-red-500" : ""}`}
                id="confirmPassword"
                type="password"
                placeholder="Confirm Your Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required={!isLogin}
                disabled={isLoading}
              />
              {confirmPasswordError && <p className="text-red-500 text-xs italic">{confirmPasswordError}</p>}
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : isLogin ? "Login" : "Create Account"}
            </button>
            <button
              className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800"
              type="button"
              onClick={toggleAuthMode}
              disabled={isLoading}
            >
              {isLogin ? "Create an Account" : "Already have an account? Login"}
            </button>
          </div>
          {!isLogin && (
            <p className="text-center text-xs mt-4">
              By creating an account, you agree to our{" "}
              <a href="#" className="text-green-500 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-green-500 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default LoginPage;


