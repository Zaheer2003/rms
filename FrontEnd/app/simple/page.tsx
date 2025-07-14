"use client"

import { useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"; 

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { toast } from "@/hooks/use-toast"

export default function Page() {
  const [formData, setFormData] = useState({ name: "", email: "" })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setSuccess("");
  setError("");

  try {
    const token = Cookies.get("token");
    if (!token) {
      setError("You must be logged in to submit data.");
      setLoading(false);
      return;
    }

    await axios.post(
      "http://localhost:8000/api/test",
      {
        name: formData.name,
        email: formData.email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSuccess("Data submitted successfully!");
    toast({
      title: "Success",
      description: "Data submitted successfully!",
      variant: "default",
    });

    setFormData({ name: "", email: "" });
  } catch (err) {
    setError("An error occurred. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-A4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Simple Form</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="px-10 py-6">
            <Card>
              <CardHeader>
                <CardTitle>Simple Form</CardTitle>
                <CardDescription>
                  This is a simple form to test frontend and backend integration.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <Label htmlFor="name" className="mt-4 block">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    className="mt-2"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Label htmlFor="email" className="mt-4 block">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="mt-2"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <div className="mt-4 flex gap-2">
                    <Button type="submit" disabled={loading}>
                      {loading ? "Saving..." : "Save"}
                    </Button>
                    <Button
                      type="reset"
                      variant="outline"
                      onClick={() => {
                        setFormData({ name: "", email: "" })
                        setError("")
                        setSuccess("")
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                  {success && (
                    <p className="mt-2 text-sm text-green-600" aria-live="polite">
                      {success}
                    </p>
                  )}
                  {error && (
                    <p className="mt-2 text-sm text-red-600" aria-live="polite">
                      {error}
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
