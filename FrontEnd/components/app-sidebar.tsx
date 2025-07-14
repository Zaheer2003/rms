"use client"

import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  Users,
  UserCog,
  MonitorSmartphone,
  Truck,
  Handshake,
  Warehouse,
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  PieChart,
  Settings2,
  Boxes,
  StoreIcon
} from "lucide-react"
import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { title } from "process"
import { useEffect, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"

const navData = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "E-commerce",
    url: "/e-commerce",
    icon: StoreIcon,
    items: [
      {title: "view", url: "/e-commerce"},
      {title: "Products", url: "/e-commerce/products"},
      {title: "Orders", url: "/e-commerce/orders"},
      {title: "Customers", url: "/e-commerce/customers"},
      {title: "Settings", url: "/e-commerce/settings"},
      {title: "Analytics", url: "/e-commerce/analytics"},
      {title: "Marketing", url: "/e-commerce/marketing"},
      {title: "Shipping", url: "/e-commerce/shipping"},
      {title: "Payments", url: "/e-commerce/payments"},
      {title: "Discounts", url: "/e-commerce/discounts"},
      {title: "Reviews", url: "/e-commerce/reviews"},
      {title: "Returns", url: "/e-commerce/returns"},
      {title: "Affiliate Program", url: "/e-commerce/affiliate"},
      {title: "Loyalty Program", url: "/e-commerce/loyalty"},
      {title: "Subscriptions", url: "/e-commerce/subscriptions"},
      {title: "Gift Cards", url: "/e-commerce/gift-cards"},
      {title: "Mobile App", url: "/e-commerce/mobile-app"},
      {title: "Integrations", url: "/e-commerce/integrations"},
      {title: "API", url: "/e-commerce/api"},
      {title: "Documentation", url: "/e-commerce/documentation"},
      {title: "Support", url: "/e-commerce/support"},
      {title: "Community", url: "/e-commerce/community"},
      {title: "Blog", url: "/e-commerce/blog"},
      {title: "About Us", url: "/e-commerce/about"},
      {title: "Contact Us", url: "/e-commerce/contact"},
      {title: "Terms of Service", url: "/e-commerce/terms"},
      {title: "Privacy Policy", url: "/e-commerce/privacy"},
      {title: "Careers", url: "/e-commerce/careers"}, 
    ]
  },
  {
    title: "Sales", 
    url: "/sales",
    icon: FileText,
    items: [
      { title: "Create Invoice", url: "/sales/invoices/add" }, 
      { title: "Manage Invoices", url: "/sales" }, 
      { title: "Invoice Settings", url: "#" },
    ],
  },
  
  {
    title: "Suppliers",
    url: "/supplier",
    icon: Handshake,
    items: [
      { title: "Add Supplier", url: "/supplier/add" },
      { title: "Manage Suppliers", url: "#" },
      { title: "Supplier Settings", url: "#" },
      { title: "Supplier Details", url: "#" },
    ],
  },
  {
    title: "Purchases",
    url: "/purchases",
    icon: Truck,
    items: [
      { title: "Add Purchase", url: "/purchases/add" },
      { title: "Manage Purchases", url: "/purchases" },
      { title: "Purchase Settings", url: "#" },
    ],
  },
  
  {
    title: "Warehouse",
    url: "/warehouse",
    icon: Warehouse,
    items: [
      { title: "Add Warehouse", url: "/warehouse/add" },
      { title: "Manage Warehouse", url: "/warehouse" },
      { title: "Warehouse Settings", url: "#" },
    ],
  },
  {
    title: "POS",
    url: "pos",
    icon: MonitorSmartphone,
    items: [
      { title: "Manage POS", url: "/pos" },
      { title: "Start POS", url: "/pos/add" },
      { title: "POS Settings", url: "#" },
    ],
  },
  {
    title: "Reports",
    url: "#",
    icon: PieChart,
    items: [
      { title: "View Reports", url: "#" },
      { title: "Generate Reports", url: "#" },
      { title: "Report Settings", url: "#" },
    ],
  },
  {
    title: "Accounting",
    url: "/accounting",
    icon: FileText,
    items: [
      { title: "Chart of Accounts", url: "/accounting/chart-of-accounts" },
      { title: "Journal Entries", url: "/accounting/journal-entries" },
      { title: "Payments", url: "/accounting/payments" },
      { title: "Receipts", url: "/accounting/receipts" },
    ],
  },
  {
    title: "CRM",
    url: "/crm",
    icon: Users,
    items: [
      { title: "Add Clients", url: "/clients/add" },
      { title: "Manage Clients", url: "/clients" },
      { title: "Client Settings", url: "#" },
    ],
  },
  {
    title: "Projects",
    url: "/projects",
    icon: Command,
    items: [
      { title: "Project List", url: "/projects" },
      { title: "Task Board", url: "/projects/tasks" },
      { title: "Time Tracking", url: "/projects/time-tracking" },
    ],
  },
  {
    title: "HR",
    url: "/hr",
    icon: UserCog,
    items: [
      { title: "Manage Employees", url: "/employees" },
      { title: "Add Employees", url: "/employees/add" },
      { title: "Employee Settings", url: "/inventory/valuation" },
      { title: "Payroll", url: "/hr/payroll" },
      { title: "Attendance", url: "/hr/attendance" },
      { title: "Leave Management", url: "/hr/leave" },
    ],
  },
  {
    title: "Inventory",
    url: "/inventory",
    icon: Boxes,
    items: [
      { title: "Add Product", url: "/product/add" },
      { title: "Manage Products", url: "/product" },
      { title: "Product Settings", url: "/product/setting" },
      { title: "Stock Transfers", url: "/inventory/stock-transfers" },
      { title: "Adjustments", url: "/inventory/adjustments" },
      { title: "Stock Valuation", url: "/inventory/valuation" },
    ],
  },
  {
    title: "Support",
    url: "/support",
    icon: AudioWaveform,
    items: [
      { title: "Tickets", url: "/support/tickets" },
      { title: "Knowledge Base", url: "/support/knowledge-base" },
    ],
  },
  {
    title: "Chatbot (AI Gemini)",
    url: "/chatbot",
    icon: Command,
    items: [
      { title: "Business Workflow Assistant", url: "/chatbot/business-workflow" },
      { title: "Ask Gemini", url: "/chatbot/ask-gemini" },
    ],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings2,
    items: [
      { title: "General Settings", url: "/settings" },
      { title: "Account Settings", url: "/settings/account" },
      { title: "Module Preferences", url: "/settings/modules" },
      { title: "SMTP Settings", url: "/settings/smtp" } 
    ],
  },
]

// Grouped navData by ERP modules
const navGroups = [
  {
    group: "General",
    items: [
      navData.find(item => item.title === "Dashboard"),
      navData.find(item => item.title === "E-commerce"),
    ].filter((item): item is typeof navData[0] => !!item && !!item.title && !!item.url),
  },
  {
    group: "Sales & CRM",
    items: [
      navData.find(item => item.title === "Sales"),
      // navData.find(item => item.title === "Clients"),
      navData.find(item => item.title === "CRM"),
    ].filter((item): item is typeof navData[0] => !!item && !!item.title && !!item.url),
  },
  {
    group: "Purchasing & Inventory",
    items: [
      navData.find(item => item.title === "Suppliers"),
      navData.find(item => item.title === "Purchases"),
      // navData.find(item => item.title === "Products"),
      navData.find(item => item.title === "Warehouse"),
      navData.find(item => item.title === "Inventory"),
    ].filter((item): item is typeof navData[0] => !!item && !!item.title && !!item.url),
  },
  {
    group: "Operations",
    items: [
      // navData.find(item => item.title === "Projects"),
      navData.find(item => item.title === "POS"),
      // navData.find(item => item.title === "Support"),
      navData.find(item => item.title === "Reports"),
    ].filter((item): item is typeof navData[0] => !!item && !!item.title && !!item.url),
  },
  {
    group: "HR",
    items: [
      // navData.find(item => item.title === "Employees"),
      navData.find(item => item.title === "HR"),
    ].filter((item): item is typeof navData[0] => !!item && !!item.title && !!item.url),
  },
  {
    group: "Finance",
    items: [
      navData.find(item => item.title === "Accounting"),
    ].filter((item): item is typeof navData[0] => !!item && !!item.title && !!item.url),
  },
  {
    group: "AI & Settings",
    items: [
      navData.find(item => item.title === "Chatbot (AI Gemini)"),
      navData.find(item => item.title === "Settings"),
    ].filter((item): item is typeof navData[0] => !!item && !!item.title && !!item.url),
  },
];

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const [user, setUser] = useState({ name: "", email: "" })

  useEffect(() => {
    const token = Cookies.get("token")
    if (token) {
      axios
        .get("http://localhost:8000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch(() => setUser({ name: "User", email: "user@example.com" }))
    }
  }, [])

  // Add active key to current page
  const navGroupsWithActive = navGroups.map(group => ({
    ...group,
    items: group.items
      .filter(Boolean)
      .map(item => ({
        ...item,
        isActive: item && pathname.startsWith(item.url),
      })),
  }))

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher
          teams={[
            { name: "Ruby Hardware", logo: StoreIcon, plan: "Enterprise" },
          ]}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain groups={navGroupsWithActive} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={user}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
