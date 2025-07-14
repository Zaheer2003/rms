import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, AlertCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Brand {
  id: number;
  name: string;
  description?: string;
  brandLogo?: string;
}

interface BrandsCardProps {
  brands: Brand[];
  loading: boolean;
  error: string;
  page: number;
  pageSize: number;
  total: number;
  handleDownload: () => void;
  handleExcel: () => void;
  handlePDF: () => void;
  router: any;
}

export function BrandsCard({ brands, loading, error, page, pageSize, total, handleDownload, handleExcel, handlePDF, router }: BrandsCardProps) {
  return (
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
        {loading && <div className="py-8 text-center text-muted-foreground text-lg">Loading brands...</div>}
        {error && <div className="py-8 text-center text-red-600 text-lg">{error}</div>}
        {!loading && !error && brands.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-2" />
            <div className="text-muted-foreground mb-2">No brands found.</div>
            <Link href="brand/add">
              <Button variant="default">+ Add New Brand</Button>
            </Link>
          </div>
        )}
        {!loading && !error && brands.length > 0 && (
          <div className="overflow-x-auto rounded-lg border shadow bg-white mt-2">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">#</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Logo</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Description</th>
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
                      onClick={() => router.push(`/product/${brand.id}`)}
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
