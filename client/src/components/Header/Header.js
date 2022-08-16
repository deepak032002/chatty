import React from 'react'

const Header = ({ variant }) => {
    return (
        <>
            {/* <h1 className='text-center bg-white text-2xl shadow-sm py-3 pointer-events-none select-none uppercase font-[Poppins]'>
                <i className="fa-solid fa-dove"></i> Chatty
            </h1> */}

            {
                variant === 'home' &&
                <div className='homeHeader'>
                    <h1 className="text-center text-2xl text-white shadow-sm py-3 pointer-events-none select-none uppercase font-[Poppins]">
                        <i className="fa-solid fa-dove"></i>
                        Chatty
                    </h1>
                </div>
            }

            {
                variant === 'login' &&
                <div className='homeHeader'>
                    <h1 className="text-center text-2xl text-white shadow-md py-3 pointer-events-none select-none uppercase font-[Poppins]">
                        <i className="fa-solid fa-dove"></i>
                        Chatty
                    </h1>
                </div>
            }

            {
                variant === 'signup' &&
                <div className='homeHeader'>
                    <h1 className="text-center text-2xl text-white shadow-md py-3 pointer-events-none select-none uppercase font-[Poppins]">
                        <i className="fa-solid fa-dove"></i>
                        Chatty
                    </h1>
                </div>
            }
        </>
    )
}

export default Header