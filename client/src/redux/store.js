import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers/index";
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import axios from "axios";
import constant from "./constant/constant";

const { SET_USER } = constant

const getusermiddleware = () => (next) => async (action) => {

    if (action.type === SET_USER) {
        const res = await axios.get('/api/v1/user/getuser', {
            headers: {
                token: localStorage.getItem('token')
            }
        })

        action.payload = res.data.user
    }
    next(action)
}

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, getusermiddleware)))

export default store