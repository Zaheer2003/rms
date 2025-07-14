import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import Image from 'next/image'

// Define a type for the form props
interface ClientForm {
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
  image?: File | null;
}

interface ClientDetailsCardProps {
  form: ClientForm;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSelectChange?: (name: string, value: string) => void;
}

function ClientDetailsCard({ form, onChange, onSelectChange }: ClientDetailsCardProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  const handleDropAreaClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
    if (onChange) onChange(e);
  };

  return (
    <Card>
        <CardHeader>
            <CardTitle>Client Details</CardTitle>
        </CardHeader>
        <CardContent>
            <div className='grid grid-cols-2 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                    <Label htmlFor='firstName'>First Name</Label>
                    <Input type='text' id='firstName' name='firstName' placeholder='Enter Client First Name' required value={form.firstName} onChange={onChange}/>
                </div>
                <div className='space-y-2'>
                    <Label htmlFor='lastName'>Last Name</Label>
                    <Input type='text' id='lastName' name='lastName' placeholder='Enter Client Last Name' required value={form.lastName} onChange={onChange}/>
                </div>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-2 gap-4 mt-4'>
                <div className='space-y-2'>
                    <Label htmlFor='nic'>NIC</Label>
                    <Input type='text' id='nic' name='nic' placeholder='Enter Client NIC' value={form.nic} onChange={onChange}/>
                </div>
                <div className='space-y-2'>
                    <Label htmlFor='dob'>Date of Birth</Label>
                    <Input
                        type='date'
                        id='dob'
                        name='dob'
                        value={form.dob || ''}
                        onChange={onChange}
                    />
                </div>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-2 gap-4 mt-4'>
                <div className='space-y-2'>
                    <Label htmlFor='phone'>Phone</Label>
                    <Input type='number' id='phone' name='phone' placeholder='Enter Client Phone Number' value={form.phone} onChange={onChange}/>
                </div>
                <div className='space-y-2'>
                    <Label htmlFor='mobile'>Mobile</Label>
                    <Input type='number' id='mobile' name='mobile' placeholder='Enter Client Mobile Number' value={form.mobile} onChange={onChange}/>
                </div>
            </div>
            <div className='space-y-2 mt-4'>
                <Label htmlFor='address1'>Address 1</Label>
                <Input type='text' id='address1' name='address1' placeholder='Enter Client Address' value={form.address1 || ''} onChange={onChange}/>
            </div>
            <div className='space-y-2 mt-4'>
                <Label htmlFor='address2'>Address 2</Label>
                <Input type='text' id='address2' name='address2' placeholder='Enter Client Address' value={form.address2 || ''} onChange={onChange}/>
            </div>
            <div className='grid grid-cols-3 md:grid-cols-3 gap-4 mt-4'>
                <div className='space-y-2'>
                    <Label htmlFor='city'>City</Label>
                    <Input type='text' id='city' name='city' placeholder='Enter Client City' value={form.city || ''} onChange={onChange}/>
                </div>
                <div className='space-y-2'>
                    <Label htmlFor='state'>State</Label>
                    <Input type='text' id='state' name='state' placeholder='Enter Client State' value={form.state || ''} onChange={onChange}/>
                </div>
                <div className='space-y-2'>
                    <Label htmlFor='postalCode'>Postal Code</Label>
                    <Input type='number' id='postalCode' name='postalCode' placeholder='Enter Client Postal Code' value={form.postalCode || ''} onChange={onChange}/>
                </div>
            </div>
            <div className='space-y-2 mt-4'>
                <Label htmlFor='country'>Country</Label>
                <Select value={form.country || ''} onValueChange={val => onSelectChange && onSelectChange('country', val)}>
                    <SelectTrigger id='country'>
                        <SelectValue placeholder="Select Client Country" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='sl'>Sri Lanka</SelectItem>
                        <SelectItem value='ind'>India</SelectItem>
                        <SelectItem value='qtr'>Qatar</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className='space-y-2 mt-4'>
                <Label htmlFor='image'>Image</Label>
                <div
                  className='border-2 border-dashed border-muted-foreground rounded-lg p-4 flex flex-col items-center cursor-pointer bg-muted/30 hover:bg-muted/50 transition'
                  onClick={handleDropAreaClick}
                >
                  <Input
                    type='file'
                    name='image'
                    id='image'
                    accept='image/*'
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                  {previewUrl && (
                    <Image src={previewUrl} alt='Preview' className='mt-2 rounded' width={200} height={128} style={{objectFit:'contain', maxHeight:'8rem'}} />
                  )}
                  <div className='text-sm text-muted-foreground'>Drop file here or <span className='underline text-primary'>Select your computer</span></div>
                </div>
              </div>
        </CardContent>
    </Card>
  )
}

export default ClientDetailsCard