import React, { useState } from 'react'
import { useTodoStore } from '../store/useTodoStore';
import {
    LayoutDashboard,
    AlertCircle,
    CheckSquare,
    FolderHeart,
    Settings,
    HelpCircle,
    LogOut,
    Search,
    Bell,
    Calendar,
    Plus,
    MoreHorizontal
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [loading, setLoading] = useState(false);

    const { user, logout } = useTodoStore();

    const logoutHandler = async () => {

        setLoading(true);
        try {
            await logout();
            setLoading(false);
        } catch (error) {
            console.log(error.response)
            toast.error(error.message);
        } finally {
            setLoading(false)
        }
    }
    // Mock data to match the layout in image_5fa017.png
    const navigationItems = [
        { icon: LayoutDashboard, label: 'Dashboard', active: true },
        { icon: AlertCircle, label: 'Vital Task', active: false },
        { icon: CheckSquare, label: 'My Task', active: false },
        { icon: FolderHeart, label: 'Task Categories', active: false },
        { icon: Settings, label: 'Settings', active: false },
        { icon: HelpCircle, label: 'Help', active: false },
    ];
    return (
        <div> {/* ================= SIDEBAR NAV ================= */}
            <aside className="w-64 h-full bg-rose-500 text-white flex flex-col justify-between p-6 relative shrink-0">
                <div>
                    {/* User Profile Summary */}
                    <div className="flex flex-col items-center text-center mt-4 mb-8">
                        <Link to={"/profile"} className="relative w-20 h-20 rounded-full border-4 border-white/20 overflow-hidden mb-3">
                            <img
                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                                alt="User Profile"
                                className="w-full h-full object-cover"
                            />
                        </Link>
                        <h2 className="font-bold text-base tracking-wide">{user.name}</h2>
                        <p className="text-xs text-rose-100 opacity-80">{user.email}</p>
                    </div>

                    {/* Navigation Links */}
                    <nav className="space-y-1">
                        {navigationItems.map((item, idx) => (
                            <button
                                key={idx}
                                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-150 ${item.active
                                    ? 'bg-white text-rose-500 shadow-md translate-x-2'
                                    : 'hover:bg-white/10 text-rose-50'
                                    }`}
                            >
                                <item.icon className="h-5 w-5 shrink-0" />
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Logout Action */}
                <button onClick={logoutHandler} className="w-full flex items-center gap-4 px-4 py-3 text-sm font-semibold text-rose-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors mt-auto">
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                </button>
            </aside></div>
    )
}

export default Sidebar