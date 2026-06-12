import React, { useEffect, useState } from 'react';
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
    MoreHorizontal,
    Menu
} from 'lucide-react';
import ActionButton from '../component/ActionButton';
import { useTodoStore } from '../store/useTodoStore';
import { Link } from 'react-router-dom';
import Sidebar from '../component/Sidebar';
import CreateTaskCard from '../component/modal/CreateTaskCard'; // Imported as your blur overlay modal
import TaskCard from '../component/Task/TaskCard';
import EditTaskModal from '../component/modal/EditTaskCard';

const Dashboard = () => {
    const { user, fetchTask, tasks, renderListener, completedTask, fetchPendingTask, fetchCompletedTask, pendingTask } = useTodoStore();
    const [click, setOnClick] = useState(false);
    useEffect(() => {
        fetchTask();
        fetchCompletedTask();
        fetchPendingTask();
    }, [fetchTask, fetchCompletedTask, fetchPendingTask, renderListener])



    const handleAddNewTask = (newTaskData) => {
        const preparedTask = {
            id: Date.now(),
            title: newTaskData.title || "Untitled Task",
            description: newTaskData.description || "",
            priority: newTaskData.priority || "Moderate",
            status: newTaskData.status || "Not Started",
            img: newTaskData.image || "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=150"
        };
        setTodoTasks([preparedTask, ...todoTasks]);
    };

    return (
        <div className="size-full bg-slate-50 flex flex-col md:flex-row font-sans antialiased text-gray-700 overflow-x-hidden">

            <main className="flex-1 flex flex-col size-full overflow-y-auto">

                {/* Lower Workspace Body Container */}
                <div className="p-4 sm:p-6 md:p-8 space-y-6 flex-1 w-full max-w-[1600px] mx-auto">

                    {/* Welcome Dashboard Banner Line */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 capitalize">
                                Welcome back, {user?.name || "User"}
                            </h2>
                            <span className="text-xl sm:text-2xl animate-bounce">👋</span>
                        </div>

                        {/* Shared Profile Avatars & Action Layout */}
                        <div className="flex items-center gap-4 self-end sm:self-auto">
                            <div className="flex -space-x-2 overflow-hidden">
                                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100" alt="" />
                                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" alt="" />
                                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" alt="" />
                            </div>
                            <ActionButton onClick={() => setOnClick(true)} icon={Plus} text="Add Task" variant="outline" />
                        </div>
                    </div>

                    {/* Three Column Task Status Grid Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                        {/* Column 1 & 2 Composite Stack: To-Do & In Progress List View */}
                        <div className="lg:col-span-2 space-y-6 w-full">

                            {/* To-Do Workspace Block Container */}
                            <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                                        <span>📋</span>
                                        <span>To-Do</span>
                                        <span className="text-xs font-normal text-gray-400 ml-1 hidden sm:inline">20 June • Today</span>
                                    </div>
                                    <ActionButton onClick={() => setOnClick(true)} icon={Plus} text="Add task" variant="text" />
                                </div>

                                {/* Vertical Task Cards List Container */}
                                <div className="space-y-4">
                                    {pendingTask.map((task) => {
                                        return <TaskCard key={task._id} task={task} />
                                    })}
                                </div>
                            </div>


                        </div>

                        {/* Column 3 Stack: Analytics Progress Gauges & Completed Log Block */}
                        <div className="space-y-6 w-full">

                            {/* Analytics Progress Gauges */}
                            <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-6">Task Status</h3>
                                <div className="grid grid-cols-3 gap-2 text-center">
                                    <div className="flex flex-col items-center">
                                        <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full border-[6px] border-emerald-500 border-t-emerald-500/20">
                                            <span className="text-[10px] sm:text-xs font-bold text-gray-700">99%</span>
                                        </div>
                                        <span className="text-[9px] sm:text-[10px] font-bold text-gray-500 mt-2 flex items-center gap-1 justify-center">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" /> <span className="truncate">Completed</span>
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full border-[6px] border-blue-500 border-l-blue-500/20">
                                            <span className="text-[10px] sm:text-xs font-bold text-gray-700">46%</span>
                                        </div>
                                        <span className="text-[9px] sm:text-[10px] font-bold text-gray-500 mt-2 flex items-center gap-1 justify-center">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" /> <span className="truncate">In Prog...</span>
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full border-[6px] border-rose-500 border-b-rose-500/20">
                                            <span className="text-[10px] sm:text-xs font-bold text-gray-700">13%</span>
                                        </div>
                                        <span className="text-[9px] sm:text-[10px] font-bold text-gray-500 mt-2 flex items-center gap-1 justify-center">
                                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" /> <span className="truncate">Not Started</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Archive Completed Feed */}
                            <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                                <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                                    <span>☑️</span>
                                    <span>Completed Task</span>
                                </div>
                                <div className="space-y-3">
                                    {completedTask.map((task) => (
                                        <TaskCard key={task._id} task={task} />
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </main>

            <CreateTaskCard
                isOpen={click}
                onClose={() => setOnClick(false)}
                onSaveTask={handleAddNewTask}
            />

        </div>
    );
};

export default Dashboard;