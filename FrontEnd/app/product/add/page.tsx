"use client"

import { useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"

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
import { toast } from "@/hooks/use-toast"
import router from "next/router"

import ItemDetailsCard from "@/components/Inventory/itemDetailsCard"
import PricingDetailsCard from "@/components/Inventory/pricingDetailsCard"
import InventoryManagementCard from "@/components/Inventory/inventoryManagementCard"
import MoreDetailsCard from "@/components/Inventory/moreDetailsCard"
import ActionBtn from "@/components/Inventory/ActionBtn"





export default function Page() {

  

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
                  <BreadcrumbLink href="#">Product</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <main className="flex flex-col gap-4 p-6 pt-6 mt-2">
          {/* <form onSubmit={handleSubmit}> */}
          <ActionBtn/>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                <ItemDetailsCard/>
                <PricingDetailsCard/>
            </div>
            <InventoryManagementCard/>
            <MoreDetailsCard/>
        {/* </form> */}
      </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
