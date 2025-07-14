"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings2, Barcode, KeyRound, Tag, List } from "lucide-react";

export default function ProductSettingsPage() {
  const settings = [
    {
      title: "Barcode",
      description: "Configure barcode format, length, and prefix.",
      icon: <Barcode className="w-8 h-8 text-primary" />,
    },
    {
      title: "SKU",
      description: "Set SKU format, length, and prefix.",
      icon: <KeyRound className="w-8 h-8 text-primary" />,
    },
    {
      title: "Brand",
      description: "Manage product brands and related options.",
      icon: <Tag className="w-8 h-8 text-primary" />,
    },
    {
      title: "Categories",
      description: "Organize and manage product categories.",
      icon: <List className="w-8 h-8 text-primary" />,
    },
    {
      title: "Custom Field",
      description: "Default status, categories, and more.",
      icon: <Settings2 className="w-8 h-8 text-primary" />,
    },
  ];

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {settings.map((setting, idx) => (
        <a
          key={idx}
          href={
            idx === 0
              ? "/product/setting/barcode"
              : idx === 1
              ? "/product/setting/sku"
              : idx === 2
              ? "/product/setting/brand"
              : idx === 3
              ? "/product/setting/categories"
              : "/product/setting/general"
          }
          className="block group focus:outline-none"
        >
          <Card className="flex flex-col items-center text-center shadow-md transition-transform group-hover:scale-[1.03] group-active:scale-[0.98] cursor-pointer">
            <CardHeader className="flex flex-col items-center gap-2">
              {setting.icon}
              <CardTitle className="text-lg mt-2">{setting.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-2">
              <span className="text-muted-foreground text-sm mb-2">{setting.description}</span>
            </CardContent>
          </Card>
        </a>
      ))}
    </div>
  );
}
