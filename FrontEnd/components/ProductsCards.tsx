"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Helper type for synthetic event
const createSyntheticEvent = (name: string, value: string | string[]) => {
  return {
    target: { name, value }
  } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
};

type ProductFormType = {
  itemName: string;
  itemSKU: string;
  description: string;
  photoUpload: File | null;
  category: string;
  brand: string;
  barcode: string;
  purchasePrice: string;
  sellingPrice: string;
  minimumPrice: string;
  discount: string;
  discountType: string;
  tax: string;
  profitMargin: string;
  trackStock: boolean;
  currentStock: string;
  lowStockThreshold: string;
  internalNotes: string;
  status: string;
  tags: string[];
};

type ProductItemDetailsCardProps = {
  form: ProductFormType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  generateSKU: () => void;
  generateBarcode: () => void;
  categories: string[];
  brands: string[];
};

export function ProductItemDetailsCard({ form, handleChange, generateSKU, generateBarcode, categories, brands }: ProductItemDetailsCardProps) {
  return (
    <Card>
      <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
        <CardTitle className="text-lg">Item Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="itemName">Name</Label>
          <Input type="text" name="itemName" id="itemName" placeholder="Enter item name" value={form.itemName} onChange={handleChange} required />
        </div>
        <div className="flex gap-2 items-end">
          <div className="flex-1 relative">
            <Label htmlFor="itemSKU">SKU</Label>
            <div className="flex items-center border rounded-md bg-background px-2">
              <span className="text-muted-foreground mr-2">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4M8 3v4"/></svg>
              </span>
              <Input type="text" id="itemSKU" name="itemSKU" className="border-0 shadow-none px-0 bg-transparent focus:ring-0" value={form.itemSKU} readOnly />
              <button type="button" className="ml-2 p-1 rounded bg-muted hover:bg-accent transition-colors" onClick={generateSKU} title="Generate SKU">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 19 18 7M9 18l-3 3m9-15l3-3m-1 8h4m-2 2v-4"/><circle cx="12" cy="12" r="2"/></svg>
              </button>
            </div>
            <div className="text-xs text-muted-foreground mt-1 ml-1">Info: Click the button to auto-generate SKU</div>
          </div>
        </div>
        <div className="flex gap-2 items-end">
          <div className="flex-1 relative">
            <Label htmlFor="barcode">Barcode</Label>
            <div className="flex items-center border rounded-md bg-background px-2">
              <span className="text-muted-foreground mr-2">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M7 8v8M10 8v8M14 8v8M17 8v8"/></svg>
              </span>
              <Input type="text" name="barcode" id="barcode" className="border-0 shadow-none px-0 bg-transparent focus:ring-0" value={form.barcode} readOnly />
              <button type="button" className="ml-2 p-1 rounded bg-muted hover:bg-accent transition-colors" onClick={generateBarcode} title="Generate Barcode">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M7 8v8M10 8v8M14 8v8M17 8v8"/><path d="M12 8v8M8 12h8"/></svg>
              </button>
            </div>
            <div className="text-xs text-muted-foreground mt-1 ml-1">Info: Click the button to auto-generate Barcode</div>
          </div>
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea name="description" id="description" rows={2} placeholder="Enter item description" value={form.description} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="photoUpload">Photo</Label>
          <Input type="file" name="photoUpload" id="photoUpload" onChange={handleChange} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={form.category} onValueChange={v => handleChange(createSyntheticEvent("category", v))}>
              <SelectTrigger id="category">
                <SelectValue placeholder="--Select a Category--" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat: string) => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="brand">Brand</Label>
            <Select value={form.brand} onValueChange={v => handleChange(createSyntheticEvent("brand", v))}>
              <SelectTrigger id="brand">
                <SelectValue placeholder="--Select a Brand--" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand: string) => <SelectItem key={brand} value={brand}>{brand}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

type ProductPricingDetailsCardProps = {
  form: ProductFormType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  taxes: { id: number; tax_rate: number }[];
};

export function ProductPricingDetailsCard({ form, handleChange, taxes }: ProductPricingDetailsCardProps) {
  return (
    <Card>
      <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
        <CardTitle className="text-lg">Pricing Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="purchasePrice">Purchase Price</Label>
            <Input type="number" name="purchasePrice" id="purchasePrice" placeholder="Enter purchase price" value={form.purchasePrice} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="sellingPrice">Selling Price</Label>
            <Input type="number" name="sellingPrice" id="sellingPrice" placeholder="Enter selling price" value={form.sellingPrice} onChange={handleChange} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="minimumPrice">Minimum Price</Label>
            <Input type="number" name="minimumPrice" id="minimumPrice" placeholder="Enter minimum price" value={form.minimumPrice} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="discount">Discount</Label>
            <Input type="number" name="discount" id="discount" placeholder="Enter discount" value={form.discount} onChange={handleChange} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="discountType">Discount Type</Label>
            <Select value={form.discountType} onValueChange={v => handleChange(createSyntheticEvent("discountType", v))}>
              <SelectTrigger id="discountType">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Percentage">%</SelectItem>
                <SelectItem value="Fixed Amount">$</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="tax">Tax</Label>
            <Select value={form.tax} onValueChange={v => handleChange(createSyntheticEvent("tax", v))}>
              <SelectTrigger id="tax">
                <SelectValue placeholder="Select Tax" />
              </SelectTrigger>
              <SelectContent>
                {taxes.map((tax) => <SelectItem key={tax.id} value={tax.id.toString()}>{tax.tax_rate}%</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label htmlFor="profitMargin">Profit Margin</Label>
          <Input type="number" name="profitMargin" id="profitMargin" value={form.profitMargin} onChange={handleChange} />
        </div>
      </CardContent>
    </Card>
  );
}

type ProductInventoryCardProps = {
  form: ProductFormType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleTrackStockChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function ProductInventoryCard({ form, handleChange, handleTrackStockChange }: ProductInventoryCardProps) {
  return (
    <Card>
      <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
        <CardTitle className="text-lg">Inventory Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Input type="checkbox" name="trackStock" id="trackStock" checked={form.trackStock} onChange={handleTrackStockChange} className="w-4 h-4" />
          <Label htmlFor="trackStock" className="text-sm font-medium">Track Stock</Label>
        </div>
        {form.trackStock && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="currentStock">Current Stock</Label>
              <Input type="number" name="currentStock" id="currentStock" value={form.currentStock} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="lowStockThreshold">Low Stock Level
                <span className="ml-1 text-xs text-muted-foreground" title="You will get a low stock notification when product quantity is equal or under this number">❓</span>
              </Label>
              <Input type="number" name="lowStockThreshold" id="lowStockThreshold" value={form.lowStockThreshold} onChange={handleChange} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

type ProductMoreDetailsCardProps = {
  form: ProductFormType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  categories: string[];
};

export function ProductMoreDetailsCard({ form, handleChange, categories }: ProductMoreDetailsCardProps) {
  return (
    <Card>
      <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
        <CardTitle className="text-lg">More Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="internalNotes">Internal Notes</Label>
          <Textarea name="internalNotes" id="internalNotes" value={form.internalNotes} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={form.status} onValueChange={v => handleChange(createSyntheticEvent("status", v))}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="tags">Tags</Label>
            <Select value={form.tags[0] || ""} onValueChange={v => handleChange(createSyntheticEvent("tags", [v]))}>
              <SelectTrigger id="tags">
                <SelectValue placeholder="Select Tag(s)" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((tag: string) => <SelectItem key={tag} value={tag}>{tag}</SelectItem>)}
              </SelectContent>
            </Select>
            {/* For multi-select, a custom component or library is needed. This is a single-select fallback. */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
