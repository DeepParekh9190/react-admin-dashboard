import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import UsersPage from "./pages/Users/UsersPage";
import { Construction } from "lucide-react";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="analytics" element={<PlaceholderPage title="Analytics" />} />
          <Route path="orders" element={<PlaceholderPage title="Orders" />} />
          <Route path="products" element={<PlaceholderPage title="Products" />} />
          <Route path="messages" element={<PlaceholderPage title="Messages" />} />
          <Route path="calendar" element={<PlaceholderPage title="Calendar" />} />
          <Route path="settings" element={<PlaceholderPage title="Settings" />} />
        </Route>
      </Routes>
    </Router>
  );
}

function PlaceholderPage({ title }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in">
      <div className="w-10 h-10 bg-surface-100 rounded-xl flex items-center justify-center mb-4">
        <Construction className="w-5 h-5 text-surface-400" strokeWidth={1.75} />
      </div>
      <h1 className="text-lg font-semibold text-surface-900">{title}</h1>
      <p className="text-[13px] text-surface-400 mt-1">This section is under development.</p>
    </div>
  );
}

export default App;
