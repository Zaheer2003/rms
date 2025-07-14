"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Settings2 } from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
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
import { Skeleton } from "@/components/ui/skeleton"

interface SettingsCardProps {
  title: string
  description: string
  url: string
  icon: React.ReactNode
}

const SettingsCard: React.FC<SettingsCardProps> = ({ title, description, url, icon }) => {
  const router = useRouter()

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      router.push(url)
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Go to ${title}`}
      onClick={() => router.push(url)}
      onKeyDown={handleKeyDown}
      className="cursor-pointer rounded-lg border border-gray-200 p-5 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow bg-white flex flex-col space-y-3"
    >
      <div className="flex items-center space-x-3">{icon}</div>
      <h2 className="text-lg font-medium text-gray-900">{title}</h2>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}

export default function Page() {
  const isLoading = false

  const settingsItems = [
    {
      title: "Account Settings",
      description: "Manage your personal account information",
      url: "/settings/account",
      icon: <Settings2 className="h-6 w-6 text-indigo-600" />,
    },
    {
      title: "Team",
      description: "Manage team members and permissions",
      url: "/settings/team",
      icon: <Settings2 className="h-6 w-6 text-green-600" />,
    },
    {
      title: "Billing",
      description: "View billing details and payment methods",
      url: "/settings/billing",
      icon: <Settings2 className="h-6 w-6 text-yellow-600" />,
    },
    {
      title: "Limits",
      description: "Set usage limits and quotas",
      url: "/settings/limits",
      icon: <Settings2 className="h-6 w-6 text-red-600" />,
    },
    {
      title: "Auto Numbers Settings",
      url: "/settings/autoNumbers",
      description: "Configure auto number settings for your application",
      icon: <Settings2 className="h-6 w-6 text-blue-600" />,
    },
    {
      title: "Background Settings",
      description: "Choose your dashboard background theme (light or dark)",
      url: "/settings/bg-setting",
      icon: <Settings2 className="h-6 w-6 text-blue-600" />,
    },
  ]

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
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid gap-6 px-10 py-6">
            <section
              aria-label="Settings options"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {isLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-32 rounded-lg" />
                  ))
                : settingsItems.map(({ title, description, url, icon }) => (
                    <SettingsCard
                      key={title}
                      title={title}
                      description={description}
                      url={url}
                      icon={icon}
                    />
                  ))}
            </section>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
