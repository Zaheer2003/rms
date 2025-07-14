"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, FileSpreadsheet } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface Client {
  id: number;
  firstName: string;
  lastName: string;
  nic: string;
  dob?: string;
  phone: string;
  mobile: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  code: string;
  email: string;
  currency?: string;
  category?: string;
  invoicingMethod?: string;
  notes?: string;
  attachment?: string | File | null;
}

export default function Page() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    fetchClients(page, pageSize);
  }, [page, pageSize]);

  const fetchClients = async (pageNum = 1, size = 10) => {
    setLoading(true);
    setError("");
    try {
      const token = Cookies.get("token");
      const res = await axios.get(
        `http://localhost:8000/api/clients?page=${pageNum}&pageSize=${size}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setClients(res.data.data || res.data);
      setTotal(res.data.total || res.data.length);
    } catch {
      setError("Failed to load clients.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    if (!search.trim()) {
      fetchClients(page, pageSize);
    } else {
      const filtered = clients.filter((c) =>
        c.firstName.toLowerCase().includes(search.toLowerCase())
      );
      setClients(filtered);
    }
  };

  const handleResetFilter = () => {
    setSearch("");
    fetchClients(page, pageSize);
  };

  const handleDelete = async (id: number) => {
    try {
      const token = Cookies.get("token");
      await axios.delete(`http://localhost:8000/api/client/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClients((prev) => prev.filter((c) => c.id !== id));
      setTotal((prev) => prev - 1);
      toast({ title: "Success", description: "Client deleted successfully" });
    } catch {
      toast({ title: "Error", description: "Failed to delete client", variant: "destructive" });
    }
  };

  const handleDownload = () => {
    // TODO: implement PDF download
  };

  const handleExcel = () => {
    // TODO: implement Excel download
  };

  useEffect(() => {
    const msg = sessionStorage.getItem("clientSuccessMsg");
    if (msg) {
      toast({ title: "Success", description: msg });
      sessionStorage.removeItem("clientSuccessMsg");
    }
  }, [toast]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 items-center px-4">
          <div className="flex items-center gap-2 w-full">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-4 mx-2" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid gap-6 px-6">
            {/* Filter + Add */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Filter Client Details</CardTitle>
                  <Link href="/clients/add">
                    <Button>+ Add Client</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4 items-end">
                <Input
                  placeholder="Search by client name..."
                  className="max-w-xs"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="outline" onClick={handleFilter}>
                  Apply Filter
                </Button>
                <Button variant="destructive" onClick={handleResetFilter}>
                  Reset
                </Button>
              </CardContent>
            </Card>

            {/* Clients Table */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center flex-wrap gap-3">
                  <CardTitle>Available Clients</CardTitle>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={handleDownload}>
                      <Download className="mr-1 w-4 h-4" /> PDF
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleExcel}>
                      <FileSpreadsheet className="mr-1 w-4 h-4" /> Excel
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 md:p-4">
                {loading && (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Image src="/loading.svg" alt="Loading" width={100} height={100} />
                    <span className="text-muted-foreground mt-2">Loading clients...</span>
                  </div>
                )}
                {error && (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Image src="/404 error.svg" alt="Error" width={100} height={100} />
                    <span className="text-red-500 mt-2">{error}</span>
                  </div>
                )}
                {!loading && !error && clients.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Image src="/empty.svg" alt="Empty" width={100} height={100} />
                    <span className="text-muted-foreground mt-2">No clients found</span>
                    <Link href="/clients/add">
                      <Button className="mt-4">+ Add New Client</Button>
                    </Link>
                  </div>
                )}
                {!loading && !error && clients.length > 0 && (
                  <div className="overflow-x-auto rounded-md border bg-white shadow">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="bg-gray-100 text-left">
                          <th className="p-2">Image</th>
                          <th className="p-2">Name</th>
                          <th className="p-2">Email</th>
                          <th className="p-2">Phone</th>
                          <th className="p-2">Status</th>
                          <th className="p-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clients.map((client) => (
                          <tr key={client.id} className="border-t hover:bg-gray-50">
                            <td className="p-2">
                              {client.attachment ? (
                                typeof client.attachment === "string" ? (
                                  <Image
                                    src={client.attachment}
                                    alt="Client"
                                    width={40}
                                    height={40}
                                    className="rounded-full object-cover"
                                  />
                                ) : (
                                  <Image
                                    src={URL.createObjectURL(client.attachment)}
                                    alt="Client"
                                    width={40}
                                    height={40}
                                    className="rounded-full object-cover"
                                  />
                                )
                              ) : (
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                  {client.firstName.charAt(0)}
                                </div>
                              )}
                            </td>
                            <td className="p-2">
                              <Link href={`/clients/view/${client.id}`} className="text-blue-600 hover:underline">
                                {client.firstName} {client.lastName}
                              </Link>
                            </td>
                            <td className="p-2">{client.email}</td>
                            <td className="p-2">{client.phone || client.mobile}</td>
                            <td className="p-2 text-green-600 font-medium">Active</td>
                            <td className="p-2 space-x-2">
                              <Link href={`/clients/view/${client.id}`}>
                                <Button size="sm" variant="outline">View</Button>
                              </Link>
                              <Link href={`/client/edit/${client.id}`}>
                                <Button size="sm" variant="default">Edit</Button>
                              </Link>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="sm" variant="destructive">Delete</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete{" "}
                                      <strong>{client.firstName} {client.lastName}</strong>?
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(client.id)}>
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}
