"use client";
import * as React from "react";
import { SessionProvider } from "next-auth/react";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { toast } from "sonner";
import { SmtpCard } from "@/components/SMTPCrad";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

function SmtpCardWithSession({
  smtp,
  setSmtp,
  handleChange,
  renderActions,
}: {
  smtp: {
    host: string;
    port: string;
    username: string;
    password: string;
    encryption: string;
    from_email: string;
    from_name: string;
  };
  setSmtp: React.Dispatch<React.SetStateAction<{
    host: string;
    port: string;
    username: string;
    password: string;
    encryption: string;
    from_email: string;
    from_name: string;
  }>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  renderActions?: (formEnabled: boolean) => React.ReactNode;
}) {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const gmailLogin = searchParams.get("gmail") === "1";

  React.useEffect(() => {
    if (
      gmailLogin &&
      session?.user?.email &&
      session?.user?.name &&
      (smtp.from_email === "" || smtp.from_name === "" || smtp.username === "")
    ) {
      const newSmtp = {
        ...smtp,
        from_email: session.user?.email ?? smtp.from_email,
        from_name: session.user?.name ?? smtp.from_name,
        username: session.user?.email ?? smtp.username,
        host: "smtp.gmail.com",
        port: "587",
      };
      setSmtp(newSmtp);
      // Auto-save to backend after auto-fill
      fetch("/api/smtp/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSmtp),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to save SMTP settings");
          return res.json();
        })
        .then(() => {
          // Optionally show a toast or notification here
        })
        .catch(() => {
          // Optionally handle error
        });
      // If this is running in a popup, close the window after filling
      if (window.opener && window.name === "GmailLogin") {
        setTimeout(() => {
          window.close();
        }, 500); // Give time for parent to update
      }
    }
  }, [gmailLogin, session, smtp.from_email, smtp.from_name, smtp.username, setSmtp]);

  return (
    <SmtpCard
      smtp={smtp}
      onChange={handleChange}
      renderActions={renderActions}
    />
  );
}

export default function SmtpSettingsPage() {
  const [smtp, setSmtp] = React.useState({
    host: "",
    port: "",
    username: "",
    password: "",
    encryption: "",
    from_email: "",
    from_name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSmtp((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    toast.success("SMTP settings saved!");
  };

  const handleReset = () => {
    setSmtp({
      host: "",
      port: "",
      username: "",
      password: "",
      encryption: "",
      from_email: "",
      from_name: "",
    });
    toast.info("SMTP settings reset.");
  };

  return (
    <SessionProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {/* Header */}
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/settings">Settings</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">SMTP</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          {/* Main Content */}
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="px-10 py-6">
              <SmtpCardWithSession
                smtp={smtp}
                setSmtp={setSmtp}
                handleChange={handleChange}
                renderActions={
                  (formEnabled: boolean) => formEnabled && (
                    <div className="flex justify-end gap-2 mt-6">
                      <Button type="button" onClick={handleSave}>
                        Save
                      </Button>
                      <Button type="button" variant="secondary" onClick={handleReset}>
                        Reset
                      </Button>
                    </div>
                  )
                }
              />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  );
}
