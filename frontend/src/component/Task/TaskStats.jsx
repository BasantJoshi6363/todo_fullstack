import React from 'react';

const TaskStats = ({ stats }) => {
    const radius = 24;
    const circumference = 2 * Math.PI * radius;

    // Helper to calculate the offset based on percentage
    const getOffset = (percent) => {
        const safePercent = Math.min(100, Math.max(0, percent || 0));
        return circumference - (safePercent / 100) * circumference;
    };

    return (
        <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-6">Task Status</h3>
            
            <div className="flex gap-8 justify-start items-center">
                {/* COMPLETED GAUGE */}
                <div className="flex flex-col items-center">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            {/* Gray Background Track */}
                            <circle
                                cx="50%" cy="50%" r={radius}
                                stroke="#ecfdf5" strokeWidth="6" fill="transparent"
                            />
                            {/* Dynamic Emerald Progress */}
                            <circle
                                cx="50%" cy="50%" r={radius}
                                stroke="#10b981" strokeWidth="6" fill="transparent"
                                strokeDasharray={circumference}
                                strokeDashoffset={getOffset(stats.finishPercent)}
                                strokeLinecap="round"
                                className="transition-all duration-700 ease-in-out"
                            />
                        </svg>
                        <span className="absolute text-xs sm:text-sm font-bold text-gray-700">
                            {Math.round(stats.finishPercent)}%
                        </span>
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 mt-2 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" /> Completed
                    </span>
                </div>

                {/* NOT STARTED GAUGE */}
                <div className="flex flex-col items-center">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            {/* Gray Background Track */}
                            <circle
                                cx="50%" cy="50%" r={radius}
                                stroke="#fff1f2" strokeWidth="6" fill="transparent"
                            />
                            {/* Dynamic Rose Progress */}
                            <circle
                                cx="50%" cy="50%" r={radius}
                                stroke="#f43f5e" strokeWidth="6" fill="transparent"
                                strokeDasharray={circumference}
                                strokeDashoffset={getOffset(stats.notFinishPercent)}
                                strokeLinecap="round"
                                className="transition-all duration-700 ease-in-out"
                            />
                        </svg>
                        <span className="absolute text-xs sm:text-sm font-bold text-gray-700">
                            {Math.round(stats.notFinishPercent)}%
                        </span>
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 mt-2 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-500" /> Not Started
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TaskStats;