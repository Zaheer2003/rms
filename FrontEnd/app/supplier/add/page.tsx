"use client"

import { useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"

import { AppSidebar } from "@/components/app-sidebar"

import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { toast } from "@/hooks/use-toast"
import SupplierAccountCard from "@/components/supplier/supplierAccountCard"
import SupplierDetailsCard from "@/components/supplier/supplierDetailsCard"
import { SupplierActionButtons } from "@/components/supplier/btns"
import router from "next/router"
import { Button } from "@/components/ui/button"
import BackBtn from "@/components/backBtn"



export default function Page() {
  const [formData, setFormData] = useState({ businessName: "", firstName: "", lastName: "", supplierNumber: "", email: "" })
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
      "http://localhost:8000/api/suppliers",
      {
        businessName: formData.businessName,
        firstName: formData.firstName,
        lastName: formData.lastName,
        supplierNumber: formData.supplierNumber,
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

    setFormData({ businessName: "", firstName: "", lastName: "", supplierNumber: "", email: "" }); // Reset form data
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
        <header className="flex h-16 items-center gap-2 px-4 bg-background/80 border-b">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <BackBtn/>
            <Separator orientation="vertical" className="mr-8 h-12"/>
            <h1 className="text-lg font-semibold tracking-tight">Add Supplier</h1>
        </header>

        <main className="flex flex-col gap-4 p-6 pt-6 mt-2 min-h-[60vh] bg-muted/50">
          <form onSubmit={handleSubmit}>
            <SupplierActionButtons loading={loading} success={success} error={error} onCancel={() => router.push("/dashboard")} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <SupplierDetailsCard formData={formData} handleChange={handleChange} />
              <SupplierAccountCard formData={formData} handleChange={handleChange} />
            </div>
        </form>
      </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
