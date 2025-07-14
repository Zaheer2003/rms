"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function AttendanceSection() {
  return (
    <Accordion type="single" collapsible className="w-full mt-6">
      <AccordionItem value="attendance-info">
        <AccordionTrigger className="bg-blue-600 text-white font-semibold p-4 rounded-t-lg hover:bg-blue-700 hover:no-underline">
          <strong>Attendance Information</strong>
        </AccordionTrigger>
        <AccordionContent className="bg-white shadow-lg rounded-b-lg p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Attendance Shift */}
            <div>
              <Label htmlFor="attendanceShift">Attendance Shift</Label>
              <Select id="attendanceShift" name="attendanceShift">
                <SelectTrigger>
                  <SelectValue placeholder="Select Attendance Shift" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning Shift</SelectItem>
                  <SelectItem value="night">Night Shift</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Leave Policy */}
            <div>
              <Label htmlFor="leavePolicy">Leave Policy</Label>
              <Select id="leavePolicy" name="leavePolicy">
                <SelectTrigger>
                  <SelectValue placeholder="Select Leave Policy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Leave Policy</SelectItem>
                  <SelectItem value="custom">Custom Leave Policy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Holiday Lists */}
            <div>
              <Label htmlFor="holidayLists">Holiday Lists</Label>
              <Select id="holidayLists" name="holidayLists">
                <SelectTrigger>
                  <SelectValue placeholder="Select Holiday List" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="national">National Holidays</SelectItem>
                  <SelectItem value="custom">Custom Holiday List</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Attendance Restrictions */}
            <div>
              <Label htmlFor="attendanceRestrictions">Attendance Restrictions</Label>
              <Select id="attendanceRestrictions" name="attendanceRestrictions">
                <SelectTrigger>
                  <SelectValue placeholder="Select Attendance Restriction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="geo">Geo Restriction</SelectItem>
                  <SelectItem value="ip">IP Restriction</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
