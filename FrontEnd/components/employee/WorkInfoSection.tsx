"use client";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/datepicker";

export function JobInfoSection() {
  return (
    <Accordion type="single" collapsible className="w-full mt-6">
      <AccordionItem value="job-info">
        <AccordionTrigger className="bg-blue-600 text-white font-semibold p-4 rounded-t-lg hover:bg-blue-700 hover:no-underline">
          <strong>Job Information</strong>
        </AccordionTrigger>
        <AccordionContent className="bg-white p-6 shadow-md rounded-b-lg">
          <div className="space-y-6">

            {/* Designation and Department */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="designation">
                  Designation <span className="text-red-500">*</span>
                </Label>
                <Select id="designation" name="designation" required className="mt-2">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Designation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Developer">Developer</SelectItem>
                    <SelectItem value="Designer">Designer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="department">
                  Department <span className="text-red-500">*</span>
                </Label>
                <Select id="department" name="department" required className="mt-2">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Employment Type and Employment Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="employmentType">
                  Employment Type <span className="text-red-500">*</span>
                </Label>
                <Select id="employmentType" name="employmentType" required className="mt-2">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Employment Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-Time">Full-Time</SelectItem>
                    <SelectItem value="Part-Time">Part-Time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Intern">Intern</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="employmentLevel">
                  Employment Level <span className="text-red-500">*</span>
                </Label>
                <Select id="employmentLevel" name="employmentLevel" required className="mt-2">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Employment Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Junior">Junior</SelectItem>
                    <SelectItem value="Mid">Mid</SelectItem>
                    <SelectItem value="Senior">Senior</SelectItem>
                    <SelectItem value="Executive">Executive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Join Date and Branch */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="joinDate">
                  Join Date <span className="text-red-500">*</span>
                </Label>
                <DatePicker id="joinDate" name="joinDate" required className="mt-2" />
              </div>

              <div>
                <Label htmlFor="branch">
                  Branch <span className="text-red-500">*</span>
                </Label>
                <Select id="branch" name="branch" required className="mt-2">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Main Branch">Main Branch</SelectItem>
                    <SelectItem value="Secondary Branch">Secondary Branch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
