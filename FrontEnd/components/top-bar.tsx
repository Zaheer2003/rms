import { Button } from "@/components/ui/button";
import { Bell, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface TopBarProps {
  title: string;
}

export function TopBar({ title }: TopBarProps) {
  const router = useRouter();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
      </div>
      <Button variant="ghost" size="icon">
        <Bell className="h-5 w-5" />
        <span className="sr-only">Notifications</span>
      </Button>
    </header>
  );
}
