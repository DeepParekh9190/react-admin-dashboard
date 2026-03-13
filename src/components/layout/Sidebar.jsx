import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  ShoppingCart,
  Package,
  MessageSquare,
  Calendar,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  HelpCircle,
  Zap,
  ChevronsUpDown,
} from "lucide-react";
import { sidebarNavigation } from "../../data/mockData";

const iconMap = {
  LayoutDashboard,
  BarChart3,
  Users,
  ShoppingCart,
  Package,
  MessageSquare,
  Calendar,
  Settings,
};

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-white border-r border-surface-150 z-40 flex flex-col transition-all duration-200 ease-smooth ${
        isCollapsed ? "w-[60px]" : "w-[240px]"
      }`}
    >
      {/* Workspace Switcher */}
      <div className="h-14 px-3 flex items-center border-b border-surface-100">
        <div className={`flex items-center gap-2.5 w-full ${isCollapsed ? "justify-center" : ""}`}>
          <div className="w-7 h-7 bg-surface-900 rounded-lg flex items-center justify-center flex-shrink-0">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex items-center justify-between flex-1 min-w-0">
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-surface-900 truncate leading-tight">
                  Velocity
                </p>
                <p className="text-[11px] text-surface-400 leading-tight">
                  Pro Plan
                </p>
              </div>
              <ChevronsUpDown className="w-3.5 h-3.5 text-surface-400 flex-shrink-0" />
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-3 overflow-y-auto">
        {!isCollapsed && (
          <p className="px-2.5 mb-1.5 text-[11px] font-medium text-surface-400 uppercase tracking-wider">
            Menu
          </p>
        )}
        <div className="space-y-0.5">
          {sidebarNavigation.map((item) => {
            const Icon = iconMap[item.icon];
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={`sidebar-item ${
                  isActive ? "sidebar-item-active" : "sidebar-item-inactive"
                } ${isCollapsed ? "justify-center px-0" : ""}`}
                title={isCollapsed ? item.name : ""}
              >
                <Icon
                  className={`w-[18px] h-[18px] flex-shrink-0 ${
                    isActive ? "text-surface-900" : "text-surface-400"
                  }`}
                  strokeWidth={isActive ? 2 : 1.75}
                />
                {!isCollapsed && (
                  <>
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="ml-auto text-[11px] font-semibold text-surface-400 bg-surface-100 w-5 h-5 rounded-md flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="px-2 py-3 border-t border-surface-100 space-y-0.5">
        <button
          className={`sidebar-item sidebar-item-inactive w-full ${
            isCollapsed ? "justify-center px-0" : ""
          }`}
        >
          <HelpCircle className="w-[18px] h-[18px] flex-shrink-0 text-surface-400" strokeWidth={1.75} />
          {!isCollapsed && <span>Support</span>}
        </button>
        <button
          className={`sidebar-item text-surface-500 hover:text-red-600 hover:bg-red-50 w-full ${
            isCollapsed ? "justify-center px-0" : ""
          }`}
        >
          <LogOut className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={1.75} />
          {!isCollapsed && <span>Log out</span>}
        </button>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-[72px] w-6 h-6 bg-white border border-surface-200 rounded-full flex items-center justify-center shadow-xs hover:shadow-subtle hover:border-surface-300 transition-all duration-150 z-50"
      >
        {isCollapsed ? (
          <ChevronRight className="w-3 h-3 text-surface-500" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-surface-500" />
        )}
      </button>
    </aside>
  );
};

export default Sidebar;
