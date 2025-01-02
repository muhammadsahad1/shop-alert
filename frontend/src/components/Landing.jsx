import React from 'react'

const Landing = () => {
    return (
        <div className='w-full bg-black min-h-screen bg-gradient-to-r from-blue-300 to-white'>
            <div className='flex justify-around items-center'>
                <div className="mt-32">
                    <div className='mt-20'>
                        <h2 className="text-6xl font-bold">
                            Never Miss Your <br />
                            Favorite Products <br />
                            <span className="text-blue-600">Get Notified</span>
                        </h2>
                        <p className="mt-4 text-xl text-gray-700">
                            Stay updated on price drops and availability
                        </p>
                    </div>
                    <div className='flex justify-start mt-10 '> <button className='rounded-md px-9 py-3 font-semibold bg-black hover:bg-zinc-900 transition-shadow-1 text-white    '> Get Started </button></div>
                </div>

                <div className="mt-32 text-2xl flex flex-col items-center gap-4">
                    {/* <div className="text-9xl">
                        🔔
                    </div>
                    <div className="text-7xl flex gap-4">
                        🛍️ 📱
                    </div>
                    <div className="text-6xl">
                        💰
                    </div> */}
                </div>
            </div>

        </div>
    )
}

export default Landing