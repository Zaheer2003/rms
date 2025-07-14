"use client"

import React, { useState, useEffect } from "react"
import Cookies from "js-cookie"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import * as Toast from "@/components/ui/toast"

import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { UserDetailsCard } from "@/components/accountSettingCards/userDetailsCard"
import { ShopDetailsCard } from "@/components/accountSettingCards/shopDetailsCard"

export default function AccountSettingPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [avatar, setAvatar] = useState<string | undefined>(undefined)
  const [shop, setShop] = useState<{
    business_name: string;
    shop_type: string;
    shop_address: string;
    shop_workers: string;
    shop_currency: string;
    shop_country: string;
  } | null>(null)
  const [open, setOpen] = useState(false)
  const [toastData, setToastData] = useState<{
    title: string
    description: string
    variant?: "default" | "destructive"
  }>({
    title: "",
    description: "",
    variant: "default",
  })

  useEffect(() => {
    const token = Cookies.get("token")
    if (!token) return
    axios
      .get("http://localhost:8000/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsername(res.data.name || "")
        setEmail(res.data.email || "")
        setAvatar(res.data.avatar)
        setShop(res.data.shop)
      })
      .catch(() => {
        setUsername("")
        setEmail("")
        setAvatar(undefined)
        setShop(null)
      })
  }, [])

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <div className="flex items-center gap-2 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4 mr-2" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Account Settings</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <UserDetailsCard name={username} email={email} avatar={avatar} />
            {shop && <ShopDetailsCard shop={shop} />}
          </div>
        </div>
      </SidebarInset>

      {/* Toast */}
      <Toast.ToastProvider>
        <Toast.Toast open={open} onOpenChange={setOpen} variant={toastData.variant}>
          <Toast.ToastTitle>{toastData.title}</Toast.ToastTitle>
          <Toast.ToastDescription>{toastData.description}</Toast.ToastDescription>
          <Toast.ToastClose />
        </Toast.Toast>
        <Toast.ToastViewport />
      </Toast.ToastProvider>
    </SidebarProvider>
  )
}
