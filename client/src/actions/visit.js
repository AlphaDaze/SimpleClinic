import api from '../utils/api';
import { setAlert } from './alert';

import {
    GET_VISIT,
    VISIT_ERROR,
    UPDATE_PATIENT
} from './constants';

// Create visit
export const createVisit = (patientID, formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await api.post(`/patient/visit/new/${patientID}`, formData, config);

        dispatch({
            type: GET_VISIT,
            payload: res.data
        });

        history.push('/patients/' + patientID);

    } catch (err) {
         dispatch({
            type: VISIT_ERROR,
            payload: { 
                msg: err.response.statusText, 
                status: err.response.status 
            }
        })
    }
}


// Get visit by ID - not used yet
export const getVisitById = visitID => async dispatch => {
    try {
        const res = await api.get(`/patient/visit/${visitID}`);
            
        dispatch({
            type: GET_VISIT,
            payload: res.data
        });
    } catch (err) {
         dispatch({
            type: VISIT_ERROR,
            payload: { 
                msg: err.response.statusText, 
                status: err.response.status 
            }
        })
    }
}

export const deleteVisit = (visitID, patientID) => async dispatch => {
    try {
        await api.delete(`/patient/visit/${visitID}`);
        
        const res = await api.get(`/patient/${patientID}`);

        dispatch({
            type: UPDATE_PATIENT,
            payload: res.data
        });

        dispatch(setAlert('Visit Removed', 'success')); // fix alerts
    } catch (err) {
         dispatch({
            type: VISIT_ERROR,
            payload: { 
                msg: err.response.statusText, 
                status: err.response.status 
            }
        })
    }
}