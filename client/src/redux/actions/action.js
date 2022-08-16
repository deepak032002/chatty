import constant from "../constant/constant"

const {SET_USER} = constant

export const setuser = (payload) =>{

    return{
        type: SET_USER,
        payload
    }

} 