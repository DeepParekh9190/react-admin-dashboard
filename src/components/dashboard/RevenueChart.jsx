import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { revenueChartData } from "../../data/mockData";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-surface-900 rounded-lg shadow-elevated px-3.5 py-2.5 min-w-[150px]">
      <p className="text-[11px] font-medium text-surface-400 mb-1.5">{label}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center justify-between gap-4 py-0.5">
          <div className="flex items-center gap-1.5">
            <div
              className="w-[6px] h-[6px] rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-[12px] text-surface-300 capitalize">
              {entry.dataKey}
            </span>
          </div>
          <span className="text-[12px] font-medium text-white">
            ${entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

const RevenueChart = () => {
  const [activeFilter, setActiveFilter] = useState("12M");
  const filters = ["7D", "1M", "3M", "12M"];

  return (
    <div className="bg-white rounded-xl border border-surface-150 animate-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 pt-5 pb-4">
        <div>
          <h3 className="text-[14px] font-semibold text-surface-900">Revenue</h3>
          <p className="text-[12px] text-surface-400 mt-0.5">
            Monthly revenue and profit overview
          </p>
        </div>

        <div className="flex items-center gap-0.5 bg-surface-100 rounded-lg p-0.5">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-2.5 py-1 rounded-md text-[12px] font-medium transition-all duration-150 ${
                activeFilter === filter
                  ? "bg-white text-surface-900 shadow-xs"
                  : "text-surface-500 hover:text-surface-700"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[300px] px-2 pb-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={revenueChartData}
            margin={{ top: 5, right: 20, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#635bff" stopOpacity={0.08} />
                <stop offset="100%" stopColor="#635bff" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.08} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="none"
              stroke="#f5f5f5"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#a3a3a3", fontSize: 12 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#a3a3a3", fontSize: 12 }}
              tickFormatter={(value) => `$${value / 1000}k`}
              dx={-4}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#e5e5e5", strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#635bff"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              dot={false}
              activeDot={{
                r: 4,
                stroke: "#635bff",
                strokeWidth: 2,
                fill: "#fff",
              }}
            />
            <Area
              type="monotone"
              dataKey="profit"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorProfit)"
              dot={false}
              activeDot={{
                r: 4,
                stroke: "#10b981",
                strokeWidth: 2,
                fill: "#fff",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-5 px-5 py-3 border-t border-surface-100">
        <div className="flex items-center gap-1.5">
          <div className="w-[10px] h-[3px] rounded-full bg-brand-500" />
          <span className="text-[12px] text-surface-500">Revenue</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-[10px] h-[3px] rounded-full bg-emerald-500" />
          <span className="text-[12px] text-surface-500">Profit</span>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
