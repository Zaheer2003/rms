"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings2, X, GripVertical, MessageSquareText, AtSign, AlignLeft, Hash as TextIcon, Hash as NumberFieldIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FIELD_TYPES = [
  { type: "Single Line", value: "text", icon: <MessageSquareText className="w-4 h-4 inline mr-2 text-primary" /> },
  { type: "Multiple Line", value: "textarea", icon: <AlignLeft className="w-4 h-4 inline mr-2 text-primary" /> },
  { type: "Email", value: "email", icon: <AtSign className="w-4 h-4 inline mr-2 text-primary" /> },
  { type: "Text", value: "text", icon: <TextIcon className="w-4 h-4 inline mr-2 text-primary" /> },
  { type: "Number", value: "number", icon: <NumberFieldIcon className="w-4 h-4 inline mr-2 text-primary" /> },
];

export default function CustomFieldSettingsPage() {
  const [draggedType, setDraggedType] = useState<string | null>(null);
  const [customFields, setCustomFields] = useState<{ type: string; name: string; description: string }[]>([]);

  const handleDragStart = (type: string) => setDraggedType(type);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedType) {
      setCustomFields([...customFields, { type: draggedType, name: "", description: "" }]);
      setDraggedType(null);
    }
  };
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleRemoveField = (idx: number) => {
    setCustomFields(customFields.filter((_, i) => i !== idx));
  };

  return (
    <div className="p-6 min-h-[60vh] flex flex-row gap-6">
      {/* Left Side (20%) - Draggable Menu */}
      <div className="w-1/5">
        <Card>
          <CardHeader>
            <CardTitle>Custom Field Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              {FIELD_TYPES.map((field) => (
                <div
                  key={field.type}
                  draggable
                  onDragStart={() => handleDragStart(field.type)}
                  className="border rounded px-2 py-1 bg-muted cursor-move text-center hover:bg-primary/10 flex items-center gap-2"
                >
                  <GripVertical className="w-3 h-3 text-gray-400 mr-1" />
                  {field.icon}
                  <span>{field.type}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Right Side (80%) - Drop Area */}
      <div className="w-4/5">
        <Card className="w-full min-h-[300px]" onDrop={handleDrop} onDragOver={handleDragOver}>
          <CardHeader className="flex flex-col items-center gap-2">
            <Settings2 className="w-10 h-10 text-primary" />
            <CardTitle className="text-2xl mt-2">Custom Field Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 text-center text-muted-foreground">
              Drag a field type from the left and drop here to add a custom field.
            </div>
            <div className="flex flex-col gap-4">
              {customFields.length === 0 && (
                <div className="text-center text-muted-foreground">Drop field types here to create custom fields.</div>
              )}
              {customFields.map((field, idx) => (
                <div key={idx} className="relative flex flex-col gap-2 border rounded p-4 bg-muted/30 group">
                  <button
                    type="button"
                    onClick={() => handleRemoveField(idx)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                    aria-label="Remove field"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-2 mb-2">
                    <GripVertical className="w-3 h-3 text-gray-400" />
                    {FIELD_TYPES.find(f => f.type === field.type)?.icon}
                    <span className="font-medium">{field.type}</span>
                  </div>
                  <form className="flex flex-col gap-2">
                    <Label>Field Name</Label>
                    <Input placeholder="Enter field name" />
                    <Label>Description</Label>
                    <Input placeholder="Short description (optional)" />
                  </form>
                </div>
              ))}
              {customFields.length > 0 && (
                <button className="mt-4 w-full bg-primary text-white py-2 rounded hover:bg-primary/90 transition-colors">Save</button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
