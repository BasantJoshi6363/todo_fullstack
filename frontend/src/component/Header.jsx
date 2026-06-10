import { Bell, Calendar, Search } from 'lucide-react'
import React from 'react'

const Header = () => {
    return (
       
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
       
    )
}

export default Header