"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { BarChart2, Clock, ListOrdered } from "lucide-react";

const paymentTabs = [
  { id: "payments-tab1", label: "Statistics", icon: <BarChart2 className="w-4 h-4" /> },
  { id: "payments-tab2", label: "Recent Payments", icon: <Clock className="w-4 h-4" /> },
  { id: "payments-tab3", label: "View All", icon: <ListOrdered className="w-4 h-4" /> },
];

const paymentTabContent: Record<string, React.ReactNode> = {
  "payments-tab1": <h4 className="text-lg font-semibold">Statistics</h4>,
  "payments-tab2": <h4 className="text-lg font-semibold">Recent Payments</h4>,
  "payments-tab3": <h4 className="text-lg font-semibold">View All Payments</h4>,
};

export default function PaymentsReportCard() {
  const [activeTab, setActiveTab] = React.useState(paymentTabs[0].id);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full mt-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <h3 className="text-xl font-bold text-primary mb-2 md:mb-0">Payments Report</h3>
        <div className="flex gap-2">
          {paymentTabs.map((tab) => (
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
        {paymentTabContent[activeTab]}
      </div>
    </div>
  );
}
