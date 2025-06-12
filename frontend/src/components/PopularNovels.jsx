import capa from '../assets/capa.jpeg';

function PopularNovels() {
    return (
        // Section Popular Novels
        <section className="pt-9 px-2 sm:px-6 lg:px-16 mt-6 md:ml-[20px] w-full">
            {/* Carousel Most Popular */}
            <div className="flex justify-between items-center pr-4">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Popular Novels</h2>
                <button className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 ">See More</button>
            </div>

            {/* Cards de Novels */}
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-4 pt-4">
                {/* <!-- Card --> */}
                <div className="flex flex-col items-center lg:w-[153px]">
                    <div className="relative w-full rounded-sm shadow-md overflow-hidden">
                        <img src={capa} alt="Capa da Novel" className="w-full h-full lg:w-[190px] lg:h-[240px] object-cover" />
                        <span
                            className="absolute top-1 left-1 bg-blue-600 text-white text-[10px] px-1 py-0.5 rounded">ONGOING</span>
                    </div>
                    <span className="mt-1 text-[13px] font-semibold text-left break-words overflow-hidden line-clamp-2 w-full">Pirates: Building a Pirate
                        Family.</span>
                    <span className="text-[11px] text-gray-500 text-left truncate w-full">君醉梦心</span>
                </div>

                <div className="flex flex-col items-center lg:w-[153px]">
                    <div className="relative w-full rounded-sm shadow-md overflow-hidden">
                        <img src={capa} alt="Capa da Novel" className="w-full h-full lg:w-[190px] lg:h-[240px] object-cover" />
                        <span
                            className="absolute top-1 left-1 bg-blue-600 text-white text-[10px] px-1 py-0.5 rounded">ONGOING</span>
                    </div>
                    <span className="mt-1 text-[13px] font-semibold text-left break-words overflow-hidden line-clamp-2 w-full">Pirates: Building a Pirate
                        Family.</span>
                    <span className="text-[11px] text-gray-500 text-left truncate w-full">君醉梦心</span>
                </div>
            </div>

        </section>
    );
}

export default PopularNovels;