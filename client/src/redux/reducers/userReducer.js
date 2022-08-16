import constant from '../constant/constant'

const initialState = {}
const { SET_USER } = constant

const userReducer = (state = initialState, action) => {

    console.log(action.payload);
    switch (action.type) {
        case SET_USER:
            state = {...state, ...action.payload}
            break;

        default:
            return { ...state }
    }
}

export default userReducer