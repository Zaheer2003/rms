"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PersonalInfoSection() {
  return (
    <Accordion type="single" collapsible className="w-full mt-6">
      <AccordionItem value="personal-info">
        <AccordionTrigger className="bg-blue-600 text-white font-semibold p-4 rounded-t-lg hover:bg-blue-700 hover:no-underline">
          <strong>Personal Information</strong>
        </AccordionTrigger>
        <AccordionContent className="bg-white p-6 shadow-md rounded-b-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* Date of Birth */}
            <div>
              <Label htmlFor="dob">
                Date of Birth <span className="text-red-500">*</span>
              </Label>
              <Input
                id="dob"
                type="date"
                name="dob"
                required
                className="mt-2"
              />
            </div>

            {/* Gender */}
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select name="gender" className="mt-2">
                <SelectTrigger>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Country */}
            <div>
              <Label htmlFor="country">
                Country <span className="text-red-500">*</span>
              </Label>
              <Select name="country" required className="mt-2">
                <SelectTrigger>
                  <SelectValue placeholder="Please Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sri Lanka">Sri Lanka</SelectItem>
                  {/* Add more countries here */}
                </SelectContent>
              </Select>
            </div>

            {/* Citizenship Status */}
            <div>
              <Label htmlFor="citizenshipStatus">Citizenship Status</Label>
              <Select name="citizenshipStatus" className="mt-2">
                <SelectTrigger>
                  <SelectValue placeholder="Please Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Citizen">Citizen</SelectItem>
                  <SelectItem value="Permanent Resident">
                    Permanent Resident
                  </SelectItem>
                  {/* Add more options here */}
                </SelectContent>
              </Select>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
