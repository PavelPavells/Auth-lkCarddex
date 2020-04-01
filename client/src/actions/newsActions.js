/** ********** IMPORT LIBRARIES AND VARIABLES ********** */
import axios from 'axios';
import site from '../constants/Global';

import { 
    DATA_LOADING_REQUEST, 
    DATA_LOADING_SUCCESS, 
    DATA_LOADING_FAILURE,
} from '../constants/types';

const API_KEY = "2aced1b133264999b4dff057ca32a684";
export const ROOT_URL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`;

//export const getNews = () => {
//    const request = axios.get(ROOT_URL);
//    console.log(request);
//    return {
//        type: GET_NEWS,
//        payload: request
//    }
//}

/** ********** ACTION FOR FETCH DATA REQUEST ********** */
export const fetchingDataRequest = () => ({ type: DATA_LOADING_REQUEST });

/** ********** ACTION FOR FETCH DATA SUCCESS ********** */
export const fetchingDataSuccess = data => ({
    type: DATA_LOADING_SUCCESS,
    payload: data
})

/** ********** ACTION FOR FETCH DATA FAILURE ********** */
export const fetchingDataFailure = error => ({
    type: DATA_LOADING_FAILURE,
    payload: error
})

export const fetchDataNews = data => {
    return async dispatch => {
        dispatch(fetchingDataRequest());
        try {
            await axios.post(`${site}`, data)
            .then(data => {
                dispatch(fetchingDataSuccess(data));
            })
            .catch(error => { console.log(error) })
        } catch (error) {
            dispatch(fetchingDataFailure(error));
        }
    }
}

/** ********** ACTIONS FOR TOGGLE POPUP WINDOW ********** */
//export const togglePopupWindowTurnstile = () => ({ type: TOGGLE_MODAL_TURNSTILE })

/** ********** ACTIONS FOR TOGGLE POPUP WINDOW MAIN INFO ********** */
//export const togglePopupWindowMainInfoTurnstile = () => ({ type: TOGGLE_MODAL_TURNSTILE_MAIN_INFO })