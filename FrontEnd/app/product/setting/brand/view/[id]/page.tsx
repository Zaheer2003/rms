"use client"
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Pencil } from 'lucide-react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'


interface Brand {
  id: number;
  name: string;
  description?: string;
  brandLogo?: string;
}

export default function ViewBrand() {

  const params = useParams();
  const id = params?.id as string;
  const [brand, setBrand] = useState<Brand | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter()

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const token = Cookies.get('token');
        const res = await axios.get(`http://localhost:8000/api/brands/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        setBrand(res.data)
      } catch (err) {
        setError('Failed to load brand')

      } finally {
        setLoading(false)
      }
    };
    if (id) fetchBrand();
  }, [id]);




  return (
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset>
        <header className='flex h-16 items-center gap-2 px-4'>
          <SidebarTrigger className='ml-1' />
          <Separator orientation='vertical' className='mr-2 h-4'/>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>Brands</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink>View</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className='flex flex-1 flex-col px-4 pt-0'>
          <div className='px-4 py-6'>
            <Card>
              <CardHeader>
                <div className='flex justify-between items-center w-full'>
                  <Button
                    variant="outline"
                    onClick={() => router.back()}
                    className='flex items-center gap-2'
                  >
                    <ArrowLeft className="w-4 h-4"   />
                    Back
                  </Button>
                </div>
              </CardHeader>
              <CardContent className='sapce-y-8 py-8'>
                {loading ? (
                    <div className='flex flex-col items-center gap-4 text-gray-500 '>
                      <Image src="/loading.svg" alt='loading' width={220} height={220} className='drop-shadow-lg'/>
                      <span className="text-lg font-medium">Loading Brands....</span>
                    </div>
                ) : error ? (
                    <div className='flex flex-col items-center gap-4 text-red-500'>
                      <Image src="/404 error.svg" alt='Error' width={220} height={220} className='drop-shadow-lg'/>
                      <span className='text-lg font-medium'>{error}</span>
                    </div>
                ) : brand ? (
                  <div className='space-y-8'>
                    <div className='flex items-center justify-center'>
                      {brand.brandLogo ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" className='p-0 rounded-full hover:bg-blue-100'>
                              <Image
                                src={brand.brandLogo.startsWith('http') ? brand.brandLogo : `http://localhost:8000/storage/${brand.brandLogo}`}
                                alt={brand.name}
                                className='h-24 w-24 object-contain rounded-full border shadow-md cursor-pointer'
                              />
                            </Button>
                          </DialogTrigger>

                          <DialogContent className='flex flex-col items-center'>
                            <DialogTitle>
                              <VisuallyHidden>Image Preview</VisuallyHidden>
                            </DialogTitle>
                            <Image
                              src={brand.brandLogo.startsWith('http') ? brand.brandLogo : `http://localhost:8000/storage/${brand.brandLogo}`}
                              alt={brand.name}
                              className='max-h-[60vh] max-w-full object-contain rounded-xl border shadow-lg'
                            />
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <div className='h-24 w-24 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 text-4xl font-bold shadow'>
                          {brand.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      {brand.name && (
                        <div className='text-2xl font-semibold text-gray-900 bg-blue-50 rounded-xl px-6 py-4 shadow-sm'>
                          {brand.name}
                        </div>
                      )}
                      {brand.description && (
                        <div className="text-lg text-gray-700 bg-gray-50 rounded-xl px-6 py-4 shadow-sm">
                          {brand.description}
                        </div>
                      )}
                      <div className='flex justify-end'>
                        <Button
                        className='px-4 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-xl hover:from-green-600 hover:to-green-800 transition flex items-center gap-2 shadow-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-green-400'
                        >
                          <Pencil className='w-5 h-5'/>
                          Edit Brand
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4 text-gray-500">
                    <Image src="/Empty.svg" alt='No Data' width={220} height={220} className='drop-shadow-lg'/>
                    <span className="text-xl font-medium">No Brand Found</span>
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
