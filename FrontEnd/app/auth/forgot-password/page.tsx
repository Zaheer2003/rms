"use client";
import React, { useState } from "react";
import axios from "axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await axios.post("http://localhost:8000/api/forgot-password", { email });
      setSuccess("Password reset link sent! Please check your email.");
      setEmail("");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          (err.response?.data?.errors
            ? Object.values(err.response.data.errors)[0]
            : "Failed to send reset link")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
      <div className="w-full max-w-md bg-card rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}
        {success && <p className="text-green-600 text-sm text-center mb-3">{success}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            className="w-full p-3 border rounded-lg bg-background"
            onChange={e => setEmail(e.target.value)}
            value={email}
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-primary text-white rounded-lg hover:opacity-90 transition"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
