import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/civer.png';
import Navbar from '../components/Navbar.jsx';

import ProgrammingIcon from '../assets/program.png';
import GraphicsIcon from '../assets/web-design.png';
import DigitalMarketingIcon from '../assets/social-media-marketing.png';
import WritingIcon from '../assets/writing.png';
import VideoIcon from '../assets/animation.png';
import AIIcon from '../assets/computer-device.png';
import MusicIcon from '../assets/audio-visual.png';
import BusinessIcon from '../assets/cooperation.png';
import ConsultingIcon from '../assets/customer-service.png';

import VideoPlaceholderA from '../assets/guide.webp'; 
import VideoPlaceholderB from '../assets/post.jpg'; 
import StepTwoHiring from '../assets/for.webp'; 
import StepThreeHiring from '../assets/it.jpeg'; 
import StepTwoFinding from '../assets/find.webp'; 
import StepThreeFinding from '../assets/work.webp'; 

const hiringSteps = [
    { 
        image: VideoPlaceholderA, 
        title: 'Posting jobs is always free', 
        isSpecial: true, 
        logo: 'upwork',
        gradient: 'bg-gradient-to-br from-yellow-100 to-green-200'
    },
    { 
        image: StepTwoHiring, 
        title: 'Get proposals and hire' 
    },
    { 
        image: StepThreeHiring, 
        title: 'Pay when work is done' 
    }
];

const findingSteps = [
    { 
        image: VideoPlaceholderB, 
        title: 'Find clients and remote jobs',
        isSpecial: true, 
        logo: null,
        gradient: 'bg-black'
    },
    { 
        image: StepTwoFinding, 
        title: 'Submit proposals for work' 
    },
    { 
        image: StepThreeFinding, 
        title: 'Get paid as you deliver work' 
    }
];


export default function Home() {
  const [isHiringView, setIsHiringView] = useState(true);
  const currentSteps = isHiringView ? hiringSteps : findingSteps;
  
  const topCategories = [
    { name: 'Programming & Tech', icon: ProgrammingIcon },
    { name: 'Graphics & Design', icon: GraphicsIcon },
    { name: 'Digital Marketing', icon: DigitalMarketingIcon },
    { name: 'Writing & Translation', icon: WritingIcon },
    { name: 'Video & Animation', icon: VideoIcon },
    { name: 'AI Services', icon: AIIcon },
    { name: 'Music & Audio', icon: MusicIcon },
    { name: 'Business', icon: BusinessIcon },
    { name: 'Consulting', icon: ConsultingIcon },
  ];

  return (
    <div className="relative min-h-screen bg-white text-gray-800 flex flex-col">
      <Navbar />
      <div className="relative min-h-[500px] flex-shrink-0 flex flex-col items-start justify-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>

        <div className="relative z-10 p-8 md:p-16 max-w-7xl mx-auto w-full">
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
          <div className="flex flex-wrap gap-4">
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
      
      <div className="bg-white py-12 px-8 md:px-16 w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4 text-center">
          {topCategories.map((cat) => (
            <div
              key={cat.name}
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition duration-200 text-gray-700 hover:text-teal-600 group cursor-pointer"
            >
              <div className="mb-2 bg-gray-100 p-3 rounded-full border border-gray-200 w-12 h-12 flex items-center justify-center">
                <img
                  src={cat.icon}
                  alt={`${cat.name} icon`}
                  className="w-8 h-8 object-contain transition duration-200 group-hover:filter group-hover:brightness-100 group-hover:saturate-150 group-hover:hue-rotate-90"
                />
              </div>
              <span className="text-sm font-medium">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white py-20 px-8 md:px-16 w-full">
          <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-12 flex-col sm:flex-row">
                  <h2 className="text-4xl font-bold text-gray-800 mb-6 sm:mb-0">How it works</h2>
                  <div className="flex border border-gray-300 p-1 rounded-full text-sm font-semibold shadow-inner">
                      <button onClick={() => setIsHiringView(true)}
                      className={`px-6 py-2 rounded-full transition duration-500 ${isHiringView ? 'bg-black text-white shadow-md' : 'bg-transparent text-gray-700 hover:bg-gray-100'}`}
                      >For hiring</button>
                      <button onClick={() => setIsHiringView(false)} className={`px-6 py-2 rounded-full transition duration-500 ${!isHiringView ? 'bg-black text-white shadow-md' : 'bg-transparent text-gray-700 hover:bg-gray-100'}`}>For finding work</button>
                  </div>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                  {currentSteps.map((step, index) => (
                      <div key={index} className="flex flex-col items-start">
                          <div className={`w-full rounded-lg overflow-hidden mb-4 aspect-video shadow-xl relative`}>
                              {step.isSpecial ? (
                                  <div className={`w-full h-full relative ${step.gradient} flex items-center justify-center`}>                                     
                                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${step.image})`, backgroundPosition: 'center' }}>
                                    </div>
                                  </div>) : (
                                  <img 
                                      src={step.image} 
                                      alt={step.title} 
                                      className="w-full h-full object-cover rounded-lg" 
                                  />
                              )}
                          </div>
                          <h3 className="text-xl font-medium text-gray-800 mt-2">{step.title}</h3>
                      </div>
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
}
