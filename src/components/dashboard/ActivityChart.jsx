import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { weeklyActivityData } from "../../data/mockData";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-surface-900 rounded-lg shadow-elevated px-3.5 py-2.5 min-w-[140px]">
      <p className="text-[11px] font-medium text-surface-400 mb-1.5">{label}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center justify-between gap-4 py-0.5">
          <div className="flex items-center gap-1.5">
            <div
              className="w-[6px] h-[6px] rounded-sm"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-[12px] text-surface-300">
              {entry.dataKey === "pageViews" ? "Views" : "Visitors"}
            </span>
          </div>
          <span className="text-[12px] font-medium text-white tabular-nums">
            {entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

const ActivityChart = () => {
  return (
    <div className="bg-white rounded-xl border border-surface-150 animate-in-up h-full flex flex-col">
      <div className="px-5 pt-5 pb-4">
        <h3 className="text-[14px] font-semibold text-surface-900">
          Weekly Activity
        </h3>
        <p className="text-[12px] text-surface-400 mt-0.5">
          Visitors and page views
        </p>
      </div>

      <div className="flex-1 px-2 pb-2">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart
            data={weeklyActivityData}
            margin={{ top: 0, right: 12, left: -12, bottom: 0 }}
            barGap={2}
          >
            <CartesianGrid
              strokeDasharray="none"
              stroke="#f5f5f5"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#a3a3a3", fontSize: 12 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#a3a3a3", fontSize: 12 }}
              tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : v)}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(0,0,0,0.02)", radius: 4 }}
            />
            <Bar
              dataKey="visitors"
              fill="#635bff"
              radius={[4, 4, 0, 0]}
              maxBarSize={24}
            />
            <Bar
              dataKey="pageViews"
              fill="#e0e0ff"
              radius={[4, 4, 0, 0]}
              maxBarSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-5 px-5 py-3 border-t border-surface-100">
        <div className="flex items-center gap-1.5">
          <div className="w-[10px] h-[3px] rounded-full bg-brand-500" />
          <span className="text-[12px] text-surface-500">Visitors</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-[10px] h-[3px] rounded-full bg-brand-200" />
          <span className="text-[12px] text-surface-500">Page Views</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityChart;
