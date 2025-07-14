"use client";
import { ChevronDown, Slash } from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { PurchaseActionButtons } from "@/components/purchase/ActionBtn";


import { PurchaseDetailsCard } from "@/components/purchase/PurchaseDetailCard";
import { SupplierCard } from "@/components/purchase/SupplierCard";
import { PurchaseTable } from "@/components/purchase/PurchaseTable";

    import { Button } from "@/components/ui/button";

export default function Page() {
  
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
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              Purchases
              <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Manage Purchases</DropdownMenuItem>
              <DropdownMenuItem>Purchase Setting</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Add Purchases</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
            </div>
          </div>
        </header>

{/* Main Content */}
<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
  <div className="grid gap-6 px-10 py-6">
    
    {/* Action Buttons */}
    <PurchaseActionButtons />

    {/* First Row: Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SupplierCard />
      <PurchaseDetailsCard />
    </div>

    {/* Table */}
    <PurchaseTable />
  </div>
</div>



      </SidebarInset>
    </SidebarProvider>
  );
}
