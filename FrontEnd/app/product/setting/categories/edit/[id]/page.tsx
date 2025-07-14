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
import { Toaster} from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';

interface Category {
  id: number;
  name: string;
  description?: string;
  categoryLogo?: string;
}

export default function EditCategory() {
  const params = useParams();
  const id = params?.id as string;
  const [category, setCategory] = useState<Category | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryLogo, setCategoryLogo] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

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
        setName(res.data.name || '');
        setDescription(res.data.description || '');
        setCategoryLogo(res.data.categoryLogo || null);
      } catch (err) {
        setError('Failed to load category.');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCategory();
  }, [id]);

  const handleBack = () => router.back();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const token = Cookies.get('token');
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      if (imageFile) {
        formData.append('attachment', imageFile);
      }
      // Only send categoryLogo if not uploading a new file and it exists
      if (!imageFile && categoryLogo) {
        formData.append('categoryLogo', categoryLogo);
      }
      await axios.post(`http://localhost:8000/api/categories/${id}?_method=PUT`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast({ title: 'Success', description: 'Category updated successfully', variant: 'default' });
      router.push('/product/setting/categories');
    } catch (err) {
      setError('Failed to update category.');
      toast({ title: 'Error', description: 'Failed to update category', variant: 'destructive' });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setCategoryLogo(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
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
                <BreadcrumbLink href="#">Edit</BreadcrumbLink>
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
                    onClick={handleBack}
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
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Logo or Initial */}
                    <div className="flex flex-col items-center justify-center gap-4">
                      {categoryLogo ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" className="p-0 rounded-full hover:bg-blue-100">
                              <img
                                src={categoryLogo.startsWith('http') || categoryLogo.startsWith('data:') ? categoryLogo : `http://localhost:8000/storage/${categoryLogo}`}
                                alt={name}
                                className="h-24 w-24 object-contain rounded-full border shadow-md cursor-pointer"
                              />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="flex flex-col items-center">
                            <DialogTitle>
                              <VisuallyHidden>Category Image Preview</VisuallyHidden>
                            </DialogTitle>
                            <img
                              src={categoryLogo.startsWith('http') || categoryLogo.startsWith('data:') ? categoryLogo : `http://localhost:8000/storage/${categoryLogo}`}
                              alt={name}
                              className="max-h-[60vh] max-w-full object-contain rounded-xl border shadow-lg"
                            />
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <div className="h-24 w-24 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 text-4xl font-bold shadow">
                          {name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>
                    {/* Name */}
                    <div>
                      <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Category Name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 text-lg"
                        required
                      />
                    </div>
                    {/* Description */}
                    <div>
                      <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Description"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 text-lg min-h-[100px]"
                      />
                    </div>
                    {/* Logo URL */}
                    <div>
                      <input
                        type="text"
                        value={categoryLogo || ''}
                        onChange={e => setCategoryLogo(e.target.value)}
                        placeholder="Logo URL (optional)"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 text-lg"
                      />
                    </div>
                    {/* Submit Button */}
                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-xl hover:from-green-600 hover:to-green-800 transition flex items-center gap-3 shadow-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-green-400 border-0"
                      >
                        <Pencil className="w-5 h-5" />
                        Update Category
                      </Button>
                    </div>
                  </form>
                ) : null}
              </CardContent>
            </Card>
          </div>
        </div>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}