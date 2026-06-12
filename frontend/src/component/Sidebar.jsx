import React, { useState } from "react";
import Loader from "./Loader";
import { useTodoStore } from "../store/useTodoStore";
import {
  LayoutDashboard,
  AlertCircle,
  CheckSquare,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Sidebar = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // All hooks must be declared before any return statement
  const [navigationItems, setNavigationItems] = useState([
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      active: true,
      href: "/",
    },
    {
      icon: AlertCircle,
      label: "Vital Task",
      active: false,
      href: "/vitaltask",
    },
    {
      icon: CheckSquare,
      label: "My Task",
      active: false,
      href: "/mytask",
    },
    {
      icon: Settings,
      label: "Settings",
      active: false,
      href: "/setting",
    },
    {
      icon: HelpCircle,
      label: "Help",
      active: false,
      href: "/help",
    },
  ]);

  const { user, logout } = useTodoStore();

  const handleActive = (index) => {
    setNavigationItems((prev) =>
      prev.map((item, idx) => ({
        ...item,
        active: idx === index,
      }))
    );
  };

  const logoutHandler = async () => {
    if (loading) return;

    setLoading(true);

    try {
      await logout();


      navigate("/signup", {
        replace: true,
      });
    } catch (error) {
      console.error("Logout failed:", error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to logout. Please try again.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <aside className="w-64 min-h-screen bg-rose-500 text-white flex flex-col justify-between p-6 relative shrink-0">
        <div>
          {/* User Profile */}
          <div className="flex flex-col items-center text-center mt-4 mb-8">
            <Link
              to="/profile"
              className="relative w-20 h-20 rounded-full border-4 border-white/20 overflow-hidden mb-3"
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </Link>

            <h2 className="font-bold text-base tracking-wide capitalize">
              {user?.name || "User"}
            </h2>

            <p className="text-xs text-rose-100 opacity-80">
              {user?.email || ""}
            </p>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {navigationItems.map((item, idx) => (
              <Link
                key={idx}
                to={item.href}
                onClick={() => handleActive(idx)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-150 ${
                  item.active
                    ? "bg-white text-rose-500 shadow-md translate-x-2"
                    : "hover:bg-white/10 text-rose-50"
                }`}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout */}
        <button
          onClick={logoutHandler}
          disabled={loading}
          className="w-full flex items-center gap-4 px-4 py-3 text-sm font-semibold text-rose-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors mt-auto"
        >
          <LogOut className="h-5 w-5" />
          <span>{loading ? "Logging out..." : "Logout"}</span>
        </button>
      </aside>
    </div>
  );
};

export default Sidebar;