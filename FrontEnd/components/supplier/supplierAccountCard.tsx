// components/supplier/SupplierAccountCard.tsx
"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

type Props = {
  formData: any,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function SupplierAccountCard({ formData, handleChange }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Supplier Account</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Label htmlFor="supplierNumber">Client Number</Label>
          <Input type="number" id="supplierNumber" value={formData.supplierNumber} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" value={formData.email} onChange={handleChange} required />
        </div>
      </CardContent>
    </Card>
  )
}
