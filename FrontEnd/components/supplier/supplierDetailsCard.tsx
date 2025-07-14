// components/supplier/SupplierDetailsCard.tsx
"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

type Props = {
  formData: any,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function SupplierDetailsCard({ formData, handleChange }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Supplier Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="">
          <Label htmlFor="businessName">Business Name</Label>
          <Input id="businessName" value={formData.businessName} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
      </CardContent>
    </Card>
  )
}
