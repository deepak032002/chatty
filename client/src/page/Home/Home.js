import React, { useEffect } from 'react'
import Header from '../../components/Header/Header'
import sayhello from '../../img/sayhello.png'
import axios from 'axios'
import { setuser } from '../../redux/actions/action'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('token')) {
        dispatch(setuser())
    }
  }, [dispatch])

  return (
    <div className='home bg-blue-600 h-screen'>
      <Header variant="home" />
      <div className="section h-[90%]">
        <div className="left h-full flex justify-center items-center flex-col">
          <img src={sayhello} className="w-auto h-80" alt="" />
          <p className='text-5xl font-bold text-white'>Say Hello To Your Friends</p>
          <div className="btn-group flex gap-4">

            {
              localStorage.getItem('token') ?
                <Link to="/chat" className='border border-white py-1 px-4 text-white mt-4 rounded-md hover:shadow-xl'>Dashboard</Link>
                :
                <>
                  <Link to="/login" className='border border-white py-1 px-4 text-white mt-4 rounded-md hover:shadow-xl'>Login</Link>
                  <Link to="/signup" className='border border-white py-1 px-4 text-white mt-4 rounded-md hover:shadow-xl'>Signup</Link>
                </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home