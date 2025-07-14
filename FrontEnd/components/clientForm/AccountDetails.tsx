import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { UploadCloud, HelpCircle } from "lucide-react";
import type { ClientFormState } from "@/app/clients/add/page";
import React, { useRef} from "react";


const AccountDetails: React.FC<{
  form: ClientFormState;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  errors?: Partial<Record<keyof ClientFormState, string>>;
}> = ({ form, onChange, onSelectChange, errors,}) => {
  // Drag-and-drop for attachments
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      // Create a synthetic event for file input
      const inputEvent = {
        target: {
          name: "attachment",
          files: [file],
          type: "file"
        }
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(inputEvent);
    }
  };
  const handleFileClick = () => fileInputRef.current?.click();




  return (
    <div className="space-y-6">
      {/* Row: Code Number, Currency */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        <div className="space-y-1">
          <Label htmlFor="code">
            Code Number
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="inline w-4 h-4 text-muted-foreground ml-1 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  This is the unique client number, generated automatically. <br />
                  <span className='text-xs text-muted-foreground'>You can configure the format, prefix, and starting number in settings.</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="text-red-500">*</span>
          </Label>
          <Input id="code" name="code" type="text" required  />
        </div>
        <div className="space-y-1">
          <Label htmlFor="currency">Currency <TooltipProvider><Tooltip><TooltipTrigger asChild><HelpCircle className="inline w-4 h-4 text-muted-foreground ml-1 cursor-pointer" /></TooltipTrigger><TooltipContent>Client's preferred currency</TooltipContent></Tooltip></TooltipProvider></Label>
          <Select value={form.currency} onValueChange={v => onSelectChange("currency", v)}>
            <SelectTrigger id="currency">
              <SelectValue placeholder="Select a currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usd">USD</SelectItem>
              <SelectItem value="eur">EUR</SelectItem>
              <SelectItem value="lkr">LKR Sri Lankan Rupee</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Invoicing Method - its own row */}
      <div className="space-y-1">
        <Label htmlFor="invoicingMethod">Invoicing Method <TooltipProvider><Tooltip><TooltipTrigger asChild><HelpCircle className="inline w-4 h-4 text-muted-foreground ml-1 cursor-pointer" /></TooltipTrigger><TooltipContent>How invoices are delivered</TooltipContent></Tooltip></TooltipProvider></Label>
        <Select value={form.invoicingMethod} onValueChange={v => onSelectChange("invoicingMethod", v)}>
          <SelectTrigger id="invoicingMethod">
            <SelectValue placeholder="Select invoicing method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="manual">Print (Offline)</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="portal">Client Portal</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
        <Input type="email" id="email" name="email" className="w-full" required placeholder="Enter email" value={form.email} onChange={onChange} aria-invalid={!!errors?.email} />
        {errors?.email && <div className="text-xs text-red-500 mt-1">{errors.email}</div>}
      </div>
      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select value={form.category} onValueChange={v => onSelectChange("category", v)}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="retail">Retail</SelectItem>
            <SelectItem value="wholesale">Wholesale</SelectItem>
            <SelectItem value="service">Service</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" name="notes" className="w-full" placeholder="Additional notes" value={form.notes} onChange={onChange} />
      </div>
      {/* Attachments - Drag and Drop */}
      <div className="space-y-2">
        <Label>Attachments</Label>
        <div
          className="border-2 border-dashed border-muted-foreground rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer bg-muted/30 hover:bg-muted/50 transition"
          onClick={handleFileClick}
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
        >
          <UploadCloud className="w-8 h-8 text-primary mb-2" />
          <div className="text-sm text-muted-foreground">Drop file here or <span className="underline text-primary">select from your computer</span></div>
          <input
            ref={fileInputRef}
            type="file"
            name="attachment"
            className="hidden"
            onChange={onChange}
            title="Select attachment file"
            placeholder="Select attachment file"
          />
          {form.attachment && <div className="mt-2 text-xs text-foreground">Selected: {form.attachment.name}</div>}
        </div>
      </div>
     
    </div>
  );
};

export default AccountDetails;
