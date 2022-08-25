import constant from '../constant/constant'

const initialState = {
    user_details: {},
    rooms: [],
    messages: [],
    token: null,
}
const { SET_USER, IS_TOKEN_AVIALABLE, SET_ROOMS, GET_MSG, SET_MSG } = constant

const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER:
            return { ...state, "user_details": action.payload }

        case IS_TOKEN_AVIALABLE:
            if (localStorage.getItem('token')) {
                return { ...state, "token": localStorage.getItem('token') }
            }
            return { ...state, "user_details": {}, "token": localStorage.getItem('token') }

        case SET_ROOMS:

            const rooms = action.payload.map((item) => {
                let obj = {}
                obj.roomId = item.roomId
                obj.user = item.users.filter((user) => user.name !== state.user_details.name)
                return obj
            })

            return { ...state, "rooms": rooms }

        case SET_MSG:
            return { ...state }

        case GET_MSG:
            return{...state, "messages": action.payload}

        default:
            return { ...state }
    }
}

export default userReducer