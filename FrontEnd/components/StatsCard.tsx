import { Card } from "@/components/ui/card";
import { Users, DollarSign, FileText, Package } from "lucide-react";

const stats = [
  {
    title: "Total Clients",
    value: "1,250",
    icon: <Users className="w-7 h-7 text-purple-600" />,
    change: "+5%",
    changeType: "up",
  },
  {
    title: "Revenue",
    value: "$32,400",
    icon: <DollarSign className="w-7 h-7 text-green-600" />,
    change: "+2.1%",
    changeType: "up",
  },
  {
    title: "Invoices",
    value: "320",
    icon: <FileText className="w-7 h-7 text-blue-600" />,
    change: "-1.2%",
    changeType: "down",
  },
  {
    title: "Products",
    value: "87",
    icon: <Package className="w-7 h-7 text-yellow-500" />,
    change: "+0.8%",
    changeType: "up",
  },
];

export function StatsCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-10 mb-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="flex flex-col gap-2 p-5 bg-white dark:bg-gray-900 shadow hover:shadow-lg transition-all rounded-2xl border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            {stat.icon}
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">{stat.title}</span>
          </div>
          <div className="flex items-end justify-between mt-2">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
            <span className={`text-sm font-medium ml-2 ${stat.changeType === "up" ? "text-green-600" : "text-red-500"}`}>
              {stat.change}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}
