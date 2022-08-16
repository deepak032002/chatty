import React, { useEffect } from 'react'
import ChatField from '../../components/ChatField/ChatField'
import ContactInfo from '../../components/ContactInfo/ContactInfo'
import Contacts from '../../components/Contacts/Contacts'

const Chat = () => {

    return (
        <>
            <div className="bg-gray-200 h-screen">
                <h1 className='text-center bg-white text-2xl shadow-sm py-3 uppercase font-[Poppins]'>Chatty</h1>
                <div className="grid grid-cols-12 px-2 font-[Poppins]" style={{ height: 'calc(100vh - 3.5rem)' }}>
                    <Contacts />
                    <ChatField />
                    <ContactInfo />
                </div>
            </div>
        </>
    )
}

export default Chat