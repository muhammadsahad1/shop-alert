import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className='max-w-6xl  p-4 w-full bg-black min-h-screen bg-gradient-to-r from-blue-300 to-white'>
            <div className='flex flex-col md:flex-row justify-around items-center'>

                <div className="mt-16 md:mt-32 text-center md:text-left">
                    <div className='mt-10 md:mt-20'>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                            Never Miss Your <br />
                            Favorite Products <br />
                            <span className="text-blue-600">Get Notified</span>
                        </h2>
                        <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-700">
                            Stay updated on price drops and availability
                        </p>
                    </div>
                    <div className='flex justify-center md:justify-start mt-10'>
                        <Link to={'/signup'}>
                            <button className='rounded-md px-6 py-3 sm:px-8 sm:py-2 font-semibold bg-black hover:bg-zinc-900 transition-shadow text-white'>
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Landing;
