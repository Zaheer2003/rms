"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ContactInfoSection() {
  return (
    <Accordion type="single" collapsible className="w-full mt-6">
      <AccordionItem value="contact-info">
        <AccordionTrigger className="bg-blue-600 text-white font-semibold p-4 rounded-t-lg hover:bg-blue-700 hover:no-underline">
          <strong>Contact Information</strong>
        </AccordionTrigger>
        <AccordionContent className="bg-white p-6 shadow-md rounded-b-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* Mobile Number */}
            <div>
              <Label htmlFor="mobileNumber">
                Mobile Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="mobileNumber"
                name="mobileNumber"
                type="tel"
                required
                placeholder="Enter Mobile Number"
                className="mt-2"
              />
            </div>

            {/* WhatsApp Number */}
            <div>
              <Label htmlFor="whatsappNumber">
                WhatsApp Number
              </Label>
              <Input
                id="whatsappNumber"
                name="whatsappNumber"
                type="tel"
                placeholder="Enter WhatsApp Number"
                className="mt-2"
              />
            </div>

            {/* Personal Email */}
            <div>
              <Label htmlFor="personalEmail">
                Personal Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="personalEmail"
                name="personalEmail"
                type="email"
                required
                placeholder="Enter Personal Email"
                className="mt-2"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
