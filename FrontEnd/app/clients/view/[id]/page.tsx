"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TopBar } from "@/components/top-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Edit, Trash2, Copy } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

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

export default function ClientViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const { toast } = useToast();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClient = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = Cookies.get("token");
        if (!token) {
          router.replace("/auth");
          return;
        }
        const response = await axios.get(`http://localhost:8000/api/client/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClient(response.data);
      } catch (err) {
        setError("Failed to fetch client details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchClient();
    }
  }, [id, router]);

  const handleDelete = async () => {
    try {
      const token = Cookies.get("token");
      await axios.delete(`http://localhost:8000/api/client/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({ title: "Success", description: "Client deleted successfully." });
      router.push("/clients");
    } catch (err) {
      toast({ title: "Error", description: "Failed to delete client.", variant: "destructive" });
      console.error(err);
    }
  };

  if (loading) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <TopBar title="Loading Client..." />
          <main className="flex flex-1 flex-col items-center justify-center p-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-lg text-muted-foreground">Loading client details...</p>
          </main>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  if (error) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <TopBar title="Error" />
          <main className="flex flex-1 flex-col items-center justify-center p-4">
            <p className="text-lg text-red-500">{error}</p>
            <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
          </main>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  if (!client) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <TopBar title="Client Not Found" />
          <main className="flex flex-1 flex-col items-center justify-center p-4">
            <p className="text-lg text-muted-foreground">Client details could not be loaded.</p>
            <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
          </main>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <TopBar title={`${client.firstName} ${client.lastName}`} />
        <main className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex flex-col gap-6 px-6">
            {/* Client Personal Details Card */}
            <div className="w-full p-4 border rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Contact & Basic Info</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
                {/* Left Column: Image */}
                <div className="flex justify-center items-center">
                  {client.attachment && typeof client.attachment === "string" ? (
                    <Image
                      src={client.attachment}
                      alt="Client Profile"
                      width={120}
                      height={120}
                      className="rounded-full object-cover border-2 border-primary shadow-md"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-4xl font-bold text-gray-500">
                      {client.firstName.charAt(0)}{client.lastName.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Center Column: Name and Code */}
                <div className="flex flex-col items-center justify-center text-center space-y-2">
                  <h3 className="text-xl font-bold">{client.firstName} {client.lastName}</h3>
                  {client.code && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Code: {client.code}</span>
                      <Button variant="ghost" size="sm" onClick={() => handleCopy(client.code, "Client Code")}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Right Column: Email, Phone, Address */}
                <div className="flex flex-col space-y-2">
                  {client.email && (
                    <div className="space-y-1">
                      <Label>Email</Label>
                      <div className="flex items-center justify-between p-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                        <span>{client.email}</span>
                        <Button variant="ghost" size="sm" onClick={() => handleCopy(client.email, "Email")}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                  {client.phone && (
                    <div className="space-y-1">
                      <Label>Phone</Label>
                      <div className="flex items-center justify-between p-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                        <span>{client.phone}</span>
                        <Button variant="ghost" size="sm" onClick={() => handleCopy(client.phone, "Phone")}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                  {(client.address1 || client.address2 || client.city || client.state || client.postalCode || client.country) && (
                    <div className="space-y-1">
                      <Label>Address</Label>
                      <div className="p-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                        {client.address1 && <span>{client.address1}<br/></span>}
                        {client.address2 && <span>{client.address2}<br/></span>}
                        {client.city && <span>{client.city}, </span>}
                        {client.state && <span>{client.state} </span>}
                        {client.postalCode && <span>{client.postalCode}<br/></span>}
                        {client.country && <span>{client.country}</span>}
                        <Button variant="ghost" size="sm" onClick={() => handleCopy(`${client.address1 || ''} ${client.address2 || ''} ${client.city || ''} ${client.state || ''} ${client.postalCode || ''} ${client.country || ''}`, "Address")}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            </Card>

            {/* Actions */}
            <div className="flex justify-end gap-2 px-6 pb-6">
              <Link href={`/client/edit/${client.id}`}>
                <Button variant="default">
                  <Edit className="mr-2 h-4 w-4" /> Edit Client
                </Button>
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete Client
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete client <strong>{client.firstName} {client.lastName}</strong>? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </main>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}
