import React, { useState } from 'react';
import Calendar from 'react-calendar';

function CalendarCompo() {
    const [value, onChange] = useState(new Date());

    return (
        <div className="absolute right-20 top-16 z-50 bg-white p-4 rounded-xl border border-gray-100 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
            <Calendar 
                onChange={onChange} 
                value={value}
                className="custom-react-calendar"
                nextLabel="→"
                prevLabel="←"
                next2Label={null}
                prev2Label={null}
            />
        </div>
    );
}

export default CalendarCompo;