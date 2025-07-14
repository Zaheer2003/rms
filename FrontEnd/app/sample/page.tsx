"use client"
import { AppSidebar } from '@/components/app-sidebar'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar'
import {useState}  from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { toast } from 'sonner'

export default function page() {
    const [formData, setFormData] = useState({ firstName:"", lastName:""})
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("") 

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value})
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");
        setError("");

        try {
            
            const token = Cookies.get("token");
            if (!token) {
                setError("You must be");
                setLoading(false);
                return;
            }
            await axios.post(
                "http://localhost:8000/api/sample",
                {
                    firstName: formData.firstName,
                    lastName: formData.lastName
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSuccess("Dat Submited");
            toast({
                title: "Success",
                description: " Data Submited",
                variant: "default",
            });

            setFormData({ firstName:"", lastName:""});
        } catch (error) {
            setError("An error")
        } finally {
            setLoading(false)
        }
    };

  return (
    <SidebarProvider>
        <AppSidebar/>
        <SidebarInset>
            <header className='flex h-16 items-center gap-2'>
                <div className='flex items-center gap-2 px-4'>
                    <SidebarTrigger className='-ml-1'/>
                    <Separator orientation='vertical' className='mr-2 h-A4'/>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className='hidden md:block'>
                                <BreadcrumbLink>Sample Form</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>

            <div>
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Sample Form</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <div className='grid grid-cols-2 gap-4 mt-2'>
                                    <div>
                                        <Label
                                         htmlFor='firstName'>
                                            First Name
                                        </Label>
                                        <Input
                                         type='text' 
                                         placeholder='First Name'
                                         value={formData.firstName}
                                         onChange={handleChange}
                                         className='mt-2' 
                                         required />
                                    </div>
                                    <div>
                                        <Label
                                         htmlFor='lastName'>
                                            Last Name
                                        </Label>
                                        <Input
                                        type='text'
                                        placeholder='Last Name'
                                        value={formData.lastName}
                                        onChange={handleChange} 
                                        className='mt-2' 
                                        required />
                                    </div>
                                </div>
                            </form>
                            <div className='mt-4 flex gap-2'>
                                <Button
                                 type='submit' 
                                 disabled={loading}>{loading ? "Saving..." : "Save"}
                                 </Button>

                                <Button 
                                type='reset' 
                                variant={'outline'} 
                                onClick={() => {
                                    setFormData({firstName:"", lastName:""})
                                    setError("")
                                    setSuccess("")
                                }}></Button>
                            </div>
                            {success && (
                                <p className='mt-2 text-sm text-green-600' aria-live='polite'>
                                    {success}
                                </p>
                            )}
                            { error && (
                                <p className='mt-2 text-sm text-red-600' aria-live='polite'>
                                    {error}
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

        </SidebarInset>
    </SidebarProvider>
  )
}
