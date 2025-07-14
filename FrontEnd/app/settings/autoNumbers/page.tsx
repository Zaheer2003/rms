"use client"

import { useState, useEffect, useRef } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

type FormState = {
  currentNumber: string
  digits: number
  prefix: string
  requireUnique: boolean
  addPrefix: boolean
}

const modules = ["supplier", "customer", "product"]

export default function Page() {
  const [activeModule, setActiveModule] = useState<string>("supplier")

  // Maintain form state per module to preserve edits when switching tabs
  const [forms, setForms] = useState<Record<string, FormState>>({
    supplier: {
      currentNumber: "000001",
      digits: 6,
      prefix: "",
      requireUnique: true,
      addPrefix: false,
    },
    customer: {
      currentNumber: "000001",
      digits: 6,
      prefix: "",
      requireUnique: true,
      addPrefix: false,
    },
    product: {
      currentNumber: "000001",
      digits: 6,
      prefix: "",
      requireUnique: true,
      addPrefix: false,
    },
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Pads a string number with leading zeros to match given length
  const padNumber = (num: string, length: number) => {
    if (!num) return "".padStart(length, "0")
    const numeric = num.replace(/\D/g, "")
    return numeric.padStart(length, "0")
  }

  // To avoid state update after unmount/fetch change
  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true
    const fetchSettings = async () => {
      setLoading(true)
      setError(null)
      setSuccess(null)

      try {
        const res = await fetch(`/api/auto-number/${activeModule}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            
          },
        })

        if (!res.ok) {
          throw new Error(`Failed to fetch settings: ${res.statusText}`)
        }

        const data = await res.json()

        if (isMounted.current) {
          setForms((prev) => ({
            ...prev,
            [activeModule]: {
              currentNumber: padNumber(data.current_number || "000001", data.digits || 6),
              digits: data.digits || 6,
              prefix: data.prefix || "",
              requireUnique: data.require_unique ?? true,
              addPrefix: data.add_prefix ?? false,
            },
          }))
        }
      } catch (err: any) {
        if (isMounted.current) setError(err.message || "Failed to load settings")
      } finally {
        if (isMounted.current) setLoading(false)
      }
    }

    fetchSettings()

    return () => {
      isMounted.current = false
    }
  }, [activeModule])

  // Current form state for active module
  const form = forms[activeModule]

  const handleChange = (
    field: keyof FormState,
    value: string | number | boolean
  ) => {
    setForms((prev) => {
      const prevForm = prev[activeModule]
      let updatedForm = { ...prevForm }

      if (field === "currentNumber" && typeof value === "string") {
        updatedForm.currentNumber = padNumber(value, prevForm.digits)
      } else if (field === "digits" && typeof value === "number") {
        updatedForm.digits = value
        updatedForm.currentNumber = padNumber(prevForm.currentNumber, value)
      } else {
        updatedForm[field] = value as any
      }

      return { ...prev, [activeModule]: updatedForm }
    })

    setError(null)
    setSuccess(null)
  }

  const handleSave = async () => {
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const res = await fetch(`/api/auto-number/${activeModule}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          current_number: form.currentNumber,
          digits: form.digits,
          prefix: form.prefix,
          require_unique: form.requireUnique,
          add_prefix: form.addPrefix,
        }),
      })

      if (!res.ok) {
        throw new Error(`Failed to save: ${res.statusText}`)
      }

      const data = await res.json()
      console.log(`Saved ${activeModule} auto number settings:`, data)
      setSuccess("Settings saved successfully!")
    } catch (err: any) {
      setError(err.message || "Failed to save settings")
    } finally {
      setLoading(false)
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Page Header */}
        <header className="flex h-16 items-center px-4 border-b bg-muted/40">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mx-4 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Auto Numbers</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">{activeModule}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Page Content */}
        <main className="flex flex-1 p-6 gap-6 bg-gray-50">
          <Tabs
            value={activeModule}
            onValueChange={setActiveModule}
            className="flex w-full"
          >
            {/* Left Tab List */}
            <TabsList className="flex flex-col w-48 rounded-lg border bg-white shadow-sm p-2 space-y-2">
              {modules.map((module) => (
                <TabsTrigger
                  key={module}
                  value={module}
                  className="w-full justify-start capitalize data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600 rounded-md"
                >
                  {module}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Right Tab Content */}
            <div className="flex-1 pl-8">
              {modules.map((module) => (
                <TabsContent key={module} value={module}>
                  <h2 className="text-2xl font-semibold mb-6">
                    Edit Numbering Sequence (
                    {module.charAt(0).toUpperCase() + module.slice(1)})
                  </h2>

                  {/* Only show form on active tab */}
                  {activeModule === module && (
                    <>
                      {loading ? (
                        <p>Loading...</p>
                      ) : (
                        <CardUI
                          form={form}
                          onChange={handleChange}
                          onSave={handleSave}
                          loading={loading}
                          error={error}
                          success={success}
                        />
                      )}
                    </>
                  )}
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

function CardUI({
  form,
  onChange,
  onSave,
  loading,
  error,
  success,
}: {
  form: FormState
  onChange: (field: keyof FormState, value: string | number | boolean) => void
  onSave: () => void
  loading: boolean
  error: string | null
  success: string | null
}) {
  return (
    <div className="max-w-xl w-full bg-white p-6 rounded-2xl border shadow-sm space-y-6">
      {/* Current Number Input */}
      <div className="space-y-2">
        <Label htmlFor="currentNumber">Current Number</Label>
        <Input
          id="currentNumber"
          value={form.currentNumber}
          onChange={(e) => onChange("currentNumber", e.target.value)}
          placeholder="e.g., 000001"
        />
      </div>

      {/* Digits Input */}
      <div className="space-y-2">
        <Label htmlFor="digits">Number of Digits</Label>
        <Input
          id="digits"
          type="number"
          value={form.digits}
          onChange={(e) => onChange("digits", Number(e.target.value))}
          min={1}
          placeholder="e.g., 6"
        />
      </div>

      {/* Add Prefix Toggle */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Checkbox
            id="addPrefix"
            checked={form.addPrefix}
            onCheckedChange={(checked) => onChange("addPrefix", Boolean(checked))}
          />
          <Label htmlFor="addPrefix">Add Prefix</Label>
        </div>

        {/* Prefix Input Conditional */}
        {form.addPrefix && (
          <div className="pl-6 space-y-2">
            <Label htmlFor="prefix">Prefix</Label>
            <Input
              id="prefix"
              value={form.prefix}
              onChange={(e) => onChange("prefix", e.target.value)}
              placeholder="e.g., SUP-"
            />
          </div>
        )}
      </div>

      {/* Unique Number Toggle */}
      <div className="flex items-center gap-3">
        <Checkbox
          id="requireUnique"
          checked={form.requireUnique}
          onCheckedChange={(checked) =>
            onChange("requireUnique", Boolean(checked))
          }
        />
        <Label htmlFor="requireUnique">Require Unique Numbering</Label>
      </div>

      {/* Error message */}
      {error && <p className="text-red-600">{error}</p>}

      {/* Success message */}
      {success && <p className="text-green-600">{success}</p>}

      {/* Save Button */}
      <Button className="w-full mt-4" onClick={onSave} disabled={loading}>
        {loading ? "Saving..." : "Save Settings"}
      </Button>
    </div>
  )
}
