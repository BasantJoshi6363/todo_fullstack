import React, { useState, useRef } from 'react';
import { Calendar, Image as ImageIcon, Upload, X } from 'lucide-react';
import { useTodoStore } from '../../store/useTodoStore';
import toast from 'react-hot-toast';
import Loader from '../Loader';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';

const EditTaskModal = ({ isOpen, onClose, values }) => {
    const { createTask, setRenderListener, updateTask } = useTodoStore();
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [priority, setPriority] = useState(''); // 'Extreme', 'Moderate', 'Low'
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (values) {
            setTitle(values.title)
            setDescription(values.description)
            setPriority(values.priority)
        }
    }, [values])
    // const [formdata, setFormData] = useState({
    //     title: values.title | "",
    //     description: values.description | "",
    //     priority: values.priority | ""
    // })
    // const [image, setImage] = useState(null);
    // const [isDragging, setIsDragging] = useState(false);
    // const fileInputRef = useRef(null);

    if (!isOpen) return null;

    const priorities = [
        { label: 'Extreme', color: 'bg-rose-500' },
        { label: 'Moderate', color: 'bg-blue-500' },
        { label: 'Low', color: 'bg-emerald-500' }
    ];




    // const handleFileChange = (e) => {
    //     if (e.target.files && e.target.files[0]) {
    //         setImage(e.target.files[0]);
    //     }
    // };

    // const handleDrop = (e) => {
    //     e.preventDefault();
    //     setIsDragging(false);
    //     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    //         setImage(e.dataTransfer.files[0]);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const taskData = {
            title,
            priority: priority.toLowerCase(),
            description,
            // image: image ? URL.createObjectURL(image) : null,
        };
        setLoading(true);
        try {

            await updateTask(taskData, values._id);
            setRenderListener(true);
            setTitle("");
            setPriority("")
            setDescription("")
        } catch (error) {
            console.log(error)
            toast.error("task creation failed")
        } finally {
            setLoading(false);
        }

    };
    if (loading) {
        return <Loader />
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
            onClick={onClose} // Closes modal when clicking outside the main card
        >

            <div
                className="bg-slate-50/95 w-full max-w-[1000px] rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/20 my-8 font-sans text-gray-700 animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()} // Prevents closing modal when clicking inside the form
            >

                {/* Header Toolbar Area */}
                <div className="flex justify-between items-center mb-6 border-b border-gray-200/60 pb-4">
                    <div className="relative inline-block">
                        <h2 className="text-xl font-bold text-gray-800 tracking-tight">Edit Your Task</h2>
                        <span className="absolute left-0 bottom-[-17px] w-full h-[3px] bg-rose-500 rounded-full" />
                    </div>
                    <button
                        onClick={onClose}
                        className="text-sm font-black text-gray-800 hover:text-rose-500 border-b-2 border-gray-800 hover:border-rose-500 transition-colors pb-0.5"
                    >
                        Go Back
                    </button>
                </div>

                {/* Form Elements */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white p-5 sm:p-6 rounded-xl border border-gray-200 shadow-sm grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Left Side: Text Inputs */}
                        <div className="lg:col-span-2 space-y-4">

                            {/* Title */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-800 tracking-wide">Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full bg-slate-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 focus:bg-white transition-all"
                                    required
                                />
                            </div>



                            {/* Priority Radios/Checkboxes */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-800 tracking-wide block">Priority</label>
                                <div className="flex flex-wrap items-center gap-6 pt-0.5">
                                    {priorities.map((item) => (
                                        <label key={item.label} className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-400 select-none">
                                            <span className={`w-2 h-2 rounded-full ${item.color}`} />
                                            <span className={priority === item.label ? 'text-gray-800 font-bold' : ''}>{item.label}</span>
                                            <input
                                                type="checkbox"
                                                checked={priority === item.label}
                                                onChange={() => setPriority(priority === item.label ? '' : item.label)}
                                                className="ml-1 w-4 h-4 rounded border-gray-300 text-rose-500 focus:ring-rose-400"
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Task Description */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-800 tracking-wide">Task Description</label>
                                <textarea
                                    placeholder="Start writing here....."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={4}
                                    className="w-full bg-white border border-gray-200 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all resize-none placeholder-gray-300"
                                    required
                                />
                            </div>
                        </div>

                        {/* Right Side: Media Uploader Dropzone
                        <div className="flex flex-col space-y-1">
                            <label className="text-xs font-bold text-gray-800 tracking-wide">Upload Image</label>

                            <div
                                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current.click()}
                                className={`flex-1 border border-gray-200 rounded-xl flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all min-h-[220px]
                                    ${isDragging ? 'border-rose-400 bg-rose-50/20' : 'bg-slate-50/40 hover:bg-slate-50/80'}`}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="hidden"
                                />

                                {image ? (
                                    <div className="space-y-2 w-full">
                                        <div className="w-20 h-16 rounded-lg overflow-hidden mx-auto border border-gray-200">
                                            <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                        <p className="text-xs font-bold text-gray-600 truncate max-w-[180px] mx-auto">{image.name}</p>
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); setImage(null); }}
                                            className="text-[10px] font-bold text-rose-500 hover:underline"
                                        >
                                            Remove Image
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center space-y-3">
                                        <div className="relative text-gray-300">
                                            <ImageIcon className="h-12 w-12 stroke-[1]" />
                                            <Upload className="h-3.5 w-3.5 absolute bottom-1 right-1 text-gray-400 stroke-[2.5]" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400">Drag&Drop files here</p>
                                            <p className="text-[10px] text-gray-300 my-0.5">or</p>
                                        </div>
                                        <button
                                            type="button"
                                            className="px-4 py-1.5 border border-gray-300 rounded-lg text-xs font-bold text-gray-400 bg-white hover:bg-gray-50 transition-colors shadow-sm"
                                        >
                                            Browse
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div> */}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-start">
                        <button
                            type="submit"
                            className="px-10 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-sm font-bold shadow-md transition-colors tracking-wide"
                        >
                            Done
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTaskModal;