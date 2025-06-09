import React from "react";

function Novel_page() {
  return (
    <div className="min-h-screen bg-white text-gray-900 px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <img
            src="#"
            alt="Novel Cover"
            className="w-48 h-72 object-cover rounded shadow-md"
          />

          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">Swallowed Star Sword Master</h1>
            <p className="text-lg text-gray-600 mb-1">吞噬星空里的剑圣</p>
            <p className="text-sm text-gray-500 mb-4">Author: 呆呆捣蛋兽</p>

            <div className="flex items-center gap-6 mb-4">
              <div>
                <span className="font-semibold">Chapters:</span> 167
              </div>
              <div>
                <span className="font-semibold">Status:</span> Completed
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">Fan-Fiction</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">futureworld</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">Strategy</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">Bellyblack</span>
            </div>

            <div className="flex gap-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">READ CHAPTER 1</button>
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-300">ADD TO LIBRARY</button>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex gap-6 text-lg border-b border-gray-200 pb-2 mb-4">
            <span className="font-semibold text-blue-600 border-b-2 border-blue-600">Chapters</span>
            <span className="text-gray-500 hover:text-gray-800 cursor-pointer">About</span>
          </div>

          <div className="bg-gray-100 rounded p-4">
            <p className="text-sm text-gray-600 font-semibold mb-2">Latest Release:</p>
            <div className="flex flex-wrap gap-2 text-sm">
              <a href="#" className="text-blue-600 hover:underline">Chapter 167</a>
              <a href="#" className="text-blue-600 hover:underline">Chapter 166</a>
              <a href="#" className="text-blue-600 hover:underline">Chapter 165</a>
              <a href="#" className="text-blue-600 hover:underline">Chapter 164</a>
              <a href="#" className="text-blue-600 hover:underline">Chapter 163</a>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <div className="flex gap-1">
              <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">1</button>
              <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">2</button>
              <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">&gt;</button>
              <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">&gt;&gt;</button>
            </div>
            <button className="text-gray-600 hover:text-gray-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 17l-4-4m0 0l-4-4m4 4h.01" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 

export default Novel_page;