import { useState, useMemo } from "react";
import { usersData } from "../../data/mockData";
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Download,
  ChevronDown,
  X,
} from "lucide-react";

const avatarColors = [
  "bg-brand-100 text-brand-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-violet-100 text-violet-700",
  "bg-pink-100 text-pink-700",
  "bg-cyan-100 text-cyan-700",
  "bg-rose-100 text-rose-700",
  "bg-blue-100 text-blue-700",
  "bg-teal-100 text-teal-700",
  "bg-orange-100 text-orange-700",
];

const roleBadge = {
  Admin: "bg-red-50 text-red-700",
  Editor: "bg-blue-50 text-blue-700",
  Viewer: "bg-surface-100 text-surface-600",
};

const UsersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const roles = ["All", "Admin", "Editor", "Viewer"];
  const statuses = ["All", "Active", "Inactive"];

  const filteredUsers = useMemo(() => {
    return usersData.filter((user) => {
      const matchesSearch =
        searchQuery === "" ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.department.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = roleFilter === "All" || user.role === roleFilter;
      const matchesStatus = statusFilter === "All" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [searchQuery, roleFilter, statusFilter]);

  const activeFilters = [roleFilter, statusFilter].filter((f) => f !== "All").length;

  const clearFilters = () => {
    setRoleFilter("All");
    setStatusFilter("All");
    setSearchQuery("");
  };

  return (
    <div className="space-y-5 animate-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-surface-900 tracking-tight">
            Users
          </h1>
          <p className="text-[13px] text-surface-400 mt-0.5">
            Manage team members and their account permissions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary">
            <Download className="w-4 h-4" strokeWidth={1.75} />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button className="btn-primary">
            <Plus className="w-4 h-4" strokeWidth={2} />
            Add user
          </button>
        </div>
      </div>

      {/* Summary stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total", value: usersData.length },
          { label: "Active", value: usersData.filter((u) => u.status === "Active").length },
          { label: "Inactive", value: usersData.filter((u) => u.status === "Inactive").length },
          { label: "Admins", value: usersData.filter((u) => u.role === "Admin").length },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-xl px-4 py-3.5 border border-surface-150"
          >
            <p className="text-[12px] text-surface-400 font-medium">{s.label}</p>
            <p className="text-lg font-semibold text-surface-900 mt-0.5 tabular-nums">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-surface-150 overflow-hidden">
        {/* Toolbar */}
        <div className="px-4 py-3 border-b border-surface-100">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" strokeWidth={1.75} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users..."
                className="input-field pl-9"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`btn-secondary ${
                  showFilters || activeFilters > 0
                    ? "!border-brand-300 !text-brand-700 !bg-brand-50"
                    : ""
                }`}
              >
                <Filter className="w-4 h-4" strokeWidth={1.75} />
                Filters
                {activeFilters > 0 && (
                  <span className="ml-0.5 w-4 h-4 bg-brand-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                    {activeFilters}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="flex flex-wrap items-end gap-4 mt-3 pt-3 border-t border-surface-100 animate-slide-down">
              <div>
                <label className="text-[11px] font-medium text-surface-400 uppercase tracking-wider block mb-1">
                  Role
                </label>
                <div className="flex gap-0.5 bg-surface-100 rounded-lg p-0.5">
                  {roles.map((role) => (
                    <button
                      key={role}
                      onClick={() => setRoleFilter(role)}
                      className={`px-2.5 py-1 rounded-md text-[12px] font-medium transition-all duration-100 ${
                        roleFilter === role
                          ? "bg-white text-surface-900 shadow-xs"
                          : "text-surface-500 hover:text-surface-700"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium text-surface-400 uppercase tracking-wider block mb-1">
                  Status
                </label>
                <div className="flex gap-0.5 bg-surface-100 rounded-lg p-0.5">
                  {statuses.map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-2.5 py-1 rounded-md text-[12px] font-medium transition-all duration-100 ${
                        statusFilter === status
                          ? "bg-white text-surface-900 shadow-xs"
                          : "text-surface-500 hover:text-surface-700"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {activeFilters > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-[12px] text-red-500 hover:text-red-600 font-medium flex items-center gap-0.5 mb-1"
                >
                  <X className="w-3 h-3" />
                  Clear
                </button>
              )}
            </div>
          )}
        </div>

        {/* Count */}
        <div className="px-4 py-2 bg-surface-50/60 border-b border-surface-100">
          <p className="text-[12px] text-surface-500">
            <span className="font-medium text-surface-700">{filteredUsers.length}</span>
            {" "}of{" "}
            <span className="font-medium text-surface-700">{usersData.length}</span>
            {" "}users
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr>
                <th className="th-cell w-10">
                  <input type="checkbox" className="w-3.5 h-3.5 rounded border-surface-300 text-brand-600 focus:ring-brand-500/20" />
                </th>
                <th className="th-cell">Name</th>
                <th className="th-cell">Role</th>
                <th className="th-cell">Department</th>
                <th className="th-cell">Status</th>
                <th className="th-cell">Last active</th>
                <th className="th-cell w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <p className="text-[13px] font-medium text-surface-900">
                      No results found
                    </p>
                    <p className="text-[12px] text-surface-400 mt-1">
                      Try adjusting your search or filters
                    </p>
                    <button
                      onClick={clearFilters}
                      className="mt-3 text-[12px] text-brand-600 hover:text-brand-700 font-medium"
                    >
                      Clear all filters
                    </button>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className="hover:bg-surface-50/50 transition-colors group"
                  >
                    <td className="td-cell">
                      <input type="checkbox" className="w-3.5 h-3.5 rounded border-surface-300 text-brand-600 focus:ring-brand-500/20" />
                    </td>
                    <td className="td-cell">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center ${
                            avatarColors[index % avatarColors.length]
                          }`}
                        >
                          <span className="text-[10px] font-semibold">
                            {user.avatar}
                          </span>
                        </div>
                        <div>
                          <p className="text-[13px] font-medium text-surface-900 leading-tight">
                            {user.name}
                          </p>
                          <p className="text-[11px] text-surface-400 leading-tight">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="td-cell">
                      <span className={`badge ${roleBadge[user.role]}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="td-cell">
                      <span className="text-[13px] text-surface-600">
                        {user.department}
                      </span>
                    </td>
                    <td className="td-cell">
                      <div className="flex items-center gap-1.5">
                        <div
                          className={`w-[6px] h-[6px] rounded-full ${
                            user.status === "Active" ? "bg-emerald-500" : "bg-surface-300"
                          }`}
                        />
                        <span className="text-[13px] text-surface-600">
                          {user.status}
                        </span>
                      </div>
                    </td>
                    <td className="td-cell">
                      <span className="text-[13px] text-surface-500">
                        {user.lastActive}
                      </span>
                    </td>
                    <td className="td-cell">
                      <button className="p-1 rounded-md text-surface-400 hover:text-surface-600 hover:bg-surface-100 transition-colors opacity-0 group-hover:opacity-100">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
