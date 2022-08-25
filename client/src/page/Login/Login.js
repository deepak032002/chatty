import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { isTokenAvailable, setuser } from '../../redux/actions/action'

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formdata, setFormdata] = useState({email: '', password: ''})

  const handleInput = (e) => {
    let name = e.target.name
    let value = e.target.value
    setFormdata({ ...formdata, [name]: value })

  }

  const handleLogin = async (e) => {
    e.preventDefault()

    const res = await axios.get('/api/v1/user/login', {
      headers: {
        'Content-Type': 'application/json',
        ...formdata
      },
    })

    if (res.data.success) {
      localStorage.setItem('token', res.data.token)
      const token = res.data.token
      dispatch(setuser(token))
      dispatch(isTokenAvailable())
      navigate('/')
    }
  }

  return (
    <>
      {
        localStorage.getItem('token') ?
          <Navigate to="/" />
          :

          <div className='login font-[Poppins] bg-blue-600 min-h-screen'>
            <Header variant="login" />
            <div className="section">
              <div className="form w-full flex justify-center items-center mt-4">
                <form onSubmit={handleLogin} className='100% bg-white shadow-md p-2'>
                  <h2 className='text-2xl font-bold my-4'>Log In</h2>
                  <div className="relative mb-6">
                    <div className="flex absolute text-gray-400 inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <i className="fa-solid fa-envelope"></i>
                    </div>
                    <input autoComplete='off' name='email' value={formdata.email} onChange={handleInput} type="text" id="input-group-2" className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@domain.com" />
                  </div>

                  <div className="relative mb-6">
                    <div className="flex absolute text-gray-400 inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <i className="fa-solid fa-lock"></i>
                    </div>
                    <input autoComplete='off' name='password' value={formdata.pass} onChange={handleInput} type="password" id="input-group-3" className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="*******" />
                  </div>

                  <button className='text-white bg-blue-600 w-full py-2' type="submit">Login</button>
                  <p className='text-center text-xs text-gray-400 mt-3'>Are You not a user? <Link className='text-blue-600' to="/signup">Sign Up</Link></p>

                  <p className='border-b leading-[0] my-4 text-center'><span className='bg-white select-none text-gray-400 px-2'>Or</span></p>

                  <div className="socialLinks w-full flex justify-center items-center gap-12 my-2">
                    <Link to="/">
                      <i className="fa-brands fa-google"></i>
                    </Link>
                    <Link to="/">
                      <i className="fa-brands fa-github"></i>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
      }
    </>
  )
}

export default Login