import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          isCollapsed={sidebarCollapsed}
          setIsCollapsed={setSidebarCollapsed}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-surface-950/40 backdrop-blur-[2px]"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative animate-in">
            <Sidebar isCollapsed={false} setIsCollapsed={() => {}} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        className={`transition-all duration-200 ease-smooth ${
          sidebarCollapsed ? "lg:ml-[60px]" : "lg:ml-[240px]"
        }`}
      >
        <Navbar onMenuClick={() => setMobileSidebarOpen(true)} />
        <main className="p-4 lg:p-6 max-w-[1600px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
