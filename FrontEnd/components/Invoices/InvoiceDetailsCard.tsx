"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Calendar } from "../ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { cn } from "@/lib/utils";

export function InvoiceDetailsCard() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Invoice Details</h2>

      {/* Invoice No */}
      <div className="flex items-center gap-2 mb-3">
        <Label htmlFor="invoiceNo" className="w-1/2">Invoice No:</Label>
        <Input id="invoiceNo" type="text" value="INV00001" readOnly className="w-1/2" />
      </div>

      {/* Invoice Date */}
      <div className="flex items-center gap-2 mb-3">
        <Label htmlFor="invoiceDate" className="w-1/2">Invoice Date:</Label>
        <Popover>
          <PopoverTrigger asChild>
            <button
              className={cn(
                "w-1/2 text-left font-normal bg-white border border-input rounded-md px-3 py-2 text-sm shadow-sm",
                !date && "text-muted-foreground"
              )}
            >
              {date ? format(date, "PPP") : <span>Pick a date</span>}
              <CalendarIcon className="ml-2 h-4 w-4 inline-block" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      {/* Payment Terms */}
      <div className="flex items-center gap-2">
        <Label htmlFor="paymentTerms" className="w-1/2">Payment Terms:</Label>
        <Input id="paymentTerms" type="text" placeholder="Enter payment terms" className="w-1/2" />
      </div>
    </div>
  );
}
