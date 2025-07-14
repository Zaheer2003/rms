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
import { Download, FileSpreadsheet } from 'lucide-react';
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

interface Brand {
  id: number;
  name: string;
  description?: string;
  brandLogo?: string;
}

export default function Page() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  // Fetch brands with pagination
  const fetchBrands = async (pageNum = 1, size = 10) => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      const response = await axios.get(`http://localhost:8000/api/brands?page=${pageNum}&pageSize=${size}`,
        { headers: { Authorization: `Bearer ${token}` } });
      setBrands(response.data.data || response.data); // support both paginated and array
      setTotal(response.data.total || response.data.length);
    } catch {
      setError("Failed to load brands.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands(page, pageSize);
  }, [page, pageSize]);

  const handleFilter = () => {
    setBrands(prev => prev.filter(b => b.name.toLowerCase().includes(search.toLowerCase())));
  };

  const handleResetFilter = () => {
    setSearch("");
    setLoading(true);
    setError("");
    // re-fetch brands
    fetchBrands();
  };

  const handleDelete = async (id: number) => {
    try {
      const token = Cookies.get("token");
      await axios.delete(`http://localhost:8000/api/brands/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBrands(prev => prev.filter(b => b.id !== id));
      setTotal(t => t - 1);
      toast.success("Brand deleted successfully.");
    } catch {
      setError("Failed to delete brand.");
      toast.error("Failed to delete brand.");
    }
  };

  const handleDownload = () => {
    // Download as CSV
    const csv = [
      ["#", "Name", "Description"],
      ...brands.map((b, i) => [i + 1, b.name, b.description || ""])
    ].map(row => row.map(String).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "brands.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExcel = async () => {
    // Download as Excel (simple xlsx)
    const xlsxRows = [
      ["#", "Name", "Description"],
      ...brands.map((b, i) => [i + 1, b.name, b.description || ""])
    ];
    const XLSX = await import("xlsx");
    const ws = XLSX.utils.aoa_to_sheet(xlsxRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Brands");
    XLSX.writeFile(wb, "brands.xlsx");
  };

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.text("Brands List", 14, 16);
    autoTable(doc, {
      startY: 24,
      head: [["#", "Name", "Description"]],
      body: brands.map((b, i) => [i + 1, b.name, b.description || ""]),
    });
    doc.save("brands.pdf");
  };

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
                    <BreadcrumbLink href="#">Brand</BreadcrumbLink>
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
                  <CardTitle>Filter Brands</CardTitle>
                  <Link href="brand/add">
                    <Button variant="default" className="mt-4">+ Add New Brand</Button>
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

            {/* Card 2 - Available Brands */}
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <CardTitle className="text-xl font-bold tracking-tight text-gray-800">Available Brands</CardTitle>
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
                    <Image src="/loading.svg" alt="Loading" width={300} height={300} className="mb-2"/>
                    <div className="text-muted-foreground text-lg">Loading Brands......</div>
                  </div>
                )}
                {error && (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Image src="/404 error.svg" alt="error" width={300} height={300} className="mb-2"/>
                    <div className="text-red-600 text-lg">{error}</div>
                  </div>
                )}
                {!loading && !error && brands.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Image src="/Empty.svg" alt="No Data" height={300} width={300} className=""/>
                    <div className="text-muted-foreground mb-2">No Brands found.</div>
                    <Link href="brand/add">
                        <Button> + Add New Brand</Button>
                    </Link>
                  </div>
                )}
                {!loading && !error && brands.length > 0 && (
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
                          {brands.map((brand, idx) => (
                            <tr key={brand.id} className="hover:bg-blue-50 border-b transition group">
                              <td className="px-4 py-2 text-center text-gray-500">{(page - 1) * pageSize + idx + 1}</td>
                              <td className="px-4 py-2">
                                {brand.brandLogo ? (
                                  <img
                                    src={brand.brandLogo.startsWith('http') ? brand.brandLogo : `http://localhost:8000/storage/${brand.brandLogo}`}
                                    alt={brand.name}
                                    className="h-10 w-10 object-contain rounded-full border shadow-sm group-hover:scale-105 transition-transform"
                                  />
                                ) : (
                                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-300 text-blue-700 font-bold text-lg border shadow-sm group-hover:scale-105 transition-transform">
                                    {brand.name?.charAt(0).toUpperCase()}
                                  </div>
                                )}
                              </td>
                              <td
                                className="px-4 py-2 font-semibold text-gray-900 group-hover:text-blue-700 cursor-pointer underline underline-offset-2 hover:text-blue-800 focus:outline-none relative"
                                tabIndex={0}
                                role="button"
                                onClick={() => router.push(`/product/setting/brand/view/${brand.id}`)}
                                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') router.push(`/product/${brand.id}`); }}
                                aria-label={`View products for ${brand.name}`}
                              >
                                <span className="flex items-center gap-1">
                                  {brand.name}
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
                              <td className="px-4 py-2 text-gray-700">{brand.description}</td>
                              <td className="px-4 py-2 flex gap-2">
                                <Link href={`brand/view/${brand.id}`}><Button size="sm" variant="outline">View</Button></Link>
                                <Link href={`brand/edit/${brand.id}`}><Button size="sm" variant="secondary">Edit</Button></Link>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button size="sm" variant="destructive">Delete</Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete Brand</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete <b>{brand.name}</b>? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction asChild>
                                        <Button size="sm" variant="destructive" onClick={() => handleDelete(brand.id)}>
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
      </SidebarInset>
    </SidebarProvider>
  )
}