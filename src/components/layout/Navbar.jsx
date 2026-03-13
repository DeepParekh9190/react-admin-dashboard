import { useState, useRef, useEffect } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  Settings,
  User,
  LogOut,
  CheckCheck,
  ShoppingCart,
  DollarSign,
  UserPlus,
  AlertTriangle,
  Info,
  Command,
} from "lucide-react";
import { notificationsData } from "../../data/mockData";

const notifIconMap = {
  order: ShoppingCart,
  payment: DollarSign,
  user: UserPlus,
  alert: AlertTriangle,
  system: Info,
};

const notifDotColor = {
  order: "bg-blue-500",
  payment: "bg-emerald-500",
  user: "bg-violet-500",
  alert: "bg-red-500",
  system: "bg-surface-400",
};

const Navbar = ({ onMenuClick }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState(notificationsData);
  const [searchQuery, setSearchQuery] = useState("");

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <header className="sticky top-0 z-30 h-14 bg-white border-b border-surface-150">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-1.5 rounded-lg text-surface-500 hover:bg-surface-50 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search */}
          <div className="hidden sm:flex items-center relative">
            <Search className="absolute left-3 w-4 h-4 text-surface-400" strokeWidth={1.75} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-56 lg:w-72 pl-9 pr-16 py-[7px] bg-surface-50 border border-surface-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-brand-500/15 focus:border-brand-400 focus:bg-white transition-all duration-150 placeholder:text-surface-400"
            />
            <div className="absolute right-2 flex items-center gap-0.5">
              <kbd className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium text-surface-400 bg-white border border-surface-200 rounded shadow-xs">
                <Command className="w-2.5 h-2.5 mr-0.5" />K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-1">
          {/* Mobile Search */}
          <button className="sm:hidden p-2 rounded-lg text-surface-500 hover:bg-surface-50 transition-colors">
            <Search className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </button>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfile(false);
              }}
              className="relative p-2 rounded-lg text-surface-500 hover:bg-surface-50 transition-colors"
            >
              <Bell className="w-[18px] h-[18px]" strokeWidth={1.75} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-[7px] h-[7px] bg-brand-500 rounded-full ring-[1.5px] ring-white" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-1.5 w-80 sm:w-[380px] bg-white rounded-xl shadow-dropdown border border-surface-150 overflow-hidden animate-in-scale origin-top-right">
                <div className="flex items-center justify-between px-4 py-3 border-b border-surface-100">
                  <h3 className="text-[13px] font-semibold text-surface-900">
                    Notifications
                    {unreadCount > 0 && (
                      <span className="ml-1.5 text-[11px] font-medium text-surface-400">
                        {unreadCount} new
                      </span>
                    )}
                  </h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-[12px] text-brand-600 hover:text-brand-700 font-medium"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-[340px] overflow-y-auto divide-y divide-surface-50">
                  {notifications.map((notif) => {
                    const Icon = notifIconMap[notif.type] || Info;
                    return (
                      <div
                        key={notif.id}
                        className={`px-4 py-3 hover:bg-surface-50 cursor-pointer transition-colors ${
                          !notif.read ? "bg-brand-50/30" : ""
                        }`}
                      >
                        <div className="flex gap-3">
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${notifDotColor[notif.type]}`} />
                          <div className="min-w-0 flex-1">
                            <p className="text-[13px] font-medium text-surface-900 leading-snug">
                              {notif.title}
                            </p>
                            <p className="text-[12px] text-surface-500 mt-0.5 leading-snug">
                              {notif.message}
                            </p>
                            <p className="text-[11px] text-surface-400 mt-1">
                              {notif.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="px-4 py-2.5 border-t border-surface-100 bg-surface-50/50">
                  <button className="text-[12px] text-brand-600 hover:text-brand-700 font-medium w-full text-center">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="w-px h-5 bg-surface-150 mx-1.5 hidden sm:block" />

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-surface-50 transition-colors"
            >
              <div className="w-7 h-7 bg-brand-500 rounded-full flex items-center justify-center">
                <span className="text-[11px] font-semibold text-white">A</span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-[13px] font-medium text-surface-900 leading-tight">
                  Admin
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-surface-400 hidden md:block" />
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-1.5 w-52 bg-white rounded-xl shadow-dropdown border border-surface-150 overflow-hidden animate-in-scale origin-top-right">
                <div className="px-3 py-2.5 border-b border-surface-100">
                  <p className="text-[13px] font-semibold text-surface-900">
                    Admin User
                  </p>
                  <p className="text-[12px] text-surface-400">
                    admin@velocity.io
                  </p>
                </div>
                <div className="py-1">
                  {[
                    { icon: User, label: "Profile" },
                    { icon: Settings, label: "Settings" },
                  ].map((item) => (
                    <button
                      key={item.label}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-surface-600 hover:bg-surface-50 hover:text-surface-900 transition-colors"
                    >
                      <item.icon className="w-4 h-4" strokeWidth={1.75} />
                      {item.label}
                    </button>
                  ))}
                </div>
                <div className="py-1 border-t border-surface-100">
                  <button className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut className="w-4 h-4" strokeWidth={1.75} />
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
