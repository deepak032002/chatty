import React, { useEffect, useState, useCallback } from 'react'
import ChatField from '../../components/ChatField/ChatField'
import ContactInfo from '../../components/ContactInfo/ContactInfo'
import Contacts from '../../components/Contacts/Contacts'
import Header from '../../components/Header/Header'
import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getMessage, saveMessage, setrooms } from '../../redux/actions/action'
import { io } from 'socket.io-client'
import './chat.scss'

const socket = io('/')


const Chat = () => {
    const state = useSelector(state => state)
    const [currentUser, setCurrentUser] = useState(null)
    const [sendMsg, setSendMsg] = useState('')
    const [allMsg, setAllMsg] = useState()
    const [roomId, setRoomId] = useState()
    const [currentSel, setCurrentSel] = useState(null)

    const dispatch = useDispatch()
    const email = useSelector(state => state.user.user_details.email)
    const profilepic = useSelector(state => state.user.user_details.profilepic)

    useEffect(() => {
        dispatch(setrooms(email))
    }, [dispatch, email])

    useEffect(() => {
        setAllMsg(state.user.messages)
    }, [state.user.messages])

    useEffect(() => {
        socket.off('msg').on('msg', (msgObj) => {
            setAllMsg({ ...allMsg, [new Date().toLocaleDateString()]: msgObj })
        })
    }, [setAllMsg, allMsg])

    const handleChatStart = useCallback((index, roomId) => {
        setCurrentUser(state.user.rooms[index].user[0])
        setCurrentSel(index)
        setAllMsg([])
        setRoomId(roomId)

        dispatch(getMessage(roomId))
        socket.emit('join', { roomId: roomId })
    }, [dispatch, state])

    const handleSendMsg = useCallback(() => {
        if (sendMsg) {
            const msgObj = { profilepic: profilepic, msg: sendMsg, self: true, from: email, date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString() }
            setAllMsg({ ...allMsg, [new Date().toLocaleDateString()]: allMsg[new Date().toLocaleDateString()].concat({ message: msgObj }) })
            console.log({ ...allMsg, [new Date().toLocaleDateString()]: allMsg[new Date().toLocaleDateString()].concat({ message: msgObj }) } );
            dispatch(saveMessage(roomId, msgObj))
            socket.emit('msg', msgObj)
            setSendMsg('')
        }
    }, [dispatch, email, roomId, profilepic, sendMsg, allMsg])

    return (
        <>
            {
                !state.user.token ? <Navigate to="/login" /> :

                    <div className="chat_wrp bg-gray-200">
                        <div className='chat_top_wrapper'>
                            <Header />
                        </div>
                        <div className={`chat_down_wrapper grid grid-cols-12 font-[Poppins]`}>
                            <Contacts currentSel={currentSel} handleChatStart={handleChatStart} socket={socket} />
                            <ChatField email={email} allMsg={allMsg} setSendMsg={setSendMsg} handleSendMsg={handleSendMsg} sendMsg={sendMsg} currentUser={currentUser} />
                            <ContactInfo currentUser={currentUser} />
                        </div>
                    </div>
            }
        </>
    )
}

export default Chat