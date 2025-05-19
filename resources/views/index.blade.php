<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>ReaderVerse - Read Web Novels Online for Free</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="{{ asset('assets/favicon.ico') }}" type="image/x-icon">
    <link rel="stylesheet" href="./css/app.css">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/feather-icons"></script>
    <script src="{{ asset('js/menu.js') }}" defer></script>
    <script src="{{ asset('js/dark-mode.js') }}" defer></script>
</head>

<body id="body" class="bg-[#f7f7f7] overflow-x-hidden">
    @include('partials.header')

    <main class="bg-[#f7f7f7]" id="main">

        <!-- Section Popular Novels -->
        <section class="pt-9 px-2 sm:px-6 lg:px-16 mt-6 md:ml-[20px]">
            <!-- Carousel Most Popular -->
            <div class="flex justify-between items-center pr-4">
                <h2 class="text-2xl font-semibold mb-4">Popular Novels</h2>
                <button class="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 ">See More</button>
            </div>

            <!-- Cards de Novels -->
            <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-4 pt-4">
                <!-- Card -->
                <div class="flex flex-col items-center lg:w-[153px]">
                    <div class="relative w-full rounded-sm shadow-md overflow-hidden">
                        <img src="./assets/capa.jpeg" alt="Capa da Novel" class="w-full h-full lg:w-[190px] lg:h-[240px] object-cover">
                        <span
                            class="absolute top-1 left-1 bg-blue-600 text-white text-[10px] px-1 py-0.5 rounded">ONGOING</span>
                    </div>
                    <p class="mt-1 text-[13px] font-semibold text-left break-words overflow-hidden line-clamp-2 w-full">Pirates: Building a Pirate
                        Family.</p>
                    <p class="text-[11px] text-gray-500 text-left truncate w-full">君醉梦心</p>
                </div>

                <div class="flex flex-col items-center lg:w-[153px]">
                    <div class="relative w-full rounded-sm shadow-md overflow-hidden">
                        <img src="./assets/capa.jpeg" alt="Capa da Novel" class="w-full h-full lg:w-[190px] lg:h-[240px] object-cover">
                        <span
                            class="absolute top-1 left-1 bg-blue-600 text-white text-[10px] px-1 py-0.5 rounded">ONGOING</span>
                    </div>
                    <p class="mt-1 text-[13px] font-semibold text-left break-words overflow-hidden line-clamp-2 w-full">Pirates: Building a Pirate
                        Family.</p>
                    <p class="text-[11px] text-gray-500 text-left truncate w-full">君醉梦心</p>
                </div>
            </div>

        </section>

        <!-- Section New Novels -->
        <section class="pt-9 px-2 sm:px-6 lg:px-16 mt-6 md:ml-[20px] lg:pt-6">
            <div class="flex justify-between items-center pr-4">
                <h1 class="text-2xl font-semibold mb-4">New Novels</h1>
                <button class="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700">See More</button>
            </div>

            <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-4 pt-4">
                <!-- Card -->
                <div class="flex flex-col items-center lg:w-[153px]">
                    <div class="relative w-full rounded-sm shadow-md overflow-hidden">
                        <img src="./assets/capa.jpeg" alt="Capa da Novel" class="w-full h-full lg:w-[153px] lg:h-[210px] object-cover">
                        <span
                            class="absolute top-1 left-1 bg-blue-600 text-white text-[10px] px-1 py-0.5 rounded">ONGOING</span>
                    </div>
                    <p class="mt-1 text-[13px] font-semibold text-left break-words overflow-hidden line-clamp-2 w-full">Pirates: Building a Pirate
                        Family.</p>
                    <p class="text-[11px] text-gray-500 text-left truncate w-full">君醉梦心</p>
                </div>
            </div>
        </section>

        <!-- Section Recently Updated -->
        <section class="px-2 sm:px-6 lg:px-16 mt-6 md:ml-[20px] lg:pt-6">
            <div class="justify-between items-center pr-4">
                <h1 class="text-2xl font-semibold mb-4">Recently Updated</h1>
            </div>

            <!-- Cards Recently Updated -->
            <div class="flex flex-wrap justify-between gap-5">

                <div class="flex bg-gray-400 shadow-md rounded-xs w-full sm:w-[48%] lg:w-[32%] h-[110px]">
                    <img src="./assets/capa.jpeg" alt="Capa da Novel" class="lg:w-[80px] lg:h-[110px]">
                    <div class="p-3 lg:ml-4 lg:mt-2 flex flex-col">
                        <p class="text-[16px] text-gray-700">Pirates: Building a Pirate
                            Family.</p>
                        <div class="flex items-center space-x-2 mt-1">
                            <i data-feather="calendar" class="w-4 h-4 text-gray-500"></i>
                            <span class="text-[12px] text-gray-500">Last updated: 2023-10-01</span>
                        </div>
                        <div>
                            <i data-feather="page"></i>
                            <span class="text-[12px] text-gray-500">Chapter:</span>
                        </div>
                    </div>
                </div>

                <div class="flex bg-gray-400 shadow-md rounded-xs w-full sm:w-[48%] lg:w-[32%] h-[110px]">
                    <img src="./assets/capa.jpeg" alt="Capa da Novel" class="lg:w-[80px] lg:h-[110px]">
                    <div class="p-3 lg:ml-4 lg:mt-2 flex flex-col">
                        <p class="text-[16px] text-gray-700">Pirates: Building a Pirate
                            Family.</p>
                        <div class="flex items-center space-x-2 mt-1">
                            <i data-feather="calendar" class="w-4 h-4 text-gray-500"></i>
                            <span class="text-[12px] text-gray-500">Last updated: 2023-10-01</span>
                        </div>
                        <div>
                            <i data-feather="page"></i>
                            <span class="text-[12px] text-gray-500">Chapter:</span>
                        </div>
                    </div>
                </div>

                <div class="flex bg-gray-400 shadow-md rounded-xs w-full sm:w-[48%] lg:w-[32%] h-[110px]">
                    <img src="./assets/capa.jpeg" alt="Capa da Novel" class="lg:w-[80px] lg:h-[110px]">
                    <div class="p-3 lg:ml-4 lg:mt-2 flex flex-col">
                        <p class="text-[16px] text-gray-700">Pirates: Building a Pirate
                            Family.</p>
                        <div class="flex items-center space-x-2 mt-1">
                            <i data-feather="calendar" class="w-4 h-4 text-gray-500"></i>
                            <span class="text-[12px] text-gray-500">Last updated: 2023-10-01</span>
                        </div>
                        <div>
                            <i data-feather="page"></i>
                            <span class="text-[12px] text-gray-500">Chapter:</span>
                        </div>
                    </div>
                </div>

                <div class="flex bg-gray-400 shadow-md rounded-xs w-full sm:w-[48%] lg:w-[32%] h-[110px]">
                    <img src="./assets/capa.jpeg" alt="Capa da Novel" class="lg:w-[80px] lg:h-[110px]">
                    <div class="p-3 lg:ml-4 lg:mt-2 flex flex-col">
                        <p class="text-[16px] text-gray-700">Pirates: Building a Pirate
                            Family.</p>
                        <div class="flex items-center space-x-2 mt-1">
                            <i data-feather="calendar" class="w-4 h-4 text-gray-500"></i>
                            <span class="text-[12px] text-gray-500">Last updated: 2023-10-01</span>
                        </div>
                        <div>
                            <i data-feather="page"></i>
                            <span class="text-[12px] text-gray-500">Chapter:</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        @include('partials.footer')

    </main>


    <script>
        feather.replace(); // ativa os ícones Feather
    </script>

</body>

</html>