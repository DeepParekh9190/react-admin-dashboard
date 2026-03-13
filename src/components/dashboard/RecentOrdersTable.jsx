import { recentOrders } from "../../data/mockData";
import { ArrowRight, MoreHorizontal } from "lucide-react";

const statusStyles = {
  Completed: "badge-success",
  Processing: "badge-info",
  Pending: "badge-warning",
  Cancelled: "badge-danger",
};

const statusDot = {
  Completed: "bg-emerald-500",
  Processing: "bg-blue-500",
  Pending: "bg-amber-500",
  Cancelled: "bg-red-400",
};

const avatarColors = [
  "bg-brand-100 text-brand-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-violet-100 text-violet-700",
  "bg-pink-100 text-pink-700",
  "bg-cyan-100 text-cyan-700",
  "bg-rose-100 text-rose-700",
  "bg-blue-100 text-blue-700",
];

const RecentOrdersTable = () => {
  return (
    <div className="bg-white rounded-xl border border-surface-150 overflow-hidden animate-in-up">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <div>
          <h3 className="text-[14px] font-semibold text-surface-900">
            Recent Orders
          </h3>
          <p className="text-[12px] text-surface-400 mt-0.5">
            Latest transactions
          </p>
        </div>
        <button className="flex items-center gap-1 text-[13px] text-brand-600 hover:text-brand-700 font-medium transition-colors">
          View all
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px]">
          <thead>
            <tr>
              <th className="th-cell">Order</th>
              <th className="th-cell">Customer</th>
              <th className="th-cell">Amount</th>
              <th className="th-cell">Date</th>
              <th className="th-cell">Status</th>
              <th className="th-cell w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100">
            {recentOrders.map((order, index) => (
              <tr
                key={order.id}
                className="hover:bg-surface-50/50 transition-colors"
              >
                <td className="td-cell">
                  <span className="font-mono text-[13px] font-medium text-surface-900">
                    {order.id}
                  </span>
                </td>
                <td className="td-cell">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center ${
                        avatarColors[index % avatarColors.length]
                      }`}
                    >
                      <span className="text-[10px] font-semibold">
                        {order.avatar}
                      </span>
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-surface-900 leading-tight">
                        {order.customer}
                      </p>
                      <p className="text-[11px] text-surface-400 leading-tight">
                        {order.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="td-cell">
                  <span className="text-[13px] font-medium text-surface-900 tabular-nums">
                    {order.amount}
                  </span>
                </td>
                <td className="td-cell">
                  <span className="text-[13px] text-surface-500">
                    {order.date}
                  </span>
                </td>
                <td className="td-cell">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-[5px] h-[5px] rounded-full ${statusDot[order.status]}`} />
                    <span className="text-[13px] text-surface-600">
                      {order.status}
                    </span>
                  </div>
                </td>
                <td className="td-cell">
                  <button className="p-1 rounded-md text-surface-400 hover:text-surface-600 hover:bg-surface-100 transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-surface-100 bg-surface-50/40">
        <p className="text-[12px] text-surface-500">
          Showing <span className="font-medium text-surface-700">1–8</span> of{" "}
          <span className="font-medium text-surface-700">248</span>
        </p>
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, "…", 31].map((page, i) => (
            <button
              key={i}
              className={`w-7 h-7 rounded-md text-[12px] font-medium transition-colors duration-100 ${
                page === 1
                  ? "bg-surface-900 text-white"
                  : "text-surface-500 hover:bg-surface-100 hover:text-surface-700"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentOrdersTable;
