import React from 'react'

const Help = () => {
    return (
        <div className=" size-full bg-slate-50 flex flex-col md:flex-row font-sans antialiased text-gray-700 overflow-x-hidden">

            <main className="flex-1 flex flex-col size-full overflow-y-auto">

                {/* Lower Workspace Body Container */}
                <div className="p-4 sm:p-6 md:p-8 space-y-6 flex-1 w-full max-w-[1600px] mx-auto">

                    {/* Welcome Dashboard Banner Line */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 capitalize">
                               Help
                            </h2>
                            <span className="text-xl sm:text-2xl animate-bounce">👋</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Help