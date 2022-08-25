import React, { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

const NewContactModal = ({className, handleAddContact}) => {
    const [fEmail, setFEmail] = useState('')
    const token = useSelector(state => state.user.token)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await axios.patch('/api/v1/user/addcontacts', JSON.stringify({ f_email: fEmail }), {
            headers: {
                token: token
            }
        })

        console.log(res.data);

    }

    return (
        <>
            <div className={`w-full ${className} h-screen absolute items-center justify-center`} style={{ zIndex: '1000', backgroundColor: '#000000ba' }} >
                <div className="bg-white p-4 rounded-md relative">
                <div onClick={handleAddContact} className="close absolute top-0 right-0 p-4 cursor-pointer"><i className="fa-solid fa-xmark"></i></div>
                    <h1 className='text-center text-lg font-semibold'>Add Contact</h1>
                    <form method='patch' className='flex mt-4' onSubmit={handleSubmit}>
                        <input placeholder='Friend Email..' className='focus:outline-none px-1 border border-blue-500' type="text" name='f_email' value={fEmail} onChange={(e) => setFEmail(e.target.value)} />
                        <button className='bg-blue-500 text-white p-2' type='submite'>Add Contacts</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default NewContactModal