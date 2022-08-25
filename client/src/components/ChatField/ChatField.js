import React, { useCallback, useEffect, useRef } from 'react'
import chatfieldbg from '../../img/chat_field_bg.png'
import Picker from 'emoji-picker-react';
// import { useSelector } from 'react-redux';

const ChatField = ({ currentUser, sendMsg, setSendMsg, handleSendMsg, allMsg, email }) => {

    const chatArea = useRef()

    useEffect(() => {
        chatArea.current?.scrollIntoView({ behavior: 'smooth' })
    }, [allMsg])

    const handleFriendProfileClick = () => {
        const chat_field = document.querySelector('.chat_field')
        const contact_info = document.querySelector('.contactInfo')
        chat_field.classList.toggle('col-span-9')
        chat_field.classList.toggle('col-span-6')
        contact_info.classList.toggle('hidden')
    }

    const handleMsg = useCallback((e) => {
        setSendMsg(e.target.value)
    }, [setSendMsg])

    const emojiPicker = useCallback((e, emoji) => {
        setSendMsg(prev => prev.concat(" " + emoji.emoji))
    }, [setSendMsg])

    if (!currentUser) {
        return (
            <>
                <div className='chat_field relative w-full border col-span-9'>
                    <h1 className='text-center font-semibold text-lg text-gray-400'>Select any Contact or Group and Start Chat </h1>
                </div>
            </>
        )
    }



    return (
        <div className='chat_field relative w-full border col-span-9'>
            <div className="top flex justify-between items-center border-b bg-white">
                <div className="cover flex">
                    <div className="image">
                        <img onClick={handleFriendProfileClick} className='rounded-full cursor-pointer w-11 h-11' src={currentUser.profilepic} alt="info" />
                    </div>
                    <div className="info mx-2">
                        <p className="name text-gray-700">{currentUser.name}</p>
                        <p className="status text-gray-400 text-xs">Online</p>
                    </div>
                </div>

                <div className="toggle-contact-info cursor-pointer">
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                </div>
            </div>
            <div className="down" style={{ background: `url(${chatfieldbg}) #0000004d center / cover`, backgroundBlendMode: 'multiply' }}>
                <div className="chat_area">
                    {
                        allMsg ?
                            Object.keys(allMsg).map((dMsg, i) => {

                                return (
                                    <>
                                    <div className='flex justify-center items-center'>
                                        <h2 className='my-2 text-gray-600 text-sm text-center border bg-white p-1 rounded-md'>{dMsg}</h2>
                                    </div>
                                    {

                                        allMsg[dMsg].map((msg, i) => {
                                            if (msg.message?.self && msg.message?.from === email) {
                                                return (
                                                    <div key={new Date().getTime() + i} className="self flex my-3 flex-col items-end">
                                                        <img className='rounded-full w-6 h-6' src={msg.message?.profilepic} alt="info" />
                                                        <p className='msg_self bg-violet-600 mr-4 rounded-2xl rounded-tr-none px-2 py-1 text-white'>{msg.message?.msg}</p>
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div key={new Date().getTime() + i} className="friend my-3 flex flex-col items-start">
                                                        <img className='rounded-full w-6 h-6' src={msg.message?.profilepic} alt="info" />
                                                        <p className='msg_friend bg-violet-600 ml-4 rounded-2xl rounded-tl-none px-2 py-1 text-white'>{msg.message?.msg}</p>
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                    </>
                                )
                            })
                            : <h2 className='text-center'>No Conversation</h2>
                    }

                    <div ref={chatArea} />
                </div>
            </div>
            <div className="chat_write_area w-full absolute bottom-0 bg-white">
                <div className="input_wrp flex h-12 items-center justify-center gap-3">
                    <div id="emoji_trigger">
                        <i className="fa-solid fa-face-laugh hover:text-gray-600 text-gray-500 cursor-pointer"></i>
                        <div id='emoji_wrp' className='absolute bottom-12 left-0'>
                            <Picker preload={true} pickerStyle={{ width: '100%' }} searchPlaceholder="Search Emoji..." onEmojiClick={emojiPicker} />
                        </div>
                    </div>
                    <i className="fa-solid fa-paperclip text-gray-500 cursor-pointer"></i>
                    <input onChange={handleMsg} value={sendMsg} className='h-full w-[90%] focus:outline-none' type="text" placeholder='Type a message' />
                    <i onClick={handleSendMsg} className="fas fa-paper-plane hover:text-gray-600 active:text-gray-900 text-gray-500 cursor-pointer"></i>
                </div>
            </div>
        </div >
    )
}

export default React.memo(ChatField)