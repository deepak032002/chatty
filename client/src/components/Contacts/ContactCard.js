import React from 'react'
import { useSelector } from 'react-redux'

const ContactCard = ({handleChatStart, item, index, roomId, currentSel}) => {

    const contacts = useSelector(state => state.user.user_details.contact)

    return (
        <>
            <div id={`id${index}`} onClick={(e) => handleChatStart(index, roomId)} className={`contact_card border-0 border-b-[1px] p-3 border-gray-300 my-4 hover:bg-gray-200 active:bg-gray-300 items-center flex w-full justify-between ${index === currentSel ? 'bg-gray-300 pointer-events-none' : ''}`}>
                <div className="image flex gap-2">
                    <img className='rounded-full w-11 h-11' src={item?.profilepic} alt="info" />
                    <div>
                        <p className='name text-gray-700'>{contacts.some(contact => contact.email === item.email) ? item?.name : 'Anonymous'}</p>
                        <p className='msg text-xs text-gray-400'>How are You</p>
                    </div>
                </div>
                <div className="time flex items-end flex-col">
                    <p className='text-gray-700 text-sm'>09:40 P.M</p>
                    <span className='msg_count rounded-full bg-red-400 h-4 w-4 text-xs text-white flex items-center justify-center'>2</span>
                </div>
            </div>
        </>
    )
}

export default ContactCard