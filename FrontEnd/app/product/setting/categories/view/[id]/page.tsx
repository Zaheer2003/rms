"use client";

import { AppSidebar } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

import Cookies from 'js-cookie';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Pencil, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface Category {
  id: number;
  name: string;
  description?: string;
  categoryLogo?: string;
}

export default function ViewCategory() {
  const params = useParams();
  const id = params?.id as string;
  const [category, setCategory] = useState<Category | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const token = Cookies.get('token');
        const res = await axios.get(`http://localhost:8000/api/categories/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategory(res.data);
      } catch (err) {
        setError('Failed to load category.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCategory();
  }, [id]);

  const handleEdit = () => {
    router.push(`/categories/edit/${id}`);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 px-4">
          <SidebarTrigger className="ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/categories">Categories</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">View</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 flex-col px-4 pt-0">
          <div className="px-4 py-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center w-full">
                  <Button
                    variant="outline"
                    onClick={() => router.back()}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-8 py-8">
                {loading ? (
                  <div className="flex flex-col items-center gap-4 text-gray-500">
                    <Image src="/loading.svg" alt="Loading" width={220} height={220} className="drop-shadow-lg" />
                    <span className="text-lg font-medium">Loading category...</span>
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center gap-4 text-red-500">
                    <Image src="/404 error.svg" alt="Error" width={180} height={180} className="drop-shadow-lg" />
                    <span className="text-lg font-medium">{error}</span>
                  </div>
                ) : category ? (
                  <div className="space-y-8">
                    {/* Attachment or Initial */}
                    <div className="flex items-center justify-center">
                      {category.categoryLogo ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" className="p-0 rounded-full hover:bg-blue-100">
                              <img
                                src={category.categoryLogo.startsWith('http') ? category.categoryLogo : `http://localhost:8000/storage/${category.categoryLogo}`}
                                alt={category.name}
                                className="h-24 w-24 object-contain rounded-full border shadow-md cursor-pointer"
                              />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="flex flex-col items-center">
                            <DialogTitle>
                              <VisuallyHidden>Category Image Preview</VisuallyHidden>
                            </DialogTitle>
                            <img
                              src={category.categoryLogo.startsWith('http') ? category.categoryLogo : `http://localhost:8000/storage/${category.categoryLogo}`}
                              alt={category.name}
                              className="max-h-[60vh] max-w-full object-contain rounded-xl border shadow-lg"
                            />
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <div className="h-24 w-24 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 text-4xl font-bold shadow">
                          {category.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    {/* Name (if any) */}
                    {category.name && (
                      <div className="text-2xl font-semibold text-gray-900 bg-blue-50 rounded-xl px-6 py-4 shadow-sm">
                        {category.name}
                      </div>
                    )}
                    {/* Description (if any) */}
                    {category.description && (
                      <div className="text-lg text-gray-700 bg-gray-50 rounded-xl px-6 py-4 shadow-sm">
                        {category.description}
                      </div>
                    )}
                    {/* Edit Button */}
                    <div className="flex justify-end">
                      <button
                        onClick={handleEdit}
                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-xl hover:from-green-600 hover:to-green-800 transition flex items-center gap-2 shadow-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-green-400"
                      >
                        <Pencil className="w-5 h-5" />
                        Edit Category
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4 text-gray-500">
                    <Image src="/Empty.svg" alt="No Data" width={220} height={220} className="drop-shadow-lg" />
                    <span className="text-xl font-medium">No category data found.</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
