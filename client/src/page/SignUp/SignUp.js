import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
  const navigate = useNavigate()

  const [formdata, setFormdata] = useState({name: '', email: '', password: '', cpassword: '', profilepic: ''})


  const handleInput = (e) => {
    let name = e.target.name
    let value = e.target.value

    if (e.target.files) {

      return setFormdata({ ...formdata, [name]: e.target.files[0] })
    }
    setFormdata({ ...formdata, [name]: value })

  }


  const handleSignup = async (e) => {
    e.preventDefault()

    let fdata = new FormData()

    fdata.append('name', formdata.name)
    fdata.append('email', formdata.email)
    fdata.append('password', formdata.password)
    fdata.append('profilepic', formdata.profilepic)

    const res = await axios.post('/api/v1/user/signup', fdata)

    if (res.data.success) {
      navigate('/login')
    }
  }

  return (

    <>
      {
        localStorage.getItem('token') ? 
        <Navigate to="/" />
          :
          <div className='signup font-[Poppins] bg-blue-600 min-h-screen'>
            <Header variant="signup" />
            <div className="section">
              <div className="form w-full flex justify-center items-center mt-4">
                <form onSubmit={handleSignup} action="" encType='multipart/form-data' className='100% bg-white shadow-md p-2'>
                  <h2 className='text-2xl font-bold my-4'>Sign Up</h2>
                  <div className="relative mb-6">
                    <div className="flex absolute text-gray-400 inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <i className="fa-solid fa-user"></i>
                    </div>
                    <input autoComplete='off' name='name' value={formdata.name} onChange={handleInput} type="text" id="input-group-1" className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" />
                  </div>

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
                    <input autoComplete='off' name='password' value={formdata.password} onChange={handleInput} type="password" id="input-group-3" className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="*******" />
                  </div>

                  <div className="relative mb-6">
                    <div className="flex absolute text-gray-400 inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <i className="fa-solid fa-lock"></i>
                    </div>
                    <input autoComplete='off' name='cpassword' value={formdata.cpassword} onChange={handleInput} type="password" id="input-group-4" className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="*******" />
                  </div>

                  <div className="relative mb-6">
                    <div className="flex absolute text-gray-400 inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <i className="fa-solid fa-image-portrait"></i>
                    </div>
                    <input autoComplete='off' name='profilepic' onChange={handleInput} className='hidden' type="file" id="input-group-5" />
                    <label className="focus:outline-none cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" htmlFor="input-group-5">{formdata.profilepic ? formdata.profilepic.name : 'Select Image'}</label>
                  </div>

                  <button className='text-white bg-blue-600 w-full py-2' type="submit">Sign Up</button>
                  <p className='text-center text-xs text-gray-400 mt-3'>Are You already user? <Link className='text-blue-600' to="/login">Login</Link></p>

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

export default SignUp