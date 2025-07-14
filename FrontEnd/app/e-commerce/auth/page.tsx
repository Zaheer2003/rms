"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import  { useState } from 'react'

export default function page() {

    const [isRegistering, setIsRegistering ] = useState(true);

  return (
   <section className='min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-background text-foreground p-4'>
    <Card className='w-full max-w-md rounded-2xl shadow-xl border-2 border-primary/10'>
        <CardHeader>
            <CardTitle className='text-2xl font-bold text-center'>
                {isRegistering ? "Create Your Account" : "Login"}
            </CardTitle>
        </CardHeader>
        <CardContent>

        </CardContent>
    </Card>
   </section>
  )
}
