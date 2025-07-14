"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EditBrand() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brandLogo, setBrandLogo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const token = Cookies.get("token");
        const res = await axios.get(`http://localhost:8000/api/brands/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setName(res.data.name);
        setDescription(res.data.description || "");
      } catch {
        setError("Failed to load brand.");
      }
    };
    fetchBrand();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const token = Cookies.get("token");
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      if (brandLogo) formData.append("brandLogo", brandLogo);
      await axios.post(`http://localhost:8000/api/brands/${id}?_method=PUT`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      router.push("../../brand");
    } catch {
      setError("Failed to update brand.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Edit Brand</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input required placeholder="Brand Name" value={name} onChange={e => setName(e.target.value)} />
            <Input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
            <input type="file" accept="image/*" onChange={e => setBrandLogo(e.target.files?.[0] || null)} />
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Update Brand"}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
