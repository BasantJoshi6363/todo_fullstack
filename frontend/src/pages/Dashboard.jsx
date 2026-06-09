import React, { useState } from 'react';
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
import ActionButton from '../component/ActionButton';
import { useTodoStore } from '../store/useTodoStore';
import { Link } from 'react-router-dom';
import Sidebar from '../component/Sidebar';
const Dashboard = () => {


    const todoTasks = [
        {
            id: 1,
            title: "Attend Nischal's Birthday Party",
            description: "Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements)....",
            priority: "Moderate",
            status: "Not Started",
            date: "20/06/2023",
            img: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=150&auto=format&fit=crop&q=60"
        },
        {
            id: 2,
            title: "Landing Page Design for TravelDays",
            description: "Get the work done by EOD and discuss with client before leaving. (4 PM | Meeting Room)",
            priority: "Moderate",
            status: "In Progress",
            date: "20/06/2023",
            img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=150&auto=format&fit=crop&q=60"
        }
    ];

    const completedTasks = [
        { id: 1, title: "Walk the dog", desc: "Take the dog to the park and bring treats as well.", time: "Completed 2 days ago.", img: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=150&auto=format&fit=crop&q=60" },
        { id: 2, title: "Conduct meeting", desc: "Meet with the client and finalize requirements.", time: "Completed 2 days ago.", img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=150&auto=format&fit=crop&q=60" }
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans antialiased text-gray-700">

            <Sidebar />

            {/* ================= MAIN CONTENT CONTAINER ================= */}
            <main className="flex-1 flex flex-col overflow-y-auto max-h-screen">

                {/* Top Header Controls Bar */}
                <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between shadow-sm shrink-0">
                    <h1 className="text-2xl font-black text-gray-800 tracking-tight">Dashboard</h1>

                    {/* Centralized Search Bar */}
                    <div className="relative w-96 mx-4">
                        <input
                            type="text"
                            placeholder="Search your task here..."
                            className="w-full bg-slate-50 border border-gray-200 pl-4 pr-10 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 focus:bg-white transition-all placeholder-gray-400"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-rose-400 text-white rounded-md hover:bg-rose-500 transition-colors">
                            <Search className="h-3.5 w-3.5" />
                        </button>
                    </div>

                    {/* Context Utility Icons & Date Indicator */}
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-rose-400 hover:bg-rose-50 rounded-lg transition-colors relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
                        </button>
                        <button className="p-2 text-rose-400 hover:bg-rose-50 rounded-lg transition-colors">
                            <Calendar className="h-5 w-5" />
                        </button>
                        <div className="text-right border-l border-gray-200 pl-4">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tuesday</p>
                            <p className="text-xs font-black text-blue-400">20/06/2023</p>
                        </div>
                    </div>
                </header>

                {/* Lower Workspace Body Container */}
                <div className="p-8 space-y-6 flex-1">

                    {/* Welcome Dashboard Banner Line */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <h2 className="text-2xl font-bold text-gray-800">Welcome back, Sundar</h2>
                            <span className="text-2xl animate-bounce">👋</span>
                        </div>

                        {/* Shared Profile Avatars & Invite Action Button Layout */}
                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-2 overflow-hidden">
                                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100" alt="" />
                                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" alt="" />
                                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" alt="" />
                            </div>
                            <ActionButton icon={Plus} text="Invite" variant="outline" />
                        </div>
                    </div>

                    {/* Three Column Task Status Grid Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                        {/* Column 1 & 2 Composite Stack: To-Do & In Progress List View */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* To-Do Workspace Block Container */}
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                                        <span>📋</span>
                                        <span>To-Do</span>
                                        <span className="text-xs font-normal text-gray-400 ml-1">20 June • Today</span>
                                    </div>
                                    <ActionButton icon={Plus} text="Add task" variant="text" />
                                </div>

                                {/* Vertical Task Cards List Container */}
                                <div className="space-y-4">
                                    {todoTasks.map((task) => (
                                        <div key={task.id} className="border border-gray-100 rounded-xl p-4 bg-white hover:shadow-md transition-shadow relative flex gap-4">
                                            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </button>

                                            {/* Left Circular Bullet Target */}
                                            <span className={`w-3 h-3 rounded-full border-2 mt-1 shrink-0 ${task.id === 1 ? 'border-rose-400' : 'border-blue-400'}`} />

                                            <div className="flex-1 space-y-2">
                                                <h4 className="font-bold text-gray-800 text-sm pr-6">{task.title}</h4>
                                                <p className="text-xs text-gray-400 leading-relaxed pr-4">{task.description}</p>

                                                {/* Meta Metadata Labels row alignment */}
                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-[10px] font-bold">
                                                    <span className="text-gray-400">Priority: <span className="text-blue-400">Moderate</span></span>
                                                    <span className="text-gray-400">Status: <span className={task.status === 'Not Started' ? 'text-rose-400' : 'text-blue-400'}>{task.status}</span></span>
                                                    <span className="text-gray-300 font-normal">Created on: {task.date}</span>
                                                </div>
                                            </div>

                                            {/* Visual Graphic Thumbnail Attachment if present */}
                                            <div className="w-20 h-16 rounded-lg overflow-hidden shrink-0 self-center border border-gray-100">
                                                <img src={task.img} alt="Task target clip" className="w-full h-full object-cover" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Dynamic Presentation Component Row */}
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-2 text-blue-500 font-bold text-sm">
                                        <span className="w-3 h-3 rounded-full border-2 border-blue-500" />
                                        <span>Presentation on Final Product</span>
                                    </div>
                                    <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="h-4 w-4" /></button>
                                </div>
                                <div className="flex gap-4">
                                    <p className="text-xs text-gray-400 leading-relaxed flex-1">
                                        Make sure everything is functioning and all the necessities are properly met. Prepare the team and get the documents ready for...
                                    </p>
                                    <div className="w-20 h-16 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                                        <img src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=150" alt="presentation mockup" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 pt-4 text-[10px] font-bold border-t border-gray-50 mt-4">
                                    <span className="text-gray-400">Priority: <span className="text-blue-400">Moderate</span></span>
                                    <span className="text-gray-400">Status: <span className="text-blue-400">In Progress</span></span>
                                    <span className="text-gray-300 font-normal">Created on: 19/06/2023</span>
                                </div>
                            </div>
                        </div>

                        {/* Column 3 Stack: Analytics Progress Gauges & Completed Log Block */}
                        <div className="space-y-6">

                            {/* Circular KPI Percentage Metric Progress Card Block */}
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-6">Task Status</h3>

                                <div className="grid grid-cols-3 gap-2 text-center">
                                    {/* Gauge 1: Completed */}
                                    <div className="flex flex-col items-center">
                                        <div className="relative w-16 h-16 flex items-center justify-center rounded-full border-[6px] border-emerald-500 border-t-emerald-500/20">
                                            <span className="text-xs font-bold text-gray-700">84%</span>
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-500 mt-2 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Completed
                                        </span>
                                    </div>

                                    {/* Gauge 2: In Progress */}
                                    <div className="flex flex-col items-center">
                                        <div className="relative w-16 h-16 flex items-center justify-center rounded-full border-[6px] border-blue-500 border-l-blue-500/20">
                                            <span className="text-xs font-bold text-gray-700">46%</span>
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-500 mt-2 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> In Progress
                                        </span>
                                    </div>

                                    {/* Gauge 3: Not Started */}
                                    <div className="flex flex-col items-center">
                                        <div className="relative w-16 h-16 flex items-center justify-center rounded-full border-[6px] border-rose-500 border-b-rose-500/20">
                                            <span className="text-xs font-bold text-gray-700">13%</span>
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-500 mt-2 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Not Started
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Historical Archive Completed Feed List Workspace */}
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                                <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                                    <span>☑️</span>
                                    <span>Completed Task</span>
                                </div>

                                <div className="space-y-3">
                                    {completedTasks.map((task) => (
                                        <div key={task.id} className="border border-gray-50 rounded-xl p-3 bg-slate-50/50 hover:bg-slate-50 transition-colors flex gap-3 relative">
                                            <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
                                                <MoreHorizontal className="h-3.5 w-3.5" />
                                            </button>
                                            <span className="w-2.5 h-2.5 rounded-full border-2 border-emerald-500 mt-1 shrink-0" />
                                            <div className="flex-1 space-y-1">
                                                <h4 className="font-bold text-gray-800 text-xs line-through opacity-70">{task.title}</h4>
                                                <p className="text-[11px] text-gray-400 leading-relaxed pr-4">{task.desc}</p>
                                                <div className="flex items-center justify-between pt-1">
                                                    <span className="text-[9px] text-emerald-500 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">Status: Completed</span>
                                                    <span className="text-[9px] text-gray-400 italic">{task.time}</span>
                                                </div>
                                            </div>
                                            <div className="w-14 h-12 rounded-md overflow-hidden shrink-0 self-center border border-gray-100">
                                                <img src={task.img} alt="Completed target capture" className="w-full h-full object-cover" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Dashboard;