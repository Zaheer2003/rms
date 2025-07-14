"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function SupplierCard() {
  const [open, setOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [showNewSupplierForm, setShowNewSupplierForm] = useState(false);

  const suppliers = [
    { label: "Supplier 1", value: "supplier1" },
    { label: "Supplier 2", value: "supplier2" },
    { label: "Supplier 3", value: "supplier3" },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-4">
      {/* Header with Add New Supplier Button */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">Supplier Info</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowNewSupplierForm(!showNewSupplierForm)}
        >
          <Plus className="w-4 h-4 mr-1" />
          Add New Supplier
        </Button>
      </div>

      {/* Combo Box */}
      <div className="space-y-2">
        <Label>Select Supplier</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {selectedSupplier
                ? suppliers.find((s) => s.value === selectedSupplier)?.label
                : "Choose an existing supplier"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search suppliers..." />
              <CommandEmpty>No supplier found.</CommandEmpty>
              <CommandGroup>
                {suppliers.map((supplier) => (
                  <CommandItem
                    key={supplier.value}
                    value={supplier.value}
                    onSelect={() => {
                      setSelectedSupplier(supplier.value);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedSupplier === supplier.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {supplier.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Conditional New Supplier Form */}
      {showNewSupplierForm && (
        <div className="mt-4 border-t pt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="supplierName">Supplier Name</Label>
            <Input id="supplierName" placeholder="Enter full name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="supplierEmail">Email</Label>
            <Input id="supplierEmail" type="email" placeholder="Enter email address" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="supplierPhone">Phone</Label>
            <Input id="supplierPhone" placeholder="Enter phone number" />
          </div>

          <Button type="submit">Save Supplier</Button>
        </div>
      )}
    </div>
  );
}
