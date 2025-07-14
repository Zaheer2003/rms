"use client"

import { Button } from "@/components/ui/button"

type Props = {
  loading: boolean
  success: string
  error: string
  onCancel?: () => void
}

export function SupplierActionButtons({ loading, success, error, onCancel }: Props) {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm space-y-4">
      <div className="flex flex-col md:flex-row items-center justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="w-full md:w-auto"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto"
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>
      {success && <p className="text-green-600 text-sm">{success}</p>}
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  )
}
