import {
  Users,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const iconMap = { Users, DollarSign, ShoppingCart, TrendingUp };

const StatsCard = ({ stat, index }) => {
  const Icon = iconMap[stat.icon];
  const isPositive = stat.changeType === "positive";

  return (
    <div
      className="bg-white rounded-xl p-5 border border-surface-150 hover:border-surface-200 transition-colors duration-150 animate-in-up"
      style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-[13px] font-medium text-surface-500">{stat.title}</p>
        <Icon className="w-4 h-4 text-surface-400" strokeWidth={1.75} />
      </div>

      <div className="flex items-end justify-between">
        <p className="text-2xl font-semibold text-surface-900 tracking-tight">
          {stat.value}
        </p>
        <div
          className={`flex items-center gap-0.5 text-[12px] font-medium ${
            isPositive ? "text-emerald-600" : "text-red-500"
          }`}
        >
          {isPositive ? (
            <ArrowUpRight className="w-3.5 h-3.5" />
          ) : (
            <ArrowDownRight className="w-3.5 h-3.5" />
          )}
          {stat.change}
        </div>
      </div>
      <p className="text-[11px] text-surface-400 mt-1">{stat.period}</p>
    </div>
  );
};

export default StatsCard;
