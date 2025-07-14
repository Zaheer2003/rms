"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from "@mui/lab";
import { Paper, Typography, Box } from "@mui/material";
import "react-vertical-timeline-component/style.min.css";

import { FileText, UserPlus, UserX, Edit, Trash2, BoxIcon, DollarSign, Settings, Users, ShoppingCart, Warehouse, Package, CheckCircle } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import Image from 'next/image';

interface Activity {
  title: string;
  description: string;
  date: string;
  iconBg?: string;
  icon?: React.ReactNode;
}

const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText className="w-5 h-5" />,
  UserPlus: <UserPlus className="w-5 h-5" />,
  UserX: <UserX className="w-5 h-5" />,
  Edit: <Edit className="w-5 h-5" />,
  Trash2: <Trash2 className="w-5 h-5" />,
  Box: <BoxIcon className="w-5 h-5" />,
  DollarSign: <DollarSign className="w-5 h-5" />,
  Settings: <Settings className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  ShoppingCart: <ShoppingCart className="w-5 h-5" />,
  Warehouse: <Warehouse className="w-5 h-5" />,
  Package: <Package className="w-5 h-5" />,
  CheckCircle: <CheckCircle className="w-5 h-5" />,
};

export default function RecentActivitiesCard() {
  const [activities, setActivities] = React.useState<Activity[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [perPage, setPerPage] = React.useState(5);

  React.useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("token");
        const res = await axios.get(`http://localhost:8000/api/activities?per_page=${perPage}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // If using Laravel's paginate, data is in res.data.data
        setActivities(res.data.data || res.data);
      } catch {
        setError("Failed to load activities.");
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, [perPage]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full mt-8 border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <h3 className="text-2xl font-bold text-primary mb-2 md:mb-0 tracking-tight">Recent Activities</h3>
        <div className="flex gap-2">
          <Button variant="default" className="bg-primary text-white border-primary shadow">View All</Button>
        </div>
      </div>
      <div className="flex gap-2 items-center mb-4">
        <label htmlFor="perPage" className="text-sm text-gray-600">Show</label>
        <select
          id="perPage"
          value={perPage}
          onChange={e => setPerPage(Number(e.target.value))}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
        <span className="text-sm text-gray-600">activities</span>
      </div>
      <div className="mt-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Image src="/loading.svg" alt="Loading" width={120} height={120} className="mb-4" />
            <span className="text-lg text-gray-500">Loading activities...</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Image src="/404 error.svg" alt="Error" width={100} height={100} className="mb-4" />
            <span className="text-lg text-red-500">{error}</span>
          </div>
        ) : activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Image src="/Empty.svg" alt="No Data" width={120} height={120} className="mb-4" />
            <span className="text-lg text-gray-500">No activities found.</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Timeline position="alternate" sx={{ width: '100%', minHeight: 200 }}>
              {activities.map((activity, idx) => (
                <TimelineItem key={idx}>
                  <TimelineSeparator>
                    <TimelineDot color="grey" variant="filled">
                      {activity.icon && iconMap[activity.icon as string]}
                    </TimelineDot>
                    {idx < activities.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent sx={{ px: 2, minWidth: 180 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block', textAlign: 'left' }}>
                      {new Date(activity.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                    <Paper elevation={0} sx={{ p: 2, bgcolor: activity.iconBg || '#fff', borderRadius: 2, border: '1px solid #e0e0e0', minWidth: 120, textAlign: 'left' }}>
                      <Typography variant="h6" component="span" sx={{ fontWeight: 700 }}>
                        {activity.title}
                      </Typography>
                      <Typography variant="body2">{activity.description}</Typography>
                    </Paper>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </div>
        )}
      </div>
    </div>
  );
}
