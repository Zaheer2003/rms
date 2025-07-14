"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { StatsCard } from "@/components/StatsCard"
import RecentActivitiesCard from "@/components/RecentActivitiesCard"
import { TopBar } from "@/components/top-bar"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import Cookies from "js-cookie"
import axios from "axios"

import { Audiowide } from "next/font/google"
import { Roboto } from "next/font/google"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import SaleReportCard from "@/components/SalesReportCard"
import PaymentsReportCard from "@/components/PaymentsReportCard"

// Font config
const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
})

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
})

export default function Page() {
  const [today, setToday] = useState("")
  const [greeting, setGreeting] = useState("Hello")
  const [userName, setUserName] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    // Redirect to login if not authenticated
    const token = Cookies.get("token")
    if (!token) {
      router.replace("/auth")
      return
    }

    const date = new Date()
    const formatted = date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    setToday(formatted)

    const hour = date.getHours()
    if (hour >= 5 && hour < 12) {
      setGreeting("Good Morning")
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good Afternoon")
    } else if (hour >= 18 && hour < 22) {
      setGreeting("Good Evening")
    } else {
      setGreeting("Good Night, sweet dreams")
    }

    // Fetch user name from backend
    axios
      .get("http://localhost:8000/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUserName(res.data.name))
      .catch(() => setUserName("User"))
  }, [router])

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <TopBar title="Dashboard" />

        {/* Main Content */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="px-10 py-6">
            <h1 className={`text-3xl font-bold`}>
              {greeting}, {userName}
            </h1>
            <p className={`text-lg text-muted-foreground`}>
              {today}
            </p>
          </div>

          {/* Dashboard Data Cards */}
          <div>

          <StatsCard />

          <SaleReportCard />
          <PaymentsReportCard />
          <RecentActivitiesCard />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
