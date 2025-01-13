import React from 'react'

function HomePageLoadingSkeleton() {
    return (
        <div className="flex bg-black">
            {/* Sidebar */}
            <div className="w-64 bg-black border-r border-white/10 p-4 flex flex-col">
                <div className="animate-pulse space-y-6 flex flex-col  items-center mt-5">
                {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="h-10 bg-white/10 rounded-md w-[90%]"></div>
                ))}
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="bg-black border-b border-white/10 p-4">
                    <div className="animate-pulse flex items-center space-x-4">
                        <div className="h-6 bg-white/10 rounded-md flex-1"></div>
                        <div className="h-6 bg-white/10 rounded-md w-20"></div>
                        <div className="h-10 w-10 bg-white/10 rounded-full"></div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="animate-pulse space-y-2">
                        <div className="h-52 bg-white/10 rounded-md"></div>
                        <div className="h-8 bg-white/10 rounded-md w-3/4"></div>
                        <div className="h-4 bg-white/10 rounded-md w-1/2"></div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}

export default HomePageLoadingSkeleton