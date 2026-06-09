import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  // Initialize form state with mock data from the image
  const [profileData, setProfileData] = useState({
    firstName: 'Sundar',
    lastName: 'Gurung',
    email: 'sundargurung360@gmail.com',
    contactNumber: '',
    position: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saving profile updates:', profileData);
    // Add your backend API submission logic here
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 font-sans antialiased text-gray-700">
      
      {/* Outer Card Wrapper */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm max-w-4xl w-full p-6 md:p-8 space-y-6">
        
        {/* Header Section */}
        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
          <div className="relative">
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">Account Information</h1>
            {/* The distinct orange accent bar underneath heading */}
            <div className="absolute -bottom-4 left-0 w-24 h-1 bg-orange-500 rounded-full" />
          </div>
          
          <Link 
            to="/" 
            className="text-xs font-bold text-gray-600 hover:text-gray-900 transition-colors underline decoration-2 underline-offset-2 flex items-center gap-1"
          >
            Go Back
          </Link>
        </div>

        {/* User Profile Header Meta Info */}
        <div className="flex items-center gap-4 pt-2">
          <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-200 shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" 
              alt="Sundar Gurung" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800 leading-tight">Sundar Gurung</h2>
            <p className="text-xs text-gray-400 font-medium mt-0.5">sundargurung360@gmail.com</p>
          </div>
        </div>

        {/* Inner Bordered Form Block Box Container */}
        <div className="border border-gray-200 rounded-xl bg-slate-50/30 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
            
            {/* First Name Field */}
            <div className="space-y-1.5">
              <label htmlFor="firstName" className="block text-xs font-bold text-gray-800 tracking-wide">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={profileData.firstName}
                onChange={handleChange}
                className="w-full bg-slate-50/60 border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 focus:bg-white transition-all shadow-sm"
              />
            </div>

            {/* Last Name Field */}
            <div className="space-y-1.5">
              <label htmlFor="lastName" className="block text-xs font-bold text-gray-800 tracking-wide">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={profileData.lastName}
                onChange={handleChange}
                className="w-full bg-slate-50/60 border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 focus:bg-white transition-all shadow-sm"
              />
            </div>

            {/* Email Address Field */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-bold text-gray-800 tracking-wide">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                className="w-full bg-slate-50/60 border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 focus:bg-white transition-all shadow-sm"
              />
            </div>

            {/* Contact Number Field */}
            <div className="space-y-1.5">
              <label htmlFor="contactNumber" className="block text-xs font-bold text-gray-800 tracking-wide">
                Contact Number
              </label>
              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                value={profileData.contactNumber}
                onChange={handleChange}
                className="w-full bg-slate-50/60 border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 focus:bg-white transition-all shadow-sm"
              />
            </div>

            {/* Position Field */}
            <div className="space-y-1.5">
              <label htmlFor="position" className="block text-xs font-bold text-gray-800 tracking-wide">
                Position
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={profileData.position}
                onChange={handleChange}
                className="w-full bg-slate-50/60 border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 focus:bg-white transition-all shadow-sm"
              />
            </div>

            {/* Action Buttons Section */}
            <div className="flex flex-wrap gap-3 pt-4">
              <button
                type="submit"
                className="px-5 py-2 bg-orange-600 text-white font-semibold text-xs rounded-md shadow-sm hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Save Changes
              </button>
              
              <Link
                to="/dashboard"
                className="px-8 py-2 bg-orange-600 text-white font-semibold text-xs rounded-md shadow-sm hover:bg-orange-700 text-center transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Cancel
              </Link>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default Profile;