/** ********** IMPORT LIBRARIES AND VARIABLES ********** */
import axios from 'axios';
import site from '../constants/Global';

import { 
    DATA_LOADING_REQUEST, 
    DATA_LOADING_SUCCESS, 
    DATA_LOADING_FAILURE,
} from '../constants/types';

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

/** ********** ACTION FOR FETCH DATA SIDENAV ********** */
export const fetchDataSideNav = () => {
    return async dispatch => {
        dispatch(fetchingDataRequest());
        try {
            await axios.post(`${site}`, {})
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