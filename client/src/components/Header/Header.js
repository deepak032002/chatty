import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { isTokenAvailable } from '../../redux/actions/action'
import NewContactModal from '../NewContactModal/NewContactModal'
import './header.css'

const Header = ({ variant }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state?.user)
    const [isShowAddContacts, setIsShowAddContacts] = useState(false)

    //----------------------- Refs --------------------------------//
    const profileSlide = useRef()
    //------------------------Refs --------------------------------//

    const handleLogout = () => {
        localStorage.removeItem('token')
        dispatch(isTokenAvailable())
        navigate('/')
    }

    const handleAddContact = () => {
        console.log('clicked');
        setIsShowAddContacts(prev => !prev)
    }

    const handleProfileSlide = () => {
        profileSlide.current.classList.toggle('hidden')
    }

    return (
        <>
            <NewContactModal className={isShowAddContacts ? 'flex' : 'hidden'} handleAddContact={handleAddContact} />
            <div className={`flex justify-between px-3 ${variant === 'home' ? 'bg-blue-600 text-white' : 'bg-white'} h-12 items-center font-[Poppins]`} >
                <Link to="/">
                    <h1 className={`${variant === 'home' ? 'bg-blue-600 text-white' : 'bg-white'} text-2xl pointer-events-none select-none uppercase `}>
                        <i className="fa-solid fa-dove"></i> Chatty
                    </h1>
                </Link>
                <div className='flex gap-6 items-center justify-center'>
                    {
                        user.token && <>

                            <div className='h-8 w-8 bg-center bg-cover rounded-full cursor-pointer' onClick={handleProfileSlide} style={{ backgroundImage: `url(${user?.user_details?.profilepic})` }}></div>
                            <ul style={{ zIndex: '999' }} ref={profileSlide} className='absolute hidden top-0 right-0 h-full w-80 bg-gray-200 shadow-xl'>
                                <li onClick={handleProfileSlide} className='bg-blue-600 text-white gap-4 py-4 px-2 flex items-center'>
                                    <i className="fa-solid fa-arrow-left cursor-pointer"></i>
                                    <p>Profile</p>
                                </li>

                                <li className='flex items-center justify-center mt-8'>
                                    <img className='h-44 w-44 rounded-full' src={user?.user_details?.profilepic} alt="profile" />
                                </li>

                                <li className='bg-white py-3 px-4 mt-8'>
                                    <h3 className='text-blue-600 text-xs'>Your Name</h3>
                                    <p className='text-black'>{user?.user_details?.name}</p>
                                </li>
                                <li className='bg-white py-3 px-4 my-2'>
                                    <h3 className='text-blue-600 text-xs'>Your About</h3>
                                    <p className='text-black'>{user?.user_details?.about ? user?.user_details?.about : 'About...'}</p>
                                </li>
                            </ul>
                            {
                                variant !== 'home' &&
                                <div className="user_menu relative">
                                    <button id='float_menu_trigger'>
                                        <i className="fa-solid fa-ellipsis-vertical cursor-pointer hover:bg-gray-200 h-8 w-8 flex items-center justify-center rounded-full"></i>

                                        <div style={{ zIndex: '998' }} className="float_menu absolute right-0 top-full bg-white shadow-lg">
                                            <div onClick={handleAddContact} className='w-40 py-3 text-black text-center hover:bg-gray-100 select-none active:bg-gray-300 cursor-pointer'>Add Contacts</div>
                                            <div className='w-40 py-3 text-black text-center hover:bg-gray-100 select-none active:bg-gray-300 cursor-pointer'>New Group</div>
                                            <div className='w-40 py-3 text-black text-center hover:bg-gray-100 select-none active:bg-gray-300 cursor-pointer'>Setting</div>
                                            <div onClick={handleLogout} className='w-40 py-3 text-black text-center hover:bg-gray-100 select-none active:bg-gray-300 cursor-pointer'>Logout</div>
                                        </div>
                                    </button>
                                </div>
                            }
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default Header