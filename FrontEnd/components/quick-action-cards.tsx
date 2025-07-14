// components/quick-action-cards.tsx
import Link from "next/link"
import { Card } from "@/components/ui/card"
import {
  FilePlus,
  ShoppingCart,
  Laptop,
  UserPlus,
  PackagePlus,
  Handshake,
} from "lucide-react"

const actions = [
  { title: "Create Invoice", icon: <FilePlus className="text-primary w-8 h-8" />, href: "/invoices/add" },
  { title: "POS", icon: <ShoppingCart className="text-primary w-8 h-8" />, href: "/pos" },
  { title: "Start Selling", icon: <Laptop className="text-primary w-8 h-8" />, href: "/start-selling" },
  { title: "New Client", icon: <UserPlus className="text-primary w-8 h-8" />, href: "/clients/add" },
  { title: "New Product", icon: <PackagePlus className="text-primary w-8 h-8" />, href: "/products/add" },
  { title: "Suppliers", icon: <Handshake className="text-primary w-8 h-8" />, href: "/suppliers" },
]

export function QuickActionCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 px-4 sm:px-10">
      {actions.map((action) => (
        <Link key={action.title} href={action.href}>
          <Card className="w-28 h-28 sm:w-32 sm:h-32 flex flex-col items-center justify-center text-center bg-gray-100 dark:bg-gray-800 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer rounded-2xl">
            <div>{action.icon}</div>
            <div className="mt-2 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200">
              {action.title}
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
