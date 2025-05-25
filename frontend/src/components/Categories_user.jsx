function Categories_user() {
    return (
        <main>
            {/* Genre DIV */}
            <div className="w-[60%] h-auto bg-gray-300 flex  flex-col m-auto p-5">
                <div className="text-center">
                    <h1 className="text-2xl mt-5 mb-5">Genres | Categories</h1>
                </div>
                <div className="p-3 flex flex-row grid grid-cols-3 md:grid-cols-4 lg:grid-cols-10- gap-x-6 gap-y-4 pt-4">
                    <button className="bg-blue-500 w-auto p-1 rounded-md text-white font-bold ml-5">Action</button>
                    <button className="bg-blue-500 w-auto p-1 rounded-md text-white font-bold ml-5">Romance</button>
                    <button className="bg-blue-500 w-auto p-1 rounded-md text-white font-bold ml-5">Fan-Fiction</button>
                    <button className="bg-blue-500 w-auto p-1 rounded-md text-white font-bold ml-5">Harem</button>
                    <button className="bg-blue-500 w-auto p-1 rounded-md text-white font-bold ml-5">Horror</button>
                    <button className="bg-blue-500 w-auto p-1 rounded-md text-white font-bold ml-5" >Magic</button>
                    <button className="bg-blue-500 w-auto p-1 rounded-md text-white font-bold ml-5">School Life</button>
                    <button className="bg-blue-500 w-auto p-1 rounded-md text-white font-bold ml-5" >Game</button>
                    <button className="bg-blue-500 w-auto p-1 rounded-md text-white font-bold ml-5 ">Yuri</button>
                    <button className="bg-blue-500 w-auto p-1 rounded-md text-white font-bold ml-5 ">Yaoi</button>
                    <button className="bg-blue-500 w-auto p-1 rounded-md text-white font-bold ml-5 ">Fantasy Romance</button>
                    <button className="bg-blue-500 w-auto p-1 rounded-md text-white font-bold ml-5 ">Game</button>
                    <button className="bg-blue-500 w-auto p-1 rounded-md text-white font-bold ml-5 ">Game</button>
                    <button className="bg-blue-500 w-auto p-1 rounded-md text-white font-bold ml-5 ">Game</button>
                    <button className="bg-blue-500 w-auto p-1 rounded-md text-white font-bold ml-5 ">Game</button>
                    <button className="bg-blue-500 w-auto p-1 rounded-md text-white font-bold ml-5 ">Game</button>
                    <button className="bg-blue-500 w-auto p-1 rounded-md text-white font-bold ml-5 ">Game</button>
                </div>
                <div className="text-center">
                    <h1 className="text-2xl mt-5 mb-5">Status</h1>
                </div>
                <div className="p-3 flex flex-row grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-x-6 gap-y-Z pt-4">
                    <button className="bg-blue-500 w-auto p-1 rounded-md text-white font-bold ml-5 ">All</button>
                    <button className="bg-blue-500 w-auto p-1 rounded-md text-white font-bold ml-5 ">OnGoing</button>
                    <button className="bg-blue-500 w-auto p-1 rounded-md text-white font-bold ml-5 ">Finished</button>
                </div>

                <div className="text-center">
                    <h1 className="text-2xl mt-5 mb-5">Sort By</h1>
                </div>
                <div className="p-3 flex flex-row grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-x-6 gap-y-Z pt-4">
                    <button className="bg-blue-500 w-auto p-1 rounded-md text-white font-bold ml-5 ">Popular</button>
                    <button className="bg-blue-500 w-auto p-1 rounded-md text-white font-bold ml-5 ">New</button>
                    <button className="bg-blue-500 w-auto p-1 rounded-md text-white font-bold ml-5 ">Updates</button>
                </div>
            </div>
            <div className="flex justify-center mt-10 space-x-2">
                <button className="px-3 py-1 border rounded hover:bg-gray-200">&lt;</button>
                {[...Array(10)].map((_, index) => (
                    <button
                        key={index}
                        className={`px-3 py-1 border rounded ${index === 0 ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button className="px-3 py-1 border rounded hover:bg-gray-200">&gt;</button>
            </div>
        </main>
    );
}

export default Categories_user;