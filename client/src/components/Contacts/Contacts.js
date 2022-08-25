import React from 'react'
import { useSelector } from 'react-redux'
import ContactCard from './ContactCard'

const Contacts = ({ handleChatStart, currentSel }) => {
    const state = useSelector(state => state)

    return (
        <div className='contact col-span-3 w-full border bg-white'>
            <div className="down p-2">

                {
                    state?.user?.rooms?.length > 0 ?
                        state?.user?.rooms.map((item, i) => {
                            return (
                                <ContactCard key={new Date().getTime() + i} currentSel={currentSel} handleChatStart={handleChatStart} item={item.user[0]} roomId={item.roomId} index={i} />
                            )
                        }) :
                        <p className='text-center text-gray-400'>No Contacts Available</p>
                }
            </div>
        </div>
    )
}

export default React.memo(Contacts)