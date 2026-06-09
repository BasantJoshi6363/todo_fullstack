import React from 'react';
import { Plus, UserPlus } from 'lucide-react';
import ActionButton from './components/ActionButton';

const DashboardHeader = () => {
  const handleAddTask = () => console.log('Opening add task modal...');
  const handleInvite = () => console.log('Opening invite modal...');

  return (
    <div className="p-6 bg-slate-50 space-y-6">
      
      {/* Example 1: Recreating the "+ Invite" button layout */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg">
        <h3 className="text-sm font-bold text-gray-700">Team Members</h3>
        
        <ActionButton 
          icon={Plus} 
          text="Invite" 
          variant="outline" 
          onClick={handleInvite} 
        />
      </div>

      {/* Example 2: Recreating the "+ Add task" button inside a To-Do column */}
      <div className="max-w-md bg-white p-4 rounded-xl border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-bold text-gray-500">📋 To-Do</span>
          
          <ActionButton 
            icon={Plus} 
            text="Add task" 
            variant="text" 
            onClick={handleAddTask} 
          />
        </div>
        
        {/* Task Cards go here */}
        <div className="p-4 bg-gray-50 rounded-lg text-xs text-gray-400 border border-dashed border-gray-200 text-center">
          No tasks for today
        </div>
      </div>

    </div>
  );
};

export default DashboardHeader;