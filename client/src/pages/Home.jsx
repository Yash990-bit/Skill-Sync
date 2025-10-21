import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/civer.png';
import Navbar from '../components/Navbar.jsx'; 

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col">
      <Navbar /> 

      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }} 
      >
        <div className="absolute inset-0 bg-black opacity-60"></div> 
      </div>

      <div className="relative z-10 flex-grow flex flex-col items-start justify-center p-8 md:p-16 max-w-7xl mx-auto w-full">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
          Our freelancers <br /> will take it from here
        </h1>

        <div className="flex w-full max-w-2xl bg-white rounded-md overflow-hidden shadow-lg mb-8">
          <input
            type="text"
            placeholder="Search for any service..."
            className="flex-grow p-4 text-gray-800 text-lg border-none focus:outline-none"
          />
          <button className="bg-black text-white p-4 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-20">
          {[
            { name: 'website development', link: '/category/web-dev' },
            { name: 'architecture & interior design', link: '/category/design' },
            { name: 'UGC videos', link: '/category/ugc-videos' },
            { name: 'video editing', link: '/category/video-editing' },
            { name: 'vibe coding', link: '/category/vibe-coding', new: true },
          ].map((category) => (
            <Link 
              key={category.name} 
              to={category.link} 
              className="flex items-center space-x-2 px-5 py-3 border border-gray-600 rounded-full text-sm font-medium hover:bg-gray-700 transition duration-200"
            >
              <span>{category.name}</span>
              {category.new && (
                <span className="ml-2 bg-green-500 text-black text-xs font-bold px-2 py-0.5 rounded-full uppercase">
                  NEW
                </span>
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
