"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, Plus, Mail, Phone, MapPin, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { clients as clientsData } from "@/constants";
import { toast } from "sonner"; // Optional: to show copy feedback

export function CustomerCard() {
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState("");
  const [showNewClientForm, setShowNewClientForm] = useState(false);

  const formattedClients = clientsData.map((client) => ({
    label: `${client.firstName} ${client.lastName}`,
    value: client.clientCode,
  }));

  const getStatusBadge = (status: string) => {
    const color =
      status.toLowerCase() === "active" ? "bg-green-500" : "bg-red-500";
    return (
      <span
        className={cn(
          "text-white text-xs font-semibold px-2 py-1 rounded-full",
          color
        )}
      >
        {status}
      </span>
    );
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied!`);
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Customer Info</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowNewClientForm(!showNewClientForm)}
        >
          <Plus className="w-4 h-4 mr-1" />
          Add New Client
        </Button>
      </div>

      {/* Combo Box */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Select Client</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {selectedClient
                ? formattedClients.find((c) => c.value === selectedClient)?.label
                : "Choose an existing client"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search clients..." />
              <CommandEmpty>No client found.</CommandEmpty>
              <CommandGroup>
                {formattedClients.map((client) => (
                  <CommandItem
                    key={client.value}
                    value={client.value}
                    onSelect={() => {
                      setSelectedClient(client.value);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedClient === client.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {client.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Client Card */}
      {selectedClient && (() => {
        const client = clientsData.find(c => c.clientCode === selectedClient);
        if (!client) return null;
        return (
          <div className="border rounded-lg bg-gray-50 p-4 space-y-3 shadow-inner">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                {client.firstName} {client.lastName}
              </h3>
              {getStatusBadge(client.status)}
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <Mail className="h-4 w-4" />
              <span>{client.Email}</span>
              <Copy
                className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-primary"
                onClick={() => copyToClipboard(client.Email, "Email")}
              />
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <Phone className="h-4 w-4" />
              <span>{client.mobile}</span>
              <Copy
                className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-primary"
                onClick={() => copyToClipboard(client.mobile, "Phone")}
              />
            </div>

            <div className="flex items-start gap-2 text-gray-700">
              <MapPin className="h-4 w-4 mt-0.5" />
              <span>
                {client.addressline1}, {client.addressline2}, {client.state}, {client.country} - {client.postalCode}
              </span>
            </div>
          </div>
        );
      })()}

      {/* New Client Form Section Placeholder */}
      {showNewClientForm && (
        <div className="border-t pt-4">
          <p className="text-sm text-gray-500">New client form goes here.</p>
        </div>
      )}
    </div>
  );
}
