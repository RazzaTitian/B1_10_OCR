"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRoutes } from "../API/routes";
import axios from "axios";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    setError("");
    setSuccess("");

    if (isLogin) {
      try {
        const response = await axios.post(apiRoutes.users.login, {
          email,
          password
        });

        if (response.status === 200) {
          // Store the token in localStorage
          localStorage.setItem('token', response.data.token);
          
          // Show success message briefly
          setSuccess("Login successful!");
          
          // Redirect to scan page
          setTimeout(() => {
            router.push("/scan");
          }, 1000);
        }
      } catch (error: any) {
        if (error.response) {
          setError(error.response.data.message || "Invalid credentials");
        } else if (error.request) {
          setError("No response from server");
        } else {
          setError("An error occurred");
        }
      }
    } else {
      // Register logic
      if (!email.includes("@")) {
        setError("Please enter a valid email address");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      if (name.length < 2) {
        setError("Name must be at least 2 characters");
        return;
      }

      try {
        const response = await axios.post(apiRoutes.users.register, {
          name,
          email,
          password
        });

        if (response.status === 201 || response.status === 200) {
          // Show success message and switch to login form
          setSuccess("Account created successfully! Please login.");
          setIsLogin(true);
          // Clear the form
          setEmail("");
          setName("");
          setPassword("");
          setConfirmPassword("");
        }
      } catch (error: any) {
        if (error.response) {
          setError(error.response.data.message || "Registration failed");
        } else if (error.request) {
          setError("No response from server");
        } else {
          setError("An error occurred");
        }
      }
    }
  };

  return (
    <main className="h-screen flex items-center justify-center bg-gradient-to-r from-[#FF4267]/25 to-[#5300FF]/25">
      <form
        onSubmit={handleSubmit}
        className="bg-[#9370DB] p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-4 text-white">
          {isLogin ? "Log In" : "Register"}
        </h2>

        {!isLogin && (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full mb-3 p-2 border rounded"
            required
          />
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          required
        />
        {!isLogin && (
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full mb-3 p-2 border rounded"
            required
          />
        )}
        {error && <p className="text-red-400 mb-4">{error}</p>}
        {success && <p className="text-green-400 mb-4">{success}</p>}
        <button
          type="submit"
          className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          {isLogin ? "Sign In" : "Register"}
        </button>
        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
            setEmail("");
            setName("");
            setPassword("");
            setConfirmPassword("");
          }}
          className="w-full mt-3 py-2 bg-transparent border border-white text-white rounded hover:bg-white/10 transition"
        >
          {isLogin
            ? "Need an account? Register"
            : "Already have an account? Login"}
        </button>
      </form>
    </main>
  );
}