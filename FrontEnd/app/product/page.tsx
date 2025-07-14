"use client"

import { AppSidebar } from "@/components/app-sidebar";
import BackBtn from "@/components/backBtn";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";





export default function page() {




    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <header className="flex h-16 items-center gap-2 px-4 bg-background/80 border-b">
                    <SidebarTrigger className="ml-1"/>
                    <Separator orientation="vertical" className="mr-2 h-4 "/>  
                    <BackBtn/>
                       <Separator orientation="vertical" className="mr-8 h-12"/>
                        <h1 className="text-lg font-semibold tracking-tight">Manage Product Details</h1>
                </header>
                <main className="flex flex-col items-ceneter min-h-[60vh] p-8 bg-muted/50">
                    <Card>
                        <CardHeader >
                            <div className="flex justify-between items-center">
                            <CardTitle>
                                Filter Product Details
                            </CardTitle>
                            <Link href={'/product/add'}>
                                <Button>
                                    Add Product
                                </Button>
                            </Link>
                            </div>
                        </CardHeader>
                    </Card>
                    <Card className="mt-4">
                        <CardHeader >
                            <CardTitle>Avaialble Products</CardTitle>
                        </CardHeader>
                    </Card>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}