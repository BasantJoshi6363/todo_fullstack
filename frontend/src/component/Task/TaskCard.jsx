import React, { useEffect, useState, useRef } from 'react';
import { MoreHorizontal, Trash2, Edit2 } from 'lucide-react';
import { format } from "date-fns";
import toast from 'react-hot-toast';
import Loader from '../Loader';
import { useTodoStore } from '../../store/useTodoStore';
import CreateTaskModal from '../modal/CreateTaskCard';
import EditTaskModal from '../modal/EditTaskCard';

const TaskCard = ({ task, onEdit }) => {
    const { completeTask, deleteTodo, setRenderListener } = useTodoStore();
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [click, setClick] = useState(false);
    const dropdownRef = useRef(null);

    // Format date safely
    const ioString = task?.createdAt;
    const date = ioString ? new Date(ioString) : new Date();
    const formatted = format(date, 'MMMM dd, yyyy - hh:mm a');

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!task) return null;
    if (loading) return <Loader />;

    // Handle Checkbox Toggling
    const changeHandler = async (e, isFinished, todoId) => {
        setLoading(true);
        setRenderListener(true);
        try {
            await completeTask(isFinished, todoId);
        } catch (error) {
            toast.error("Unable to complete the task");
        } finally {
            setLoading(false);
            setRenderListener(false);
        }
    };
    const handleDelete = async () => {
        setLoading(true)
        setRenderListener(true)

        try {
            await deleteTodo(task._id)
        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);
            setRenderListener(false);
        }
    };

    return (
        <div className="border border-gray-100 rounded-xl p-3 bg-white hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-3 relative">

            {/* Options Dropdown Menu Action Container */}
            <div className="absolute top-3 right-3" ref={dropdownRef}>
                <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-slate-50 transition-colors"
                >
                    <MoreHorizontal className="h-4 w-4" />
                </button>

                {/* Dropdown Menu Overlay */}
                {showDropdown && (
                    <div className="absolute right-0 mt-1 w-28 bg-white border border-gray-100 rounded-lg shadow-lg py-1 z-10 animate-in fade-in slide-in-from-top-1 duration-100">
                        <button
                            onClick={() => {
                                setShowDropdown(false);
                                setClick(true);
                            }}
                            className="w-full text-left px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                            <Edit2 className="h-3 w-3 text-blue-500" /> Edit
                        </button>
                        <button
                            onClick={() => {
                                setShowDropdown(false);
                                setShowDeleteModal(true);
                            }}
                            className="w-full text-left px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50/50 flex items-center gap-2"
                        >
                            <Trash2 className="h-3 w-3 text-rose-500" /> Delete
                        </button>
                    </div>
                )}
            </div>

            {/* Left Column Layout: Indicator & Typography Texts */}
            <div className="flex gap-2 flex-1">
                <input
                    type='checkbox'
                    checked={task.isFinished || false}
                    onChange={(e) => changeHandler(e, e.target.checked, task._id)}
                    className="w-3.5 h-3.5 rounded border-gray-300 text-rose-500 focus:ring-rose-400 mt-1 shrink-0 cursor-pointer"
                />

                {/* Information Layout Block */}
                <div className="flex-1 space-y-1">
                    <h4 className={`font-bold text-gray-800 text-xs ${task.isFinished ? 'line-through opacity-50' : ''}`}>
                        {task.title}
                    </h4>
                    <p className="text-[11px] text-gray-400 leading-relaxed pr-6">
                        {task.description}
                    </p>

                    {/* Lower Status Row Metas */}
                    <div className="flex flex-wrap items-center justify-between gap-1 pt-1">
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${task.isFinished ? 'text-emerald-500 bg-emerald-50' : 'text-amber-500 bg-amber-50'
                            }`}>
                            Status: {task.isFinished ? "Completed" : "pending"}
                        </span>
                        <span className="text-[9px] text-gray-400 italic pr-6">
                            {formatted}
                        </span>
                    </div>
                </div>
            </div>

            {/* Right Column Layout: Task Image Attachment Graphic */}
            {task.img && (
                <div className="w-full sm:w-14 h-20 sm:h-12 rounded-md overflow-hidden shrink-0 self-center border border-gray-100">
                    <img
                        src={task.img}
                        alt={task.title || "Task asset"}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {/* ================= BLURRED DELETE CONFIRMATION MODAL ================= */}
            {showDeleteModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150"
                    onClick={() => setShowDeleteModal(false)}
                >
                    <div
                        className="bg-white w-full max-w-sm rounded-xl p-5 shadow-xl border border-gray-100 text-center animate-in zoom-in-95 duration-150"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="w-10 h-10 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Trash2 className="h-5 w-5 text-rose-500" />
                        </div>
                        <h3 className="text-sm font-bold text-gray-800 mb-1">Delete Task?</h3>
                        <p className="text-xs text-gray-400 mb-5 leading-relaxed">
                            Are you sure you want to delete this task? This action cannot be undone.
                        </p>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 text-gray-500 rounded-lg text-xs font-bold border border-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="flex-1 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-xs font-bold shadow-sm transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <EditTaskModal
                isOpen={click}
                onClose={() => setClick(false)}
                values={task}
            />

        </div>
    );
};

export default TaskCard;