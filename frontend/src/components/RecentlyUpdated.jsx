import { Calendar, Bookmark } from 'react-feather';
import capa from '../assets/capa.jpeg';

function RecentlyUpdated() {
    return (
        // < !--Section Recently Updated-- >
        <section className="px-2 sm:px-6 lg:px-16 mt-6 md:ml-[20px] lg:pt-6">
            <div className="justify-between items-center pr-4">
                <h1 className="text-2xl font-semibold mb-4">Recently Updated</h1>
            </div>

            {/* <!-- Cards Recently Updated --> */}
            <div className="flex flex-wrap justify-between gap-5">

                <div className="flex bg-gray-400 shadow-md rounded-xs w-full sm:w-[48%] lg:w-[32%] h-[110px]">
                    <img src={capa} alt="Capa da Novel" className="lg:w-[80px] lg:h-[110px]" />
                    <div className="p-3 lg:ml-4 lg:mt-2 flex flex-col">
                        <p className="text-[16px] text-gray-700">Pirates: Building a Pirate
                            Family.</p>
                        <div className="flex flex-row items-center space-x-2 mt-1">
                            <Calendar className="w-4 h-4 text-gray-700" />
                            <span className="text-[14px] text-gray-700">Last updated: 2023-10-01</span>
                        </div>
                        <div className="flex flex-row items-center space-x-2 mt-1">
                            <Bookmark className="w-4 h-4 text-gray-700" />
                            <span className="text-[14px] text-gray-700">Chapter:</span>
                        </div>
                    </div>
                </div>

                <div className="flex bg-gray-400 shadow-md rounded-xs w-full sm:w-[48%] lg:w-[32%] h-[110px]">
                    <img src={capa} alt="Capa da Novel" className="lg:w-[80px] lg:h-[110px]" />
                    <div className="p-3 lg:ml-4 lg:mt-2 flex flex-col">
                        <p className="text-[16px] text-gray-700">Pirates: Building a Pirate
                            Family.</p>
                        <div className="flex flex-row items-center space-x-2 mt-1">
                            <Calendar className="w-4 h-4 text-gray-700" />
                            <span className="text-[14px] text-gray-700">Last updated: 2023-10-01</span>
                        </div>
                        <div className="flex flex-row items-center space-x-2 mt-1">
                            <Bookmark className="w-4 h-4 text-gray-700" />
                            <span className="text-[14px] text-gray-700">Chapter:</span>
                        </div>
                    </div>
                </div>

                <div className="flex bg-gray-400 shadow-md rounded-xs w-full sm:w-[48%] lg:w-[32%] h-[110px]">
                    <img src={capa} alt="Capa da Novel" className="lg:w-[80px] lg:h-[110px]" />
                    <div className="p-3 lg:ml-4 lg:mt-2 flex flex-col">
                        <p className="text-[16px] text-gray-700">Pirates: Building a Pirate
                            Family.</p>
                        <div className="flex flex-row items-center space-x-2 mt-1">
                            <Calendar className="w-4 h-4 text-gray-700" />
                            <span className="text-[14px] text-gray-700">Last updated: 2023-10-01</span>
                        </div>
                        <div className="flex flex-row items-center space-x-2 mt-1">
                            <Bookmark className="w-4 h-4 text-gray-700" />
                            <span className="text-[14px] text-gray-700">Chapter:</span>
                        </div>
                    </div>
                </div>

                <div className="flex bg-gray-400 shadow-md rounded-xs w-full sm:w-[48%] lg:w-[32%] h-[110px]">
                    <img src={capa} alt="Capa da Novel" className="lg:w-[80px] lg:h-[110px]" />
                    <div className="p-3 lg:ml-4 lg:mt-2 flex flex-col">
                        <p className="text-[16px] text-gray-700">Pirates: Building a Pirate
                            Family.</p>
                        <div className="flex flex-row items-center space-x-2 mt-1">
                            <Calendar className="w-4 h-4 text-gray-700" />
                            <span className="text-[14px] text-gray-700">Last updated: 2023-10-01</span>
                        </div>
                        <div className="flex flex-row items-center space-x-2 mt-1">
                            <Bookmark className="w-4 h-4 text-gray-700" />
                            <span className="text-[14px] text-gray-700">Chapter:</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RecentlyUpdated;
