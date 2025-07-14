"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

export default function RegisterDetailsPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: user?.fullName || "",
    email: user?.primaryEmailAddress?.emailAddress || "",
    phone: "",
    businessName: "",
    shopType: "",
    shopAddress: "",
    shopWorkers: "",
    shopCurrency: "",
    shopCountry: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Show spinner until Clerk user/email is loaded
  if (!isLoaded || !user || !user.primaryEmailAddress?.emailAddress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-10 h-10 text-primary" />
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post("http://localhost:8000/api/register-details", {
        ...formData,
        clerk_user_id: user?.id,
      });
      router.push("/sign-in");
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-background text-foreground p-4">
      <Card className="w-full max-w-md rounded-2xl shadow-xl border-2 border-primary/10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Complete Your Registration
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}
          <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
            <Input type="text" name="businessName" placeholder="Business Name" onChange={handleChange} value={formData.businessName} required autoFocus />
            <Input type="text" name="name" placeholder="Full Name" onChange={handleChange} value={formData.name} required />
            <Input type="email" name="email" placeholder="Email" value={formData.email} disabled required />
            <Input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} value={formData.phone} required />
            <Select name="shopType" value={formData.shopType} onValueChange={value => handleSelectChange("shopType", value)} required>
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
            <Input type="text" name="shopAddress" placeholder="Shop Address" onChange={handleChange} value={formData.shopAddress} required />
            <Select name="shopWorkers" value={formData.shopWorkers} onValueChange={value => handleSelectChange("shopWorkers", value)} required>
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
                <SelectItem value=">100">100+</SelectItem>
              </SelectContent>
            </Select>
            <Select name="shopCountry" value={formData.shopCountry} onValueChange={value => handleSelectChange("shopCountry", value)} required>
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
            <Select name="shopCurrency" value={formData.shopCurrency} onValueChange={value => handleSelectChange("shopCurrency", value)} required>
              <SelectTrigger className="w-full p-3 border rounded-lg bg-background">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD - US Dollar</SelectItem>
                <SelectItem value="GBP">GBP - British Pound</SelectItem>
                <SelectItem value="EUR">EUR - Euro</SelectItem>
                <SelectItem value="MYR">MYR - Malaysian Ringgit</SelectItem>
                <SelectItem value="IDR">Indonesian Rupiah</SelectItem>
                <SelectItem value="INR">Indian Rupee</SelectItem>
                <SelectItem value="EGP">Egyptian Pound</SelectItem>
                <SelectItem value="SAR">Saudi Riyal</SelectItem>
                <SelectItem value="TRY">Turkish Lira</SelectItem>
                <SelectItem value="LKR">Rupees</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
