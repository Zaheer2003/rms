"use client";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export function AddressInfoSection() {
  return (
    <Accordion type="single" collapsible className="w-full mt-6">
      <AccordionItem value="address-info">
        <AccordionTrigger className="bg-blue-600 text-white font-semibold p-4 rounded-t-lg hover:bg-blue-700 hover:no-underline">
          <strong>Address Information</strong>
        </AccordionTrigger>
        <AccordionContent className="bg-white shadow-lg rounded-b-lg p-6">
          <div className="space-y-6">
            {/* Address Line 1 */}
            <div className="mb-6">
              <Label htmlFor="addressLine1">
                Address Line 1 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="addressLine1"
                name="addressLine1"
                required
                placeholder="Enter Address Line 1"
              />
            </div>

            {/* Address Line 2 */}
            <div className="mb-6">
              <Label htmlFor="addressLine2">
                Address Line 2
              </Label>
              <Input
                id="addressLine2"
                name="addressLine2"
                placeholder="Enter Address Line 2"
              />
            </div>

            {/* City and Postal Code in one row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="city">
                  City <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="city"
                  name="city"
                  required
                  placeholder="Enter City"
                />
              </div>

              <div>
                <Label htmlFor="postalCode">
                  Postal Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  required
                  placeholder="Enter Postal Code"
                  type="text"
                />
              </div>
            </div>

            {/* Country and State/Province in one row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="country">
                  Country <span className="text-red-500">*</span>
                </Label>
                <Select name="country" id="country" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Please Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sri Lanka">Sri Lanka</SelectItem>
                    <SelectItem value="India">India</SelectItem>
                    <SelectItem value="USA">USA</SelectItem>
                    {/* Add more countries as needed */}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="state">
                  State/Province
                </Label>
                <Input
                  id="state"
                  name="state"
                  placeholder="Enter State/Province"
                />
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
