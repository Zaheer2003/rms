"use client"

import { AppSidebar } from "@/components/app-sidebar"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { CalendarIcon, ChevronDown } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import BackBtn from "@/components/backBtn"

export default function Page() {
  const [advanced, setAdvanced] = useState(false)
const [openDate, setOpenDate] = useState<Date | undefined>()
const [closeDate, setCloseDate] = useState<Date | undefined>()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 items-center gap-2 px-4 bg-background/80 border-b">
          <SidebarTrigger className="-ml-1"/>
          <Separator orientation="vertical" className="mr-2 h-6"/>
          <BackBtn/>
          <Separator orientation="vertical" className="mr-2"/>
          <h1 className="text-lg font-semibold tracking-tight">Manage POS Details</h1>
        </header>

        {/* Main Content */}
        <main className="flex flex-1 flex-col gap-4  min-h-[60vh] p-4 bg-muted/50">
         

<Card>
  <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
    <CardTitle className="text-lg font-semibold">Search POS Sessions</CardTitle>
    <Button variant="default" className="flex items-center gap-2">
      <PlusCircle className="w-5 h-5" />
      Add New Session
    </Button>
  </CardHeader>

  <CardContent>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div>
        <Label htmlFor="device">Device</Label>
        <Select>
          <SelectTrigger id="device">
            <SelectValue placeholder="Select Device" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="anyPosDevice">Any POS Device</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="shift">Shift</Label>
        <Select>
          <SelectTrigger id="shift">
            <SelectValue placeholder="Select Shift" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="morning">Morning</SelectItem>
            <SelectItem value="afternoon">Afternoon</SelectItem>
            <SelectItem value="evening">Evening</SelectItem>
            <SelectItem value="night">Night</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="status">Status</Label>
        <Select>
          <SelectTrigger id="status">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="anyStatus">Any Status</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="md:col-span-2 lg:col-span-1">
        <Label htmlFor="sessionId">Session ID</Label>
        <Input id="sessionId" type="text" placeholder="Enter Session ID" />
      </div>
    </div>

    {/* Advanced Search Toggle */}
    <div className="mt-4">
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-1"
        onClick={() => setAdvanced((prev) => !prev)}
      >
        <ChevronDown className="w-4 h-4" />
        Advanced Search
      </Button>
    </div>

    {/* Advanced Search Fields */}
    {advanced && (
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="addedBy">Added By</Label>
          <Select>
            <SelectTrigger id="addedBy">
              <SelectValue placeholder="Select Staff" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="anyStaff">Any Staff</SelectItem>
              <SelectItem value="johnDoe">john_doe</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Open Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !openDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {openDate ? format(openDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={openDate}
                onSelect={setOpenDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label>Close Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !closeDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {closeDate ? format(closeDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={closeDate}
                onSelect={setCloseDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    )}

    {/* Action Buttons */}
    <div className="flex justify-end mt-6 gap-2">
      <Button type="reset" variant="outline">
        Reset
      </Button>
      <Button type="submit">Search</Button>
    </div>
  </CardContent>
</Card>


            {/* Results Card */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Results</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Session ID</TableHead>
                      <TableHead>Shift</TableHead>
                      <TableHead>Opening/Closing</TableHead>
                      <TableHead>Sales</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
     
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
