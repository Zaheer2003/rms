"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type DOBPickerProps = {
  value?: Date
  onChange?: (date: Date | undefined) => void
}

export function DOBPicker({ value, onChange }: DOBPickerProps) {
  // Use a simple input type="date" for now
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="dob" className="px-1 font-medium text-gray-700">
        Date of Birth
      </Label>
      <Input
        id="dob"
        type="date"
        value={value ? value.toISOString().substring(0, 10) : ''}
        onChange={e => {
          const val = e.target.value
          onChange?.(val ? new Date(val) : undefined)
        }}
        className="w-52"
      />
    </div>
  )
}
