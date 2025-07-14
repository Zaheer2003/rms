"use client"
import Link from "next/link";
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

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"  // Import Skeleton component
import { AlertCircle } from 'lucide-react';

export default function Page() {
  // Simulate loading state
  const isLoading = false;

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
            
            {/* Card 1 - Filters with Add Employee Button */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Filter Employees</CardTitle>
                  <Link href="/employees/add">
                    <Button variant="default" className="mt-4">+ Add New Employee</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <Input placeholder="Search by name or email..." className="max-w-sm" />
                <Input placeholder="Filter by department..." className="max-w-sm" />
                <Button variant="outline">Apply Filters</Button>
              </CardContent>
            </Card>

            {/* Card 2 - Available Employees */}
            <Card>
              <CardHeader>
                <CardTitle>Available Employees</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Loading Skeleton */}
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    {/* Icon for No Employees */}
                    <AlertCircle className="h-12 w-12 text-muted-foreground" /> {/* Icon */}
                    
                    {/* Add New Employee Button */}
                    <div className="mt-4 text-center">
                      <Link href="/employees/add">
                        <Button variant="default">+ Add New Employee</Button>
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
