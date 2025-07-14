"use client"

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import React, { useState } from "react"
import Cookies from "js-cookie"
import axios from "axios"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function Page() {
  const [formData, setFormData] = useState({ name: "", description: "" })
  const [brandLogoFile, setBrandLogoFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "file") {
      setBrandLogoFile(e.target.files?.[0] || null)
      const label = document.getElementById('selected-logo-label');
      if (label) label.textContent = e.target.files?.[0] ? `Selected: ${e.target.files[0].name}` : "Selected: None";
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    

    try {
      const token = Cookies.get("token");
      if (!token) {
        toast({
          title: "Error",
          description: "You must be logged in to submit data",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const form = new FormData();
      form.append("name", formData.name);
      form.append("description", formData.description);
      if (brandLogoFile) {
        form.append("brandLogo", brandLogoFile);
      }

      await axios.post(
        "http://localhost:8000/api/brands",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast({
        title: "Success",
        description: "Brand created successfully",
        variant: "default",
      });
      setFormData({ name: "", description: "" });
      setBrandLogoFile(null);
      const label = document.getElementById('selected-logo-label');
      if (label) label.textContent = "Selected: None";
      setTimeout(() => {
        router.push("/product/setting/brand");
      }, 1000);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "An error occurred, please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center justify-between w-full px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid gap-6 px-10 py-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Brand</CardTitle>
                <div className="text-muted-foreground text-sm mt-1">Fill in the details to create a new brand for your products.</div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter brand name"
                      className="mt-2"
                      value={formData.name}
                      id="name"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="brandLogo">Brand Logo</Label>
                    <div
                      className="border-2 border-dashed border-muted-foreground rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer bg-muted/30 hover:bg-muted/50 transition"
                      onClick={() => document.getElementById('brandLogo')?.click()}
                    >
                      <span className="text-sm text-muted-foreground">Drop logo here or <span className="underline text-primary">select from your computer</span></span>
                      <Input
                        id="brandLogo"
                        type="file"
                        name="brandLogo"
                        className="hidden"
                        accept="image/*"
                        onChange={handleChange}
                      />
                      <div id="selected-logo-label" className="mt-2 text-xs text-foreground">Selected: {brandLogoFile ? brandLogoFile.name : "None"}</div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Accepted formats: jpg, png. Max size: 2MB.</div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      type="text"
                      placeholder="Enter a short description (optional)"
                      className="mt-2"
                      id="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                  </Button>
                  <Button type="reset" variant='outline' onClick={() => {
                    setFormData({ name: "", description: "" })
                    setBrandLogoFile(null)
                    const label = document.getElementById('selected-logo-label');
                    if (label) label.textContent = "Selected: None";
                  }}>
                    Cancel
                  </Button>
                </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
