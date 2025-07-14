"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { FileText, LineChart, Clock, AlertCircle } from "lucide-react";

const tabs = [
  { id: "sales-tab1", label: "Invoices", icon: <FileText className="w-4 h-4" /> },
  { id: "sales-tab2", label: "Profit & Loss", icon: <LineChart className="w-4 h-4" /> },
  { id: "sales-tab3", label: "Recent Invoices", icon: <Clock className="w-4 h-4" /> },
  { id: "sales-tab4", label: "Overdue Invoices", icon: <AlertCircle className="w-4 h-4" /> },
];

const tabContent: Record<string, React.ReactNode> = {
  "sales-tab1": <h4 className="text-lg font-semibold">Invoices</h4>,
  "sales-tab2": <h4 className="text-lg font-semibold">Profit & Loss</h4>,
  "sales-tab3": <h4 className="text-lg font-semibold">Recent Invoices</h4>,
  "sales-tab4": <h4 className="text-lg font-semibold">Overdue Invoices</h4>,
};

export default function SalesReportCard() {
  const [activeTab, setActiveTab] = React.useState(tabs[0].id);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full mt-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <h3 className="text-xl font-bold text-primary mb-2 md:mb-0">Sales Report</h3>
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              className={
                activeTab === tab.id
                  ? "bg-primary text-white border-primary"
                  : "bg-transparent text-muted-foreground border-primary"
              }
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="mt-6 min-h-[60px]">
        {tabContent[activeTab]}
      </div>
    </div>
  );
}
