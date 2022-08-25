import React from 'react'

const ContactInfo = ({currentUser}) => {
    
    return (
        <div className='col-span-3 w-full hidden border contactInfo bg-white'>
            <ul className='h-full w-full bg-gray-200 shadow-xl'>
                                <li className='bg-blue-600 text-white gap-4 py-4 px-2 flex items-center'>
                                    <p>User Profile</p>
                                </li>

                                <li className='flex items-center justify-center mt-8'>
                                    <img className='h-44 w-44 rounded-full' src={currentUser?.profilepic} alt="profile" />
                                </li>

                                <li className='bg-white py-3 px-4 mt-8'>
                                    <h3 className='text-blue-600 text-xs'>Your Name</h3>
                                    <p className='text-black'>{currentUser?.name}</p>
                                </li>
                                <li className='bg-white py-3 px-4 my-2'>
                                    <h3 className='text-blue-600 text-xs'>Your About</h3>
                                    <p className='text-black'>{currentUser?.about ? currentUser?.about : 'About...'}</p>
                                </li>
                            </ul>
        </div>
    )
}

export default React.memo(ContactInfo)