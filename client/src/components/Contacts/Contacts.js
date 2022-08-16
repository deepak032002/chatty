import React from 'react'

const Contacts = () => {
    return (
        <div className='col-span-3 my-2 bg-white'>
            <div className="top py-2 text-center">
                <input className='focus:shadow-md border border-gray-300 focus:border-transparent rounded-full p-2 outline-none' placeholder='Search...' type="text" />
            </div>
            <div className="down p-2">
                <div className="contact_card border-0 border-b-[1px] pb-3 border-gray-300 my-4 flex w-full justify-between">
                    <div className="image flex gap-2">
                        <img className='rounded-full w-11 h-11' src="https://images.unsplash.com/photo-1595152452543-e5fc28ebc2b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbiUyMGZhY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="info" />
                        <div>
                            <p className='name text-gray-700'>Andrew Neil</p>
                            <p className='msg text-xs text-gray-400'>How are You</p>
                        </div>
                    </div>
                    <div className="time flex items-end flex-col">
                        <p className='text-gray-700 text-sm'>09:00</p>
                        <span className='msg_count rounded-full bg-red-400 h-4 w-4 text-xs text-white flex items-center justify-center'>5</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Contacts