"use client";
import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Sun, Moon } from "lucide-react";

export default function BackgroundSettingsPage() {
  const [theme, setTheme] = React.useState("light"); // default is light

  // TODO: Fetch user's current theme from backend on mount

  const handleSave = () => {
    // TODO: Send theme to backend
    toast.success("Background preference saved!");
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 px-4 bg-background/80 border-b">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-lg font-semibold tracking-tight">Background Settings</h1>
        </header>
        <main className="flex flex-col items-center justify-center min-h-[60vh] p-8 bg-muted/50">
          <Card className="w-full max-w-md shadow-xl border-2 border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Sun className="w-5 h-5 text-yellow-400" />
                <span>Choose Background Theme</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={theme} onValueChange={setTheme} className="space-y-4">
                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:border-primary transition cursor-pointer bg-white/80 dark:bg-black/20">
                  <RadioGroupItem value="light" id="light" />
                  <label htmlFor="light" className="flex items-center gap-2 cursor-pointer">
                    <Sun className="w-4 h-4 text-yellow-400" />
                    <span className="font-medium">Light</span>
                  </label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:border-primary transition cursor-pointer bg-white/80 dark:bg-black/20">
                  <RadioGroupItem value="dark" id="dark" />
                  <label htmlFor="dark" className="flex items-center gap-2 cursor-pointer">
                    <Moon className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">Dark</span>
                  </label>
                </div>
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} className="px-8">Save</Button>
            </CardFooter>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}