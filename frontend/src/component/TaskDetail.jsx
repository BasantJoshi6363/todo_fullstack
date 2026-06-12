import React from 'react';
import { Trash2, Edit3 } from 'lucide-react';

const TaskDetail = ({ task }) => {
    if (!task) {
        return (
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full flex items-center justify-center text-gray-400 text-sm">
                Select a task to view full details
            </div>
        );
    }

    const isExtreme = task.priority === 'Extreme';

    return (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm h-full flex flex-col justify-between relative min-h-[550px]">
            <div className="space-y-6">
                
                {/* Upper Profile Info Row */}
                <div className="flex gap-4 items-start">
                    {task.img && (
                        <div className="w-24 h-24 rounded-2xl overflow-hidden border border-gray-100 shrink-0">
                            <img src={task.img} alt={task.title} className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div className="space-y-1 pt-1">
                        <h3 className="text-xl font-bold text-gray-800 leading-tight">{task.title}</h3>
                        
                        <div className="text-xs font-bold pt-1 space-y-1">
                            <p className="text-gray-400">
                                Priority: <span className={isExtreme ? 'text-rose-500' : 'text-blue-500'}>{task.priority}</span>
                            </p>
                            <p className="text-gray-400">
                                Status: <span className={isExtreme ? 'text-rose-400' : 'text-blue-500'}>{task.status}</span>
                            </p>
                            <p className="text-gray-300 font-normal text-[11px] pt-1">
                                Created on: {task.date}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Comprehensive Body Content Texts */}
                <div className="space-y-4 text-xs leading-relaxed text-gray-400 font-medium">
                    <p>{task.description}</p>
                    {task.longDescription && <p>{task.longDescription}</p>}
                </div>

                {/* Context Sub-Steps Structured Checklist Rendering */}
                {task.steps && task.steps.length > 0 && (
                    <div className="pt-2">
                        <ol className="space-y-2.5 text-xs text-gray-400 font-medium">
                            {task.steps.map((step, idx) => (
                                <li key={idx} className="flex gap-2">
                                    <span className="text-gray-400 font-semibold">{idx + 1}.</span>
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                )}
            </div>

            {/* Bottom Action Controls Alignment */}
            <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-50">
                <button className="p-2.5 bg-rose-400 hover:bg-rose-500 text-white rounded-xl shadow-sm transition-colors">
                    <Trash2 className="h-4 w-4" />
                </button>
                <button className="p-2.5 bg-rose-400 hover:bg-rose-500 text-white rounded-xl shadow-sm transition-colors">
                    <Edit3 className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

export default TaskDetail;