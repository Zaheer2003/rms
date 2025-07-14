"use client"

import * as React from "react"
import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function NavMain({
  groups,
}: {
  groups: {
    group: string
    items: {
      title: string
      url: string
      icon?: LucideIcon
      isActive?: boolean
      items?: {
        title: string
        url: string
      }[]
    }[]
  }[]
}) {
  const allItems = groups.flatMap((group) => group.items)

  return (
    <TooltipProvider>
      <SidebarMenu>
        {allItems.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                {item.items && item.items.length > 0 ? (
                  <a href={item.url} className="w-full">
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={item.isActive}
                      asChild
                    >
                      <span className="flex items-center w-full">
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </span>
                    </SidebarMenuButton>
                  </a>
                ) : (
                  <a href={item.url} className="w-full">
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={item.isActive}
                      asChild
                    >
                      <span className="flex items-center w-full">
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </span>
                    </SidebarMenuButton>
                  </a>
                )}
              </CollapsibleTrigger>
              {item.items && item.items.length > 0 && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </TooltipProvider>
  )
}
