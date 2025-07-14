"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Lock, Mail, Phone, Store, MapPin, ArrowRight, ArrowLeft, Building2, Users } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function AuthPage() {
  const [isRegistering, setIsRegistering] = useState(true);
  const [registerStep, setRegisterStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    shopType: "",
    shopAddress: "",
    shopWorkers: "",
    shopCurrency: "",
    shopCountry: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirmation: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const toggleMode = () => {
    setError("");
    setIsRegistering((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post("http://localhost:8000/api/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.passwordConfirmation,
        phone: formData.phone,
        business_name: formData.businessName,
        shop_type: formData.shopType,
        shop_address: formData.shopAddress,
        shop_workers: formData.shopWorkers,
        shop_currency: formData.shopCurrency,
        shop_country: formData.shopCountry,
      });
      toast({
        title: "Registration Successful!",
        description: "Please login to continue.",
        variant: "default",
      });
      setFormData({
        businessName: "",
        shopType: "",
        shopAddress: "",
        shopWorkers: "",
        shopCurrency: "",
        shopCountry: "",
        name: "",
        email: "",
        phone: "",
        password: "",
        passwordConfirmation: "",
      });
      setTimeout(() => {
        setIsRegistering(false);
      }, 1500);
    } catch (err) {
      const errorObj = err as { response?: { data?: { message?: string; errors?: Record<string, string[]> } } };
      const errorMsg =
        errorObj.response?.data?.message ||
        (errorObj.response?.data?.errors
          ? String(Array.isArray(Object.values(errorObj.response.data.errors)[0])
              ? Object.values(errorObj.response.data.errors)[0][0]
              : Object.values(errorObj.response.data.errors)[0])
          : "Registration failed");
      setError(errorMsg);
      toast({
        title: "Registration Failed",
        description: errorMsg,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email: formData.email,
        password: formData.password,
        remember_me: rememberMe,
      });
      // Store token in cookies for dashboard auth
      if (response.data.token) {
        Cookies.set("token", response.data.token);
      }
      toast({
        title: "Login Successful!",
        description: "Welcome back! Redirecting to dashboard...",
        variant: "default",
      });
      router.push("/dashboard");
    } catch (err) {
      const errorObj = err as { response?: { data?: { message?: string; errors?: Record<string, string[]> } } };
      const errorMsg =
        errorObj.response?.data?.message ||
        (errorObj.response?.data?.errors
          ? String(Array.isArray(Object.values(errorObj.response.data.errors)[0])
              ? Object.values(errorObj.response.data.errors)[0][0]
              : Object.values(errorObj.response.data.errors)[0])
          : "Login failed");
      setError(errorMsg);
      toast({
        title: "Login Failed",
        description: errorMsg,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-background text-foreground p-4">
      <Card className="w-full max-w-md rounded-2xl shadow-xl border-2 border-primary/10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {isRegistering ? "Create Your Nexa Account" : "Login to Nexa"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}
          {isRegistering ? (
            <form className="space-y-4" onSubmit={handleRegister}>
              {registerStep === 1 && (
                <>
                  <div className="relative">
                    <Store className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={18} />
                    <Input
                      type="text"
                      name="businessName"
                      placeholder="Shop Name"
                      className="pl-10"
                      onChange={handleChange}
                      value={formData.businessName}
                      required
                    />
                  </div>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-primary z-10" size={18} />
                    <div className="pl-10">
                      <Select
                        name="shopType"
                        value={formData.shopType}
                        onValueChange={(value) => handleChange({
                          target: { name: "shopType", value }
                        } as React.ChangeEvent<HTMLInputElement>)}
                        required
                      >
                        <SelectTrigger className="w-full p-3 border rounded-lg bg-background">
                          <SelectValue placeholder="Select Shop Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="restaurant">Restaurant</SelectItem>
                          <SelectItem value="service">Service</SelectItem>
                          <SelectItem value="wholesale">Wholesale</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-primary z-10" size={18} />
                    <div className="pl-10">
                      <Select
                        name="shopWorkers"
                        value={formData.shopWorkers}
                        onValueChange={(value) => handleChange({
                          target: { name: "shopWorkers", value }
                        } as React.ChangeEvent<HTMLInputElement>)}
                        required
                      >
                        <SelectTrigger className="w-full p-3 border rounded-lg bg-background">
                          <SelectValue placeholder="Number of Workers" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5</SelectItem>
                          <SelectItem value="6-10">6-10</SelectItem>
                          <SelectItem value="11-20">11-20</SelectItem>
                          <SelectItem value="21-50">21-50</SelectItem>
                          <SelectItem value="51-100">51-100</SelectItem>
                          <SelectItem value=">100">100+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-primary z-10" size={18} />
                    <div className="pl-10">
                      <Select
                        name="shopCountry"
                        value={formData.shopCountry}
                        onValueChange={(value) => handleChange({
                          target: { name: "shopCountry", value }
                        } as React.ChangeEvent<HTMLInputElement>)}
                        required
                      >
                        <SelectTrigger className="w-full p-3 border rounded-lg bg-background">
                          <SelectValue placeholder="Country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="US">United States</SelectItem>
                          <SelectItem value="GB">United Kingdom</SelectItem>
                          <SelectItem value="CA">Canada</SelectItem>
                          <SelectItem value="AU">Australia</SelectItem>
                          <SelectItem value="IN">India</SelectItem>
                          <SelectItem value="MY">Malaysia</SelectItem>
                          <SelectItem value="ID">Indonesia</SelectItem>
                          <SelectItem value="EG">Egypt</SelectItem>
                          <SelectItem value="SA">Saudi Arabia</SelectItem>
                          <SelectItem value="SL">Sri Lanka</SelectItem>
                          <SelectItem value="QA">Qatar</SelectItem>
                          <SelectItem value="TR">Turkey</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="relative">
                    <Store className="absolute left-3 top-1/2 -translate-y-1/2 text-primary z-10" size={18} />
                    <div className="pl-10">
                      <Select
                        name="shopCurrency"
                        value={formData.shopCurrency}
                        onValueChange={(value) => handleChange({
                          target: { name: "shopCurrency", value }
                        } as React.ChangeEvent<HTMLInputElement>)}
                        required
                      >
                        <SelectTrigger className="w-full p-3 border rounded-lg bg-background">
                          <SelectValue placeholder="Currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD - US Dollar</SelectItem>
                          <SelectItem value="GBP">GBP - British Pound</SelectItem>
                          <SelectItem value="EUR">EUR - Euro</SelectItem>
                          <SelectItem value="MYR">MYR - Malaysian Ringgit</SelectItem>
                          <SelectItem value="IDR">IDR - Indonesian Rupiah</SelectItem>
                          <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                          <SelectItem value="EGP">EGP - Egyptian Pound</SelectItem>
                          <SelectItem value="SAR">SAR - Saudi Riyal</SelectItem>
                          <SelectItem value="TRY">TRY - Turkish Lira</SelectItem>
                          <SelectItem value="LKR">LKR - Rupees</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button
                    type="button"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => setRegisterStep(2)}
                  >
                    Next: Personal Details <ArrowRight size={18} />
                  </Button>
                </>
              )}
              {registerStep === 2 && (
                <>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={18} />
                    <Input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      className="pl-10"
                      onChange={handleChange}
                      value={formData.name}
                      required
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={18} />
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      className="pl-10"
                      onChange={handleChange}
                      value={formData.email}
                      required
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={18} />
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      className="pl-10"
                      onChange={handleChange}
                      value={formData.phone}
                      required
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={18} />
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="pl-10"
                      onChange={handleChange}
                      value={formData.password}
                      required
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={18} />
                    <Input
                      type="password"
                      name="passwordConfirmation"
                      placeholder="Confirm Password"
                      className="pl-10"
                      onChange={handleChange}
                      value={formData.passwordConfirmation}
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      className="flex-1 flex items-center justify-center gap-2"
                      onClick={() => setRegisterStep(1)}
                    >
                      <ArrowLeft size={18} /> Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2"
                      disabled={loading}
                    >
                      {loading ? "Registering..." : "Register"}
                    </Button>
                  </div>
                </>
              )}
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={18} />
                <Input
                  type="email"
                  name="email"
                  placeholder="Username or Email"
                  className="pl-10"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={18} />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="pl-10"
                  onChange={handleChange}
                  value={formData.password}
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="rememberMe" className="text-sm">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="text-primary text-sm underline"
                  onClick={() => router.push("/auth/forgot-password")}
                >
                  Forgot Password?
                </button>
              </div>
              <Button
                type="submit"
                className="w-full flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          )}
          <p className="text-sm mt-4 text-center">
            {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
            <button onClick={toggleMode} className="text-primary underline">
              {isRegistering ? "Login here" : "Register here"}
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
