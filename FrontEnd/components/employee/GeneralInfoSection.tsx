"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { ContactInfoSection } from "./ContactInfoSection";
import { AddressInfoSection } from "./AddressInfoSection";
import { JobInfoSection } from "./WorkInfoSection";
import { FiscalDateSection } from "./FiscalInfoSection"
import { AttendanceSection } from "./AttendenceInfoSection";

export function GeneralInfoSection() {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Add logic for form submission
    console.log("Form submitted");
  };

  const [allowAccess, setAllowAccess] = useState(false);
  const [sendCredentials, setSendCredentials] = useState(false);

  return (
    
    <div className="bg-white shadow-lg rounded-lg">
        <form onSubmit={handleSubmit}>
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <h3 className="text-xl font-semibold">General Information</h3>
      </div>

      <div className="p-6">
        
        {/* Username, Surname, Middle Name */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="firstName">Username (First Name) <span className="text-red-500">*</span></Label>
            <Input id="firstName" name="firstName" required placeholder="Enter Username" />
          </div>
          <div>
            <Label htmlFor="surname">Surname <span className="text-red-500">*</span></Label>
            <Input id="surname" name="surname" required placeholder="Enter Surname" />
          </div>
          <div>
            <Label htmlFor="middleName">Middle Name</Label>
            <Input id="middleName" name="middleName" placeholder="Enter Middle Name" />
          </div>
        </div>

        {/* Picture & Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <Label htmlFor="employeePicture">Employee Picture <span className="text-red-500">*</span></Label>
            <Input id="employeePicture" name="employeePicture" type="file" required />
          </div>
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" name="notes" placeholder="Add notes here" />
          </div>
        </div>

        {/* Email & Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" name="email" type="email" placeholder="Enter Email" required />
          </div>
          <div>
            <Label htmlFor="status">Status <span className="text-red-500">*</span></Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Access Checkboxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="flex items-center gap-2">
            <Checkbox
              id="allowAccess"
              checked={allowAccess}
              onCheckedChange={(value) => setAllowAccess(!!value)}
            />
            <Label htmlFor="allowAccess">Allow access to the system</Label>
          </div>

          {allowAccess && (
            <div className="flex items-center gap-2">
              <Checkbox
                id="sendCredentials"
                checked={sendCredentials}
                onCheckedChange={(value) => setSendCredentials(!!value)}
              />
              <Label htmlFor="sendCredentials">Send credentials to employee</Label>
            </div>
          )}
        </div>

        {/* Role (no Language) */}
        {allowAccess && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <Label htmlFor="role">Role <span className="text-red-500">*</span></Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Employee">Employee</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

          <PersonalInfoSection />

          <ContactInfoSection />

          <AddressInfoSection />
          
          <JobInfoSection />

          <FiscalDateSection />

          < AttendanceSection />
      </div>
      <div className="mt-6 flex justify-center items-center p-3">
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </div>
    </form>
    </div>
  );
}
