import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { trafficSourcesData } from "../../data/mockData";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-surface-900 rounded-lg shadow-elevated px-3 py-2">
      <div className="flex items-center gap-2">
        <div
          className="w-[6px] h-[6px] rounded-full"
          style={{ backgroundColor: payload[0].payload.color }}
        />
        <span className="text-[12px] text-surface-300">
          {payload[0].name}
        </span>
        <span className="text-[12px] font-medium text-white">
          {payload[0].value}%
        </span>
      </div>
    </div>
  );
};

const COLORS = ["#635bff", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6"];

const TrafficChart = () => {
  return (
    <div className="bg-white rounded-xl border border-surface-150 animate-in-up h-full flex flex-col">
      <div className="px-5 pt-5 pb-2">
        <h3 className="text-[14px] font-semibold text-surface-900">
          Traffic Sources
        </h3>
        <p className="text-[12px] text-surface-400 mt-0.5">Visitor origins</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-5 pb-2">
        <div className="h-[180px] w-[180px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={trafficSourcesData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {trafficSourcesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-xl font-semibold text-surface-900">100%</p>
            <p className="text-[10px] text-surface-400 uppercase tracking-wider font-medium">
              Total
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 py-3.5 border-t border-surface-100 space-y-2.5">
        {trafficSourcesData.map((source, i) => (
          <div key={source.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: COLORS[i] }}
              />
              <span className="text-[13px] text-surface-600">
                {source.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-16 h-1.5 bg-surface-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${source.value}%`, backgroundColor: COLORS[i] }}
                />
              </div>
              <span className="text-[12px] font-medium text-surface-900 w-8 text-right tabular-nums">
                {source.value}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrafficChart;
