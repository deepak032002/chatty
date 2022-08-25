import constant from "../constant/constant"
import axios from "axios"
const { SET_USER, IS_TOKEN_AVIALABLE, SET_ROOMS, SET_MSG, GET_MSG } = constant

export const setuser = (payload) => async (dispatch) => {
    const res = await axios.get('/api/v1/user/getuser', {
        headers: {
            token: payload || localStorage.getItem('token')
        }
    })
    dispatch({
        type: SET_USER,
        payload: res.data.user
    })
}

export const isTokenAvailable = () => {
    return {
        type: IS_TOKEN_AVIALABLE
    }
}

export const setrooms = (email) => {
    return async (dispatch, getState) => {
        const res = await axios.get('/api/v1/user/getallrooms', {
            headers: {
                email: email
            }
        })
        dispatch({
            type: SET_ROOMS,
            payload: res.data
        })
    }
}

export const saveMessage = (roomId, msgObj) => {
    return async (dispatch) => {
        const res = await axios.post('/api/v1/user/savemsg', { roomId: roomId, msgObj: msgObj }, {
            headers: {
                "Content-Type": 'application/json'
            }
        })
        console.log(res);
        dispatch({
            type: SET_MSG,
            payload: res.data
        })
    }
}

export const getMessage = (roomId) => {
    return async (dispatch) => {
        const res = await axios.get('/api/v1/user/getmsg', {
            headers: {
                roomId: roomId
            }
        })
        dispatch({
            type: GET_MSG,
            payload: res.data.msg
        })
    }
}