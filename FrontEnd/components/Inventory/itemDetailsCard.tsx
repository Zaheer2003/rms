import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { UploadCloud } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '../ui/button'

function ItemDetailsCard() {
  // Simulate fetching the next SKU (in real app, fetch from backend)
  const [sku, setSku] = useState('00001')

  // Real: Available brands and categories from API
  const [brands, setBrands] = useState<string[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [newBrand, setNewBrand] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [barcode, setBarcode] = useState("");


  useEffect(() => {
    if (sku) {
      setBarcode(`${sku}-${Date.now()}`);
    }
  },[sku]);

  const handleGenerateBarcode = () => {
    setBarcode(`${sku}-${Date.now()}`);
  };


  useEffect(() => {
    const fetchBrandsAndCategories = async () => {
      try {
        const token = Cookies.get('token')
        const [brandsRes, categoriesRes] = await Promise.all([
          axios.get('http://localhost:8000/api/brands', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('http://localhost:8000/api/categories', { headers: { Authorization: `Bearer ${token}` } })
        ])
        setBrands((brandsRes.data.data || brandsRes.data).map((b: any) => b.name))
        setCategories((categoriesRes.data.data || categoriesRes.data).map((c: any) => c.name))
      } catch (err) {
        // fallback: do nothing or set error
      }
    }
    fetchBrandsAndCategories()
  }, [])

  



  const handleGenerateSKU = () => {
    // Simulate incrementing SKU (pad to 5 digits)
    setSku(prev => {
      const next = (parseInt(prev, 10) + 1).toString().padStart(5, '0')
      return next
    })
  }

  const handleAddBrand = () => {
    const value = newBrand.trim()
    if (value && !brands.includes(value)) {
      setBrands([...brands, value])
      setSelectedBrand(value)
      setNewBrand('')
    }
  }
  const handleAddCategory = () => {
    const value = newCategory.trim()
    if (value && !categories.includes(value)) {
      setCategories([...categories, value])
      setSelectedCategory(value)
      setNewCategory('')
    }
  }

  return (
    <Card className="border-2 rounded-xl shadow-md bg-white">
      <CardHeader className="bg-slate-100 border-0 p-4 mb-4 rounded-t-xl">
        <CardTitle className="text-lg">Item Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="itemName">Item Name</Label>
            <Input type="text" id="itemName" name="itemName" placeholder="Enter Item Name" required className="focus:ring-2 focus:ring-primary" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="itemSKU">Item SKU</Label>
            <div className="flex items-center gap-2">
              <Input type="text" id="itemSKU" name="itemSKU" value={sku} readOnly className="focus:ring-2 focus:ring-primary bg-gray-100 cursor-not-allowed" />
              <Button type="button" variant="outline" onClick={handleGenerateSKU} className="p-2" title="Generate Next SKU">Auto</Button>
            </div>
            <div className="text-xs text-muted-foreground mt-1">SKU is auto-generated and unique.</div>
          </div>
        </div>
        <div className="space-y-2 mt-4">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="Enter Item About" className="w-full focus:ring-2 focus:ring-primary" />
        </div>
        <div className="space-y-2 mt-4">
          <Label htmlFor="photo">Photo</Label>
          <div className="border-2 border-dashed border-muted-foreground rounded-lg p-4 flex flex-col items-center cursor-pointer bg-muted/30 hover:bg-muted/50 transition">
            <UploadCloud className="w-8 h-8 text-primary mb-2" />
            <div className="text-sm text-muted-foreground">Drop file here or <span className="underline text-primary">Select your computer</span></div>
            <Input type="file" name="photo" className="hidden" title="select item photo" placeholder="Select Item Photo" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="brand">Brand</Label>
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger id="brand">
                <SelectValue placeholder="Select or add a brand" />
              </SelectTrigger>
              <SelectContent>
                {brands.map(brand => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
                <div className="flex gap-2 p-2 border-t mt-2 bg-slate-50">
                  <Input type="text" value={newBrand} onChange={e => setNewBrand(e.target.value)} placeholder="Add new brand" className="flex-1 h-7 text-xs" />
                  <Button type="button" onClick={handleAddBrand} variant="outline" className="px-2 py-1 text-xs">Add</Button>
                </div>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select or add a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
                <div className="flex gap-2 p-2 border-t mt-2 bg-slate-50">
                  <Input type="text" value={newCategory} onChange={e => setNewCategory(e.target.value)} placeholder="Add new category" className="flex-1 h-7 text-xs" />
                  <Button type="button" onClick={handleAddCategory} variant="outline" className="px-2 py-1 text-xs">Add</Button>
                </div>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-2 items-end mt-4">
          <div className="flex-1 relative space-y-2">
            <Label htmlFor="barcode">Barcode</Label>
            <div className="flex items-center border rounded-md bg-background px-2">
              <span className="text-muted-foreground mr-2">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M7 8v8M10 8v8M14 8v8M17 8v8"/></svg>
              </span>
              <Input type="text" name="barcode" id="barcode" value={barcode} className="border-0 shadow-none px-0 bg-transparent focus:ring-0" readOnly />
              <Button type="button" variant="outline" className="ml-2 p-2 rounded bg-muted hover:bg-accent transition-colors border-0" title="Genarate Barcode" onClick={handleGenerateBarcode}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M7 8v8M10 8v8M14 8v8M17 8v8"/><path d="M12 8v8M8 12h8"/></svg>
              </Button>
            </div>
            <div></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ItemDetailsCard