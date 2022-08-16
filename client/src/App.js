import React from 'react'
import Chat from './page/Chat/Chat'
import Home from './page/Home/Home'
import Login from './page/Login/Login'
import SignUp from './page/SignUp/SignUp'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/chat' element={<Chat/>} />
        <Route path='/*' element={<>404 Page</>} />
      </Routes>
    </>
  )
}

export default App