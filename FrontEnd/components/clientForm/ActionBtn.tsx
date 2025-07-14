"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export function ClientActionButtons({ onSave, onClear, onDraft, status }: {
  onSave: () => void;
  onClear: () => void;
  onDraft: () => void;
  status?: string;
}) {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex justify-between items-center">
      {/* Save button on the left */}
      <Button variant="default" onClick={onSave}>
        Save
      </Button>
      {/* Clear and Draft buttons on the right */}
      <div className="flex gap-3">
        <Button variant="outline" onClick={onClear}>
          Clear
        </Button>
        <Button variant="secondary" className="bg-yellow-400 hover:bg-yellow-500 text-white" onClick={onDraft}>
          Draft
        </Button>
      </div>
      {status && <span className="ml-4 text-green-600 font-semibold">{status}</span>}
    </div>
  );
}
