import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

function PricingDetailsCard() {
  return (
    <Card className="border-2 rounded-xl shadow-md bg-white">
      <CardHeader className="bg-slate-100 border-0 p-4 mb-4 rounded-t-xl">
        <CardTitle className="text-lg">Pricing Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="sellingPrice">Selling Price</Label>
            <Input type="number" id="sellingPrice" name="sellingPrice" placeholder="Enter Selling Price" min="0" step="0.01" required className="focus:ring-2 focus:ring-primary" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="purchasePrice">Purchase Price</Label>
            <Input type="number" id="purchasePrice" name="purchasePrice" placeholder="Enter Purchase Price" min="0" step="0.01" required className="focus:ring-2 focus:ring-primary" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="tax">Tax (%)</Label>
            <Input type="number" id="tax" name="tax" placeholder="Enter Tax Percentage" min="0" step="0.01" className="focus:ring-2 focus:ring-primary" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="discount">Discount (%)</Label>
            <Input type="number" id="discount" name="discount" placeholder="Enter Discount Percentage" min="0" step="0.01" className="focus:ring-2 focus:ring-primary" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="profitMargin">Profit Margin (%)</Label>
            <Input type="number" id="profitMargin" name="profitMargin" placeholder="Enter Profit Margin" min="0" step="0.01" className="focus:ring-2 focus:ring-primary" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="additionalCharges">Additional Charges</Label>
            <Input type="number" id="additionalCharges" name="additionalCharges" placeholder="Enter Additional Charges" min="0" step="0.01" className="focus:ring-2 focus:ring-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PricingDetailsCard