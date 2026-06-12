import React, { useState } from 'react'
import TaskDetail from '../component/TaskDetail';
import TaskCard from '../component/TaskCard';

const VitalTask = () => {
    const [tasks] = useState([
        {
            id: 1,
            title: "Walk the dog",
            priority: "Extreme",
            status: "Not Started",
            date: "20/06/2023",
            img: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300",
            description: "Take the dog to the park and bring treats as well.",
            longDescription: "Take Luffy and Jiro for a leisurely stroll around the neighborhood. Enjoy the fresh air and give them the exercise and mental stimulation they need for a happy and healthy day. Don't forget to bring along squeaky and fluffy for some extra fun along the way!",
            steps: [
                "Listen to a podcast or audiobook",
                "Practice mindfulness or meditation",
                "Take photos of interesting sights along the way",
                "Practice obedience training with your dog",
                "Chat with neighbors or other dog walkers",
                "Listen to music or an upbeat playlist"
            ]
        },
        {
            id: 2,
            title: "Take grandma to hospital",
            priority: "Moderate",
            status: "In Progress",
            date: "20/06/2023",
            img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300",
            description: "Go back home and take grandma to the hosp....",
            longDescription: "Pick up prescription slips from the desk drawer first before coordinating travel routes. Accompany her through the main scanning lobby and sit in during consultation window hours.",
            steps: [
                "Collect prescription slips from drawer",
                "Confirm transport accessibility options",
                "Log final notes during medical review window"
            ]
        }
    ]);

    const [selectedTaskId, setSelectedTaskId] = useState(1);
    const currentActiveTask = tasks.find(t => t.id === selectedTaskId);

    return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-6 p-1 items-start">

            {/* Left Card Stack Column View Block (Takes 2/5 spaces) */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
                <div className="pb-2">
                    <h3 className="text-base font-black text-gray-800 relative inline-block">
                        Vital Tasks
                        <span className="absolute left-0 bottom-[-4px] w-full h-[2.5px] bg-rose-400 rounded-full" />
                    </h3>
                </div>

                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            isSelected={task.id === selectedTaskId}
                            onClick={() => setSelectedTaskId(task.id)}
                        />
                    ))}
                </div>
            </div>

            {/* Right Detailed Expanded Inspection Block (Takes 3/5 spaces) */}
            <div className="lg:col-span-3 h-full">
                <TaskDetail task={currentActiveTask} />
            </div>

        </div>
    );
};

export default VitalTask