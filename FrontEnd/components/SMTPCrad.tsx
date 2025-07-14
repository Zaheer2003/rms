"use client";
import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FaGoogle } from "react-icons/fa";

export interface SmtpCardProps {
  smtp: {
    host: string;
    port: string;
    username: string;
    password: string;
    encryption: string;
    from_email: string;
    from_name: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  renderActions?: (formEnabled: boolean) => React.ReactNode;
}

export function SmtpCard({ smtp, onChange, renderActions }: SmtpCardProps) {
  const [showForm, setShowForm] = React.useState(false);
  const [formUpdated, setFormUpdated] = React.useState(false);

  // Handler for Gmail login: open Google sign-in in a small popup window
  const handleGmailLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const url = "/api/auth/signin/google?callbackUrl=" + encodeURIComponent(window.location.pathname + "?gmail=1");
    const popup = window.open(
      url,
      "GmailLogin",
      `width=${width},height=${height},left=${left},top=${top},resizable,scrollbars=yes,status=1`
    );
    if (popup) {
      popup.focus();
      // Listen for storage event to auto-close popup after login
      const storageListener = (event: StorageEvent) => {
        if (event.key === "nextauth.message" && event.newValue?.includes("signIn")) {
          popup.close();
          window.removeEventListener("storage", storageListener);
        }
      };
      window.addEventListener("storage", storageListener);
    }
  };

  React.useEffect(() => {
    if (showForm) {
      setFormUpdated(
        smtp.host !== "" ||
        smtp.port !== "" ||
        smtp.username !== "" ||
        smtp.password !== "" ||
        smtp.encryption !== "" ||
        smtp.from_email !== "" ||
        smtp.from_name !== ""
      );
    } else {
      setFormUpdated(false);
    }
  }, [showForm, smtp]);

  const smtpEnabled = showForm && formUpdated;

  return (
    <Card className="p-0 border border-muted-foreground/10 shadow-lg rounded-xl bg-background/80 backdrop-blur-sm max-w-xl mx-auto">
      <CardHeader className="pb-2">
        <CardTitle>SMTP Settings</CardTitle>
        <CardDescription>Configure your outgoing email server. Enable to enter details.</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-3 mb-4">
          <Switch id="show-smtp-form" checked={showForm} onCheckedChange={setShowForm} />
          <label htmlFor="show-smtp-form" className="text-base font-medium select-none cursor-pointer">Enable SMTP Settings</label>
          <span className={`ml-4 text-sm font-semibold ${smtpEnabled ? 'text-green-600' : 'text-muted-foreground'}`}>{smtpEnabled ? 'Enabled' : 'Disabled'}</span>
        </div>
        <Separator className="mb-4" />
        <div className={`transition-all duration-300 ${showForm ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0 overflow-hidden'}`}> 
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="smtp-from-name">Sender Name</label>
              <Input
                id="smtp-from-name"
                type="text"
                name="from_name"
                value={smtp.from_name}
                onChange={onChange}
                placeholder="Your Company Name"
                title="Sender Name"
                autoComplete="off"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="smtp-from-email">Email Address</label>
              <Input
                id="smtp-from-email"
                type="email"
                name="from_email"
                value={smtp.from_email}
                onChange={onChange}
                placeholder="noreply@example.com"
                title="Email Address"
                autoComplete="off"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="smtp-password">Password</label>
              <Input
                id="smtp-password"
                type="password"
                name="password"
                value={smtp.password}
                onChange={onChange}
                placeholder="Password"
                title="Password"
                autoComplete="off"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="smtp-username">SMTP User Name</label>
              <Input
                id="smtp-username"
                type="text"
                name="username"
                value={smtp.username}
                onChange={onChange}
                placeholder="your@email.com"
                title="SMTP User Name"
                autoComplete="off"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="smtp-host">SMTP Server</label>
              <Input
                id="smtp-host"
                type="text"
                name="host"
                value={smtp.host}
                onChange={onChange}
                placeholder="smtp.example.com"
                title="SMTP Server"
                autoComplete="off"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="smtp-port">SMTP Port</label>
              <Input
                id="smtp-port"
                type="text"
                name="port"
                value={smtp.port}
                onChange={onChange}
                placeholder="587"
                title="SMTP Port"
                autoComplete="off"
              />
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-md bg-red-500 px-6 py-2 text-white font-semibold shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                onClick={handleGmailLogin}
              >
                <FaGoogle className="w-5 h-5" />
                Gmail
              </button>
            </div>
          </form>
          {renderActions && showForm && renderActions(true)}
        </div>
      </CardContent>
    </Card>
  );
}
