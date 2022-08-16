import React from 'react'

const ChatField = () => {

    const handleClick = (e) => {
        const chat_field = document.querySelector('.chatField')
        const contact_info = document.querySelector('.contactInfo')
        chat_field.classList.toggle('col-span-9')
        chat_field.classList.toggle('col-span-6')
        contact_info.classList.toggle('hidden')
    }

    return (
        <div className='chatField col-span-9 my-2 mx-2 bg-white'>
            <div className="top p-2 flex justify-between items-center border-b">
                <div className="cover flex">
                    <div className="image">
                        <img className='rounded-full w-11 h-11' src="https://images.unsplash.com/photo-1595152452543-e5fc28ebc2b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbiUyMGZhY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="info" />
                    </div>
                    <div className="info mx-2">
                        <p className="name text-gray-700">Andrew Neil</p>
                        <p className="status text-gray-400 text-xs">Online</p>
                    </div>
                </div>

                <div onClick={handleClick} className="toggle-contact-info cursor-pointer">
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                </div>
            </div>
            <div className="down p-2 flex flex-col">
                <div className="chat_area">
                    <div className="friend float-left clear-both">
                        <img className='rounded-full w-6 h-6' src="https://images.unsplash.com/photo-1595152452543-e5fc28ebc2b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbiUyMGZhY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="info" />
                        <p className='msg_friend bg-violet-600 ml-4 rounded-2xl rounded-tl-none px-2 py-1 text-white'>Hello Bro</p>
                    </div>

                    <div className="self float-right clear-both flex flex-col items-end">
                        <img className='rounded-full w-6 h-6' src="https://images.unsplash.com/photo-1595152452543-e5fc28ebc2b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbiUyMGZhY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="info" />
                        <p className='msg_self bg-violet-600 mr-4 rounded-2xl rounded-tr-none px-2 py-1 text-white'>Hi Bro</p>
                    </div>
                </div>
                <div className="chat_write_area">

                </div>
            </div>
        </div>
    )
}

export default ChatField