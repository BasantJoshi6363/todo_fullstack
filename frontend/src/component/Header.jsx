import { Bell, Calendar, Search } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import CalendarCompo from './CalendarCompo';

const Header = () => {
    const [click, setClick] = useState(false);
    const calendarRef = useRef(null);
    const date = new Date();
    const dayName = date.toLocaleDateString('en-NP', { weekday: 'long' })
    const fulldate = date.toISOString().slice(0, 10).replace(/-/g, '/');



    // Close calendar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target)) {
                setClick(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="relative bg-white border-b border-gray-100 px-4 sm:px-8 py-4 flex items-center justify-between shadow-sm shrink-0 w-full">
            {/* Title */}
            <h1 className="text-xl sm:text-2xl font-black text-gray-800 tracking-tight shrink-0">
                <span className='text-rose-500'>To-</span>Do
            </h1>

            {/* Centralized Search Bar */}
            <div className="relative flex-1 max-w-xs sm:max-w-md mx-3 sm:mx-6">
                <input
                    type="text"
                    placeholder="Search task..."
                    className="w-full bg-slate-50 border border-gray-200 pl-3 pr-10 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 focus:bg-white transition-all placeholder-gray-400"
                />
                <button className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-rose-400 text-white rounded-md hover:bg-rose-500 transition-colors">
                    <Search className="h-3.5 w-3.5" />
                </button>
            </div>

            {/* Context Utility Icons & Date Indicator */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0" ref={calendarRef}>
                {/* Notification Bell */}
                <button className="p-2 text-rose-400 hover:bg-rose-50 rounded-lg transition-colors relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
                </button>

                {/* Calendar Toggle Button */}
                <div className="relative">
                    <button
                        onClick={() => setClick(!click)}
                        className={`p-2 rounded-lg transition-colors ${click ? 'bg-rose-50 text-rose-500' : 'text-rose-400 hover:bg-rose-50'}`}
                    >
                        <Calendar className="h-5 w-5" />
                    </button>

                    {/* Popover Dropdown Styled Calendar */}
                    {click && <CalendarCompo />}
                </div>

                {/* Date Display (Always Visible & Formatted) */}
                <div className="text-right border-l border-gray-200 pl-3 sm:pl-4">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-tight">
                        {dayName}
                    </p>
                    <p className="text-xs font-black text-blue-400 tracking-wide mt-0.5">
                        {fulldate}
                    </p>
                </div>
            </div>
        </header>
    );
};

export default Header;