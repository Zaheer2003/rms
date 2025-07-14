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

import {  Download, FileSpreadsheet } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
import axios from "axios";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import Image from 'next/image';

type Category = {
  id: number;
  name: string;
  description?: string;
  categoryLogo?: string;
};

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const router = useRouter();
  const { toast } = useToast();

  // Fetch categories with pagination
  const fetchCategories = async (pageNum = 1, size = 10) => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      const response = await axios.get(`http://localhost:8000/api/categories?page=${pageNum}&pageSize=${size}`,
        { headers: { Authorization: `Bearer ${token}` } });
      setCategories(response.data.data || response.data);
      setTotal(response.data.total || response.data.length);
    } catch {
      setError("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(page, pageSize);
  }, [page, pageSize]);

  const handleFilter = () => {
    setCategories(prev => prev.filter(c => c.name.toLowerCase().includes(search.toLowerCase())));
  };

  const handleResetFilter = () => {
    setSearch("");
    setLoading(true);
    setError("");
    fetchCategories();
  };

  const handleDelete = async (id: number) => {
    try {
      const token = Cookies.get("token");
      await axios.delete(`http://localhost:8000/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(prev => prev.filter(c => c.id !== id));
      setTotal(t => t - 1);
      toast({ title: "Success", description: "Category deleted successfully.", variant: "default" });
    } catch {
      setError("Failed to delete category.");
      toast({ title: "Error", description: "Failed to delete category.", variant: "destructive" });
    }
  };

  const handleDownload = () => {
    const csv = [
      ["#", "Name", "Description"],
      ...categories.map((c, i) => [i + 1, c.name, c.description || ""])
    ].map(row => row.map(String).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "categories.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExcel = async () => {
    const xlsxRows = [
      ["#", "Name", "Description"],
      ...categories.map((c, i) => [i + 1, c.name, c.description || ""])
    ];
    const XLSX = await import("xlsx");
    const ws = XLSX.utils.aoa_to_sheet(xlsxRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Categories");
    XLSX.writeFile(wb, "categories.xlsx");
  };

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.text("Categories List", 14, 16);
    autoTable(doc, {
      startY: 24,
      head: [["#", "Name", "Description"]],
      body: categories.map((c, i) => [i + 1, c.name, c.description || ""]),
    });
    doc.save("categories.pdf");
  };

  useEffect(() => {
    // Check for a success message in sessionStorage
    const successMsg = sessionStorage.getItem("categorySuccessMsg");
    if (successMsg) {
      toast({
        title: "Success",
        description: successMsg,
        variant: "default",
      });
      sessionStorage.removeItem("categorySuccessMsg");
    }
  }, [toast]);

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
                    <BreadcrumbLink href="#">Categories</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid gap-6 px-10 py-6">
            
            {/* Card 1 - Filters */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Filter Categories</CardTitle>
                  <Link href="categories/add">
                    <Button variant="default" className="mt-4">+ Add New Category</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4 items-end">
                <Input
                  placeholder="Search by name..."
                  className="max-w-xs"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <Button variant="outline" onClick={handleFilter}>Apply Filter</Button>
                <Button variant="ghost" onClick={handleResetFilter}>Reset</Button>
              </CardContent>
            </Card>

            {/* Card 2 - Available Categories */}
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <CardTitle className="text-xl font-bold tracking-tight text-gray-800">Available Categories</CardTitle>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <Button size="sm" variant="outline" onClick={handleDownload}><Download className="w-4 h-4 mr-1" />Download CSV</Button>
                    <Button size="sm" variant="outline" onClick={handleExcel}><FileSpreadsheet className="w-4 h-4 mr-1" />Excel</Button>
                    <Button size="sm" variant="outline" onClick={handlePDF}>PDF</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 md:p-4">
                {loading && (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Image src="/loading.svg" alt="Loading" width={300} height={300} className="mb-2" />
                    <div className="text-muted-foreground text-lg">Loading categories...</div>
                  </div>
                )}
                {error && (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Image src="/404 error.svg" alt="Error" width={300} height={300} className="mb-2" />
                    <div className="text-red-600 text-lg">{error}</div>
                  </div>
                )}
                {!loading && !error && categories.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Image src="/Empty.svg" alt="No Data" width={300} height={300} className="mb-2" />
                    <div className="text-muted-foreground mb-2">No categories found.</div>
                    <Link href="categories/add">
                      <Button variant="default">+ Add New Category</Button>
                    </Link>
                  </div>
                )}
                {!loading && !error && categories.length > 0 && (
                  <>
                    <div className="overflow-x-auto rounded-lg border shadow bg-white">
                      <table className="min-w-full text-sm">
                        <thead>
                          <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
                            <th className="px-4 py-3 text-left font-semibold text-gray-700">#</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Logo</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Description</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categories.map((cat, idx) => (
                            <tr key={cat.id} className="hover:bg-blue-50 border-b transition group">
                              <td className="px-4 py-2 text-center text-gray-500">{(page - 1) * pageSize + idx + 1}</td>
                              <td className="px-4 py-2">
                                {cat.categoryLogo ? (
                                  <img
                                    src={cat.categoryLogo.startsWith('http') ? cat.categoryLogo : `http://localhost:8000/storage/${cat.categoryLogo}`}
                                    alt={cat.name}
                                    className="h-10 w-10 object-contain rounded-full border shadow-sm group-hover:scale-105 transition-transform"
                                  />
                                ) : (
                                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-300 text-blue-700 font-bold text-lg border shadow-sm group-hover:scale-105 transition-transform">
                                    {cat.name?.charAt(0).toUpperCase()}
                                  </div>
                                )}
                              </td>
                              <td
                                className="px-4 py-2 font-semibold text-gray-900 group-hover:text-blue-700 cursor-pointer underline underline-offset-2 hover:text-blue-800 focus:outline-none relative"
                                tabIndex={0}
                                role="button"
                                onClick={() => router.push(`/product/setting/categories/view/${cat.id}`)}
                                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') router.push(`/product/setting/categories/view/${cat.id}`); }}
                                aria-label={`View products for ${cat.name}`}
                              >
                                <span className="flex items-center gap-1">
                                  {cat.name}
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity ml-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    aria-hidden="true"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 13V19a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m5-1v6m0 0L10 21m8-8H14" />
                                  </svg>
                                </span>
                              </td>
                              <td className="px-4 py-2 text-gray-700">{cat.description}</td>
                              <td className="px-4 py-2 flex gap-2">
                                <Link href={`categories/view/${cat.id}`}><Button size="sm" variant="outline">View</Button></Link>
                                <Link href={`categories/edit/${cat.id}`}><Button size="sm" variant="secondary">Edit</Button></Link>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button size="sm" variant="destructive">Delete</Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete Category</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete <b>{cat.name}</b>? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction asChild>
                                        <Button size="sm" variant='destructive' onClick={() => handleDelete(cat.id)}>
                                          Delete
                                        </Button>
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
                    {/* Pagination */}
                    <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-2">
                      <div className="text-sm text-muted-foreground">Page {page} of {Math.ceil(total / pageSize)}</div>
                      <div className="flex gap-2 items-center">
                        <Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
                        <Button size="sm" variant="outline" disabled={page * pageSize >= total} onClick={() => setPage(page + 1)}>Next</Button>
                        <label htmlFor="pageSize" className="sr-only">Rows per page</label>
                        <select id="pageSize" className="border rounded px-2 py-1 text-sm" value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}>
                          {[5, 10, 20, 50].map(size => <option key={size} value={size}>{size} / page</option>)}
                        </select>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

          </div>
        </div>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  )
}
