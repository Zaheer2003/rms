"use client";

import { Button } from "@/components/ui/button";

export function PurchaseActionButtons() {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex justify-between items-center">
      {/* Save button on the left */}
      <Button variant="default">
        Save
      </Button>

      {/* Clear and Draft buttons on the right */}
      <div className="flex gap-3">
        <Button variant="outline">
          Clear
        </Button>
        <Button
        variant="secondary" 
        className="bg-yellow-400 hover:bg-yellow-500 text-white"
        
        >
          Draft
        </Button>
      </div>
    </div>
  );
}
