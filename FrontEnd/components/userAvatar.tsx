"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserAvatar({ name, avatar, className }: { name: string; avatar?: string; className?: string }) {
  // Helper to get initials for fallback
  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0]?.toUpperCase() || "U";
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <Avatar className={`rounded-lg ${className ?? "h-8 w-8"}`}>
      {avatar ? <AvatarImage src={avatar} alt={name} /> : null}
      <AvatarFallback className="rounded-lg">{getInitials(name)}</AvatarFallback>
    </Avatar>
  );
}
