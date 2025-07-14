"use client"
import React from 'react'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs';

import { Toaster } from "@/components/ui/toaster";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    
      <html lang="en">
        <head>
          <title>Retail Management System</title>
          <link rel="icon" href="/favicon.ico" />
        </head>

        <body className='bg-muted/50'>
        <ClerkProvider>
          <main>{children}</main>
          <Toaster />
          </ClerkProvider>
        </body>
      </html>

  );
};
