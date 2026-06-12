import React from 'react';
import { MoreHorizontal } from 'lucide-react';

const TaskCard = ({ task, isSelected, onClick }) => {
    console.log(task)
  
    const isExtreme = task.priority === 'extreme';

    return (
        <div 
            onClick={onClick}
            className={`border rounded-2xl p-4 bg-white transition-all cursor-pointer relative flex gap-3
                ${task.isFinished 
                    ? 'border-rose-400 ring-2 ring-rose-100 shadow-md' 
                    : 'border-gray-100 hover:shadow-md'
                }`}
        >
            {/* Options context menu button */}
            <button className="absolute top-4 right-4 text-gray-300 hover:text-gray-500">
                <MoreHorizontal className="h-4 w-4" />
            </button>

            {/* Left Circular Priority Ring */}
            <span className={`w-3.5 h-3.5 rounded-full border-2 mt-1 shrink-0 ${
                isExtreme ? 'border-rose-500' : 'border-blue-500'
            }`} />

            {/* Content Details Block */}
            <div className="flex-1 min-w-0 pr-12">
                <h4 className="font-bold text-gray-800 text-sm truncate">{task.title}</h4>
                <p className="text-[11px] text-gray-400 leading-relaxed mt-1 line-clamp-2">
                    {task.description}
                </p>

                {/* Card Meta Badges */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-3 text-[9px] font-bold">
                    <span className="text-gray-400">
                        Priority: <span className={isExtreme ? 'text-rose-500' : 'text-blue-500'}>{task.priority}</span>
                    </span>
                    <span className="text-gray-400">
                        Status: <span className={task.isFinished ? 'text-rose-400' : 'text-blue-500'}>{task.status}</span>
                    </span>
                    <span className="text-gray-300 font-normal">Created on: {task.createdAt}</span>
                </div>
            </div>

            {/* Attachment Thumbnail Graphics */}
            {task.img && (
                <div className="w-16 h-14 rounded-xl overflow-hidden shrink-0 self-center border border-gray-50 shadow-sm">
                    <img src={task.img} alt="Task thumb" className="w-full h-full object-cover" />
                </div>
            )}
        </div>
    );
};

export default TaskCard;