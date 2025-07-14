"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"

export default function Page() {
  const [tests, setTests] = useState<{ id: number; name: string; email: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const token = Cookies.get("token")
        const response = await axios.get("http://localhost:8000/api/test", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setTests(response.data)
      } catch (error) {
        console.error(error)
        setError("Failed to load data.")
      } finally {
        setLoading(false)
      }
    }

    fetchTests()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      const token = Cookies.get("token")
      await axios.delete(`http://localhost:8000/api/test/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setTests((prev) => prev.filter((item) => item.id !== id))
    } catch (error) {
      console.error("Delete failed:", error)
    }
  }

  const handleEdit = (id: number) => {
    console.log("Edit clicked for id:", id)
    // You can route to another page or open a modal for editing
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-A4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#"> View Simple Form</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="px-10 py-6">
            <Card>
              <CardHeader>
                <CardTitle>View Simple Form</CardTitle>
                <CardDescription>
                  This is a simple form to test frontend and backend integration.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading && <p>Loading data...</p>}
                {error && <p className="text-red-600">{error}</p>}
                {!loading && !error && tests.length === 0 && (
                  <p>No data found for your account.</p>
                )}
                {!loading && !error && tests.length > 0 && (
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 px-4">Name</th>
                        <th className="py-2 px-4">Email</th>
                        <th className="py-2 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tests.map((test) => (
                        <tr key={test.id} className="hover:bg-gray-100">
                          <td className="py-2 px-4">{test.name}</td>
                          <td className="py-2 px-4">{test.email}</td>
                          <td className="py-2 px-4 flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(test.id)}
                            >
                              <Pencil className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(test.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
