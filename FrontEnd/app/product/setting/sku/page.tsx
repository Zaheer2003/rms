"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound } from "lucide-react";

export default function SkuSettingsPage() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <Card>
        <CardHeader className="flex flex-col items-center gap-2">
          <KeyRound className="w-10 h-10 text-primary" />
          <CardTitle className="text-lg mt-2">SKU Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="skuPrefix">SKU Prefix</Label>
            <Input id="skuPrefix" placeholder="e.g. SKU-" className="max-w-xs" />
          </div>
          <div>
            <Label htmlFor="skuLength">SKU Length</Label>
            <Input id="skuLength" type="number" placeholder="e.g. 9" className="max-w-xs" />
          </div>
          <div>
            <Label htmlFor="skuFormat">SKU Format</Label>
            <Input id="skuFormat" placeholder="e.g. Alphanumeric" className="max-w-xs" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
