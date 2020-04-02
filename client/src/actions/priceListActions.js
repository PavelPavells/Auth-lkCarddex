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
    payload: data.data
})

/** ********** ACTION FOR FETCH DATA FAILURE ********** */
export const fetchingDataFailure = error => ({
    type: DATA_LOADING_FAILURE,
    payload: error
})

/** ********** ACTION FOR FETCH DATA PRICELIST ********** */
export const fetchDataPriceList = data => {
    return async dispatch => {
        dispatch(fetchingDataRequest());
        try {
            await axios.post(`${site}findPrice`, data)
            .then(data => {
                dispatch(fetchingDataSuccess(data));
            })
            .catch(error => { console.log(error) })
        } catch (error) {
            dispatch(fetchingDataFailure(error));
        }
    }
}

/** ********** ACTION FOR FETCH LAST PAGE DATA PRICELIST ********** */
export const fetchDataLastPagePriceList = data => {
    return async dispatch => {
        dispatch(fetchingDataRequest());
        try {
            await axios.post(`${site}getLastPage`, data)
            .then(data => {
                dispatch(fetchingDataSuccess(data));
            })
            .catch(error => { console.log(error) })
        } catch (error) {
            dispatch(fetchingDataFailure(error));
        }
    }
}

// export const fetchDataPriceListPagination = data => {
//     return async dispatch => {
//         dispatch(fetchingDataRequest());
//         try {
//             await axios.post(`${site}`)
//         } catch (error) {
            
//         }
//     }
// }

/** ********** ACTIONS FOR TOGGLE POPUP WINDOW ********** */
//export const togglePopupWindowTurnstile = () => ({ type: TOGGLE_MODAL_TURNSTILE })

/** ********** ACTIONS FOR TOGGLE POPUP WINDOW MAIN INFO ********** */
//export const togglePopupWindowMainInfoTurnstile = () => ({ type: TOGGLE_MODAL_TURNSTILE_MAIN_INFO })