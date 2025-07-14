"use client";
import React, { useState } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await axios.post("http://localhost:8000/api/reset-password", {
        token,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      setSuccess("Password reset successful! You can now log in.");
      setTimeout(() => router.push("/auth"), 1500);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          (err.response?.data?.errors
            ? Object.values(err.response.data.errors)[0]
            : "Failed to reset password")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
      <div className="w-full max-w-md bg-card rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}
        {success && <p className="text-green-600 text-sm text-center mb-3">{success}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="password"
            name="password"
            placeholder="New Password"
            className="w-full p-3 border rounded-lg bg-background"
            onChange={e => setPassword(e.target.value)}
            value={password}
            required
          />
          <input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirm New Password"
            className="w-full p-3 border rounded-lg bg-background"
            onChange={e => setPasswordConfirmation(e.target.value)}
            value={passwordConfirmation}
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-primary text-white rounded-lg hover:opacity-90 transition"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
