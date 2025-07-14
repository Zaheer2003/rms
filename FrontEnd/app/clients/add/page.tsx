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
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { toast } from "@/hooks/use-toast"


import ClientDetailsCard from "@/components/Client/ClientDetailsCard"
import ClientAccountCard from "@/components/Client/clientAccountCard"
import ActionBtn from "@/components/Client/ActionBtn"
import { useRouter } from "next/navigation"

export default function Page() {
  // Form state for all fields
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    nic: '',
    dob: '',
    phone: '',
    mobile: '',
    code: '', // Will be set from backend
    email: '',
    currency: '',
    category: '',
    invoicingMethod: '',
    notes: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    image: null, // Changed from attachment to image
    // Add more fields as needed
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch next client code from backend on mount
  useEffect(() => {
    const fetchNextCode = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/clients/next-code', {
          headers: { Authorization: `Bearer ${Cookies.get('token')}` }
        });
        setForm((prev) => ({ ...prev, code: res.data.next_code.toString().padStart(5, '0') }));
      } catch (err) {
        setForm((prev) => ({ ...prev, code: '00001' }));
      }
    };
    fetchNextCode();
  }, []);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
    if (type === 'file') {
      setForm((prev) => ({ ...prev, [name]: files && files[0] ? files[0] : null }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle shadcn Select changes
  const handleSelectChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Validation function
  const validate = () => {
    const errors: string[] = [];
    if (!form.firstName.trim()) errors.push('First Name is required');
    if (!form.lastName.trim()) errors.push('Last Name is required');
    if (!form.code.trim()) errors.push('Code Number is required');
    if (!form.email.trim()) errors.push('Email is required');
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errors.push('Email is invalid');
    if (!form.currency) errors.push('Currency is required');
    if (!form.category) errors.push('Category is required');
    if (!form.invoicingMethod) errors.push('Invoicing Method is required');
    if (!form.country) errors.push('Country is required');
    // Add more as needed
    return errors;
  };

  // Handle Save (submit)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();
    if (errors.length > 0) {
      toast({ title: 'Validation Error', description: errors.join(', '), variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          // Use a type guard for File
          if (value && typeof value === 'object' && 'name' in value && 'size' in value && 'type' in value) {
            formData.append(key, value as Blob);
          } else {
            formData.append(key, String(value));
          }
        }
      });
      await axios.post('http://localhost:8000/api/clients', formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        },
      });
      toast({ title: 'Client added successfully!',
              description:'Client added successfully',
              variant:'default'
       });
      // Redirect to clients page after success
      router.push('/clients');
       
      // Optionally reset form or redirect
    } catch (err) {
      toast({ title: 'Error', description: err instanceof Error ? err.message : 'Failed to add client', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  // Handle Clear
  const handleClear = () => {
    setForm({
      firstName: '', lastName: '', nic: '', dob: '', phone: '', mobile: '', code: '00001', email: '', currency: '', category: '', invoicingMethod: '', notes: '', address1: '', address2: '', city: '', state: '', postalCode: '', country: '', image: null
    });
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Client</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="flex flex-col gap-4 p-6 pt-6 mt-2">
          <form onSubmit={handleSubmit}>
            <ActionBtn onSave={handleSubmit} onClear={handleClear} loading={loading} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <ClientDetailsCard form={form} onChange={handleChange} onSelectChange={handleSelectChange} />
              <ClientAccountCard form={form} onChange={handleChange} onSelectChange={handleSelectChange} />
            </div>
          </form>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
