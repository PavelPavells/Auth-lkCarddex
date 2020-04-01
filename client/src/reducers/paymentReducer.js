/** ********** IMPORT VARIABLES FROM TYPES ********** */
import { 
    DATA_LOADING_REQUEST, 
    DATA_LOADING_SUCCESS, 
    DATA_LOADING_FAILURE,
} from '../constants/types';

const initialState = {
    isFetching: false,
    errorMessage: '',
    data: []
}

/** ********** REDUCER FOR DATA PAYMENT ********** */
export default function(state = initialState, action) {
    switch(action.type) {
        case DATA_LOADING_REQUEST:
            return { ...state, isFetching: true };
        case DATA_LOADING_SUCCESS:
            return { ...state, isFetching: false, data: action.payload }
        case DATA_LOADING_FAILURE:
            return { ...state, isFetching: false, errorMessage: action.payload }
        default: return state;
    }
}