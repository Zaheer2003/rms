import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Info } from 'lucide-react'
import { CheckedState } from '@radix-ui/react-checkbox'

function InventoryManagementCard() {
  const [trackStock, setTrackStock] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

  const handleTrackStockChange = (checked: CheckedState) => {
    setTrackStock(checked === true)
  }

  return (
    <Card className="border-2 rounded-xl shadow-md bg-white">
      <CardHeader className="bg-slate-100 border-0 p-4 mb-4 rounded-t-xl">
        <CardTitle>Inventory Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-2">
          <Checkbox className="w-4 h-4" checked={trackStock} onCheckedChange={handleTrackStockChange} id="trackStock" />
          <Label className="text-sm font-medium" htmlFor="trackStock">Track Stock</Label>
        </div>
        {trackStock && (
          <div className="mt-4">
            <div className="space-y-2 relative">
              <div className="flex items-center gap-1">
                <Label htmlFor="lowStock">Low Stock Threshold</Label>
                <span className="cursor-pointer" onMouseEnter={() => setShowInfo(true)} onMouseLeave={() => setShowInfo(false)}>
                  <Info className="w-4 h-4 text-muted-foreground" />
                </span>
              </div>
              <Input type="number" id="lowStock" name="lowStock" placeholder="Enter low stock threshold" min="0" />
              {showInfo && (
                <div className="absolute left-0 mt-1 bg-white border rounded shadow p-2 text-xs z-10 w-56">
                  The minimum stock level before you get a low stock alert.
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default InventoryManagementCard