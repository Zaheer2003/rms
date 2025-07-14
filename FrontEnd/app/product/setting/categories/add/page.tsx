"use client"

import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
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
import { Textarea } from "@/components/ui/textarea"
import { UploadCloud } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"


export default function Page() {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [attachment, setAttachment] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "file") {
      setAttachment(e.target.files?.[0] || null);
      const label = document.getElementById('selected-file-label');
      if (label) label.textContent = e.target.files?.[0] ? `Selected: ${e.target.files[0].name}` : "Selected: None";
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

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
      if (attachment) {
        form.append("attachment", attachment);
      }

      await axios.post(
        "http://localhost:8000/api/categories",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Success",
        description: "Category added successfully!",
        variant: "default",
      })

      setFormData({ name: "", description: "" });
      setAttachment(null);
      const label = document.getElementById('selected-file-label');
      if (label) label.textContent = "Selected: None";
      setTimeout(() => {
        router.push("/product/setting/categories");
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
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Categories</BreadcrumbLink>
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
                <CardTitle>Add New Category</CardTitle>
                <div className="text-muted-foreground text-sm mt-1">Fill in the details to create a new product category.</div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label>Name <span className="text-destructive">*</span></Label>
                    <Input
                      type="text"
                      placeholder="Enter category name"
                      className="mt-2"
                      value={formData.name}
                      id="name"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>Attachments</Label>
                    <div
                      className="border-2 border-dashed border-muted-foreground rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer bg-muted/30 hover:bg-muted/50 transition"
                      onDragOver={e => e.preventDefault()}
                      onClick={() => document.getElementById('attachment')?.click()}
                    >
                      <UploadCloud className="w-8 h-8 text-primary mb-2" />
                      <div className="text-sm text-muted-foreground">Drop file here or <span className="underline text-primary">select from your computer</span></div>
                      <input
                        id="attachment"
                        type="file"
                        name="attachment"
                        className="hidden"
                        title="Select attachment file"
                        placeholder="Select attachment file"
                        onChange={handleChange}
                      />
                      <div id="selected-file-label" className="mt-2 text-xs text-foreground">Selected: {attachment ? attachment.name : "None"}</div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Accepted formats: jpg, png, pdf. Max size: 5MB.</div>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      placeholder="Enter a description for this category (optional)"
                      value={formData.description}
                      id="description"
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <Button className="mr-2" type="submit" disabled={loading}>{loading ? "Saving..." : "Save"}</Button>
                    <Button type="reset" variant="outline" disabled={loading} onClick={() => {
                      setFormData({ name: "", description: "" });
                      setAttachment(null);
                      const label = document.getElementById('selected-file-label');
                      if (label) label.textContent = "Selected: None";
                    }}>Cancel</Button>
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
