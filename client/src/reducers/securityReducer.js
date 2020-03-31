import { SET_CURRENT_USER } from "../constants/types";
const initialState = {
    validToken: false,
    user: {}
}
const booleanActionPayload = payload => {
    if(payload) {
        return true
    } else {
        return false
    }
}
export default function(state = initialState, action) {
    switch(action.payload) {
        case SET_CURRENT_USER:
            return {
                ...state,
                validToken: booleanActionPayload(action.payload),
                user: action.payload
            }
        default: return state
    }
}