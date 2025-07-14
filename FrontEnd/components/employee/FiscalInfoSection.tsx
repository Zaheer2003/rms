"use client";

import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function FiscalDateSection() {
  const [fiscalType, setFiscalType] = useState("default");

  return (
    <Accordion type="single" collapsible className="w-full mt-6">
      <AccordionItem value="fiscal-date">
        <AccordionTrigger className="bg-blue-600 text-white font-semibold p-4 rounded-t-lg hover:bg-blue-700 hover:no-underline">
          <strong>Fiscal Year Start</strong>
        </AccordionTrigger>
        <AccordionContent className="bg-white shadow-lg rounded-b-lg p-6">
          <div className="space-y-6">

            {/* Radio Selection */}
            <div>
              <Label>Fiscal Start</Label>
              <RadioGroup
                defaultValue="default"
                onValueChange={(val) => setFiscalType(val)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="default" id="default" />
                  <Label htmlFor="default">Use Default Fiscal Date</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="custom" />
                  <Label htmlFor="custom">Custom Fiscal Date</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Conditional Custom Fields */}
            {fiscalType === "custom" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Month */}
                <div>
                  <Label>Month</Label>
                  <Select name="fiscalMonth" className="mt-2">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                      ].map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Day */}
                <div>
                  <Label htmlFor="fiscalDay">Day</Label>
                  <Input
                    id="fiscalDay"
                    name="fiscalDay"
                    type="number"
                    min={1}
                    max={31}
                    placeholder="Enter Day"
                    className="mt-2"
                  />
                </div>
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
