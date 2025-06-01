function Categories_user() {
    return (
        <main>
            {/* Genre DIV */}
            <div className="w-[60%] h-auto bg-gray-300 flex  flex-col m-auto p-5">
                <div className="text-left">
                    <h1 className="text-2xl mt-5 mb-5">Genres | Categories</h1>
                </div>
                <div className="p-3 flex flex-wrap gap-3 justify-left">
                    <button className="bg-blue-500 w-auto px-3 py-1 rounded-md text-white font-bold">Action</button>
                    <button className="bg-blue-500 w-auto px-3 py-1 rounded-md text-white font-bold">Actioadadan</button>

                    <button className="bg-blue-500 w-auto px-3 py-1 rounded-md text-white font-bold">Actiadadaon</button>

                    <button className="bg-blue-500 w-auto px-3 py-1 rounded-md text-white font-bold">Actaion</button>

                    <button className="bg-blue-500 w-auto px-3 py-1 rounded-md text-white font-bold">adad</button>

                    <button className="bg-blue-500 w-auto px-3 py-1 rounded-md text-white font-bold">Action</button>

                    <button className="bg-blue-500 w-auto px-3 py-1 rounded-md text-white font-bold">Actadadadaion</button>

                    <button className="bg-blue-500 w-auto px-3 py-1 rounded-md text-white font-bold">Actadadadaion</button>


                    <button className="bg-blue-500 w-auto px-3 py-1 rounded-md text-white font-bold">Actwdwdwdwion</button>

                    <button className="bg-blue-500 w-auto px-3 py-1 rounded-md text-white font-bold">Action</button>

                    <button className="bg-blue-500 w-auto px-3 py-1 rounded-md text-white font-bold">An</button>

                    <button className="bg-blue-500 w-auto px-3 py-1 rounded-md text-white font-bold">Action</button>

                    <button className="bg-blue-500 w-auto px-3 py-1 rounded-md text-white font-bold">Action</button>

                    <button className="bg-blue-500 w-auto px-3 py-1 rounded-md text-white font-bold">Action</button>


                    <button className="bg-blue-500 w-auto px-3 py-1 rounded-md text-white font-bold">Action</button>

                    <button className="bg-blue-500 w-auto px-3 py-1 rounded-md text-white font-bold">Action</button>

                    <button className="bg-blue-500 w-auto px-3 py-1 rounded-md text-white font-bold">Action</button>


                </div>
                <div className="text-left">
                    <h1 className="text-2xl mt-5 mb-5">Status</h1>
                </div>
                <div className="p-3 flex flex-wrap gap-3 justify-left">
                    <button className="bg-blue-500 w-auto px-3 py-1 rounded-md text-white font-bold  ">All</button>
                    <button className="bg-blue-500 w-auto px-3 py-1 rounded-md text-white font-bold  ">OnGoing</button>
                    <button className="bg-blue-500 w-auto px-3 py-1 rounded-md text-white font-bold  ">Finished</button>
                </div>

                <div className="text-left">
                    <h1 className="text-2xl mt-5 mb-5">Sort By</h1>
                </div>
                <div className="p-3 flex flex-wrap gap-3 justify-left">
                    <button className="bg-blue-500 w-auto px-3 py-1 rounded-md text-white font-bold  ">Popular</button>
                    <button className="bg-blue-500 w-auto px-3 py-1 rounded-md text-white font-bold  ">New</button>
                    <button className="bg-blue-500 w-auto px-3 py-1 rounded-md text-white font-bold  ">Updates</button>
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