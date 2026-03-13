import { statsData } from "../../data/mockData";
import StatsCard from "../../components/dashboard/StatsCard";
import RevenueChart from "../../components/dashboard/RevenueChart";
import TrafficChart from "../../components/dashboard/TrafficChart";
import ActivityChart from "../../components/dashboard/ActivityChart";
import RecentOrdersTable from "../../components/dashboard/RecentOrdersTable";
import { Download, CalendarDays } from "lucide-react";

const DashboardPage = () => {
  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-surface-900 tracking-tight">
            Overview
          </h1>
          <p className="text-[13px] text-surface-400 mt-0.5">
            Welcome back. Here's what's happening with your business.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary">
            <CalendarDays className="w-4 h-4" strokeWidth={1.75} />
            <span className="hidden sm:inline">Last 30 days</span>
          </button>
          <button className="btn-primary">
            <Download className="w-4 h-4" strokeWidth={1.75} />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <StatsCard key={stat.id} stat={stat} index={index} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <TrafficChart />
        </div>
      </div>

      {/* Orders & Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <RecentOrdersTable />
        </div>
        <div>
          <ActivityChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
