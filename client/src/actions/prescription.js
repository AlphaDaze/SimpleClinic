import api from '../utils/api';
import { setAlert } from './alert';

import {
    GET_PRESCRIPTION,
    PRESCRIPTION_ERROR,
    UPDATE_PATIENT
} from './constants';

// Create prescription
export const createPrescription = (patientID, formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await api.post(`/patient/prescription/${patientID}`, formData, config);

        dispatch({
            type: GET_PRESCRIPTION,
            payload: res.data
        });

        history.push('/patients/' + patientID);

    } catch (err) {
         dispatch({
            type: PRESCRIPTION_ERROR,
            payload: { 
                msg: err.response.statusText, 
                status: err.response.status 
            }
        })
    }
}


// Get prescription by ID - not used yet
export const getPrescriptionById = prescriptionID => async dispatch => {
    try {
        const res = await api.get(`/patient/prescription/${prescriptionID}`);
            
        dispatch({
            type: GET_PRESCRIPTION,
            payload: res.data
        });
    } catch (err) {
         dispatch({
            type: PRESCRIPTION_ERROR,
            payload: { 
                msg: err.response.statusText, 
                status: err.response.status 
            }
        })
    }
}

export const deletePrescription = (prescriptionID, patientID) => async dispatch => {
    try {
        await api.delete(`/patient/prescription/${prescriptionID}`);
        
        const res = await api.get(`/patient/${patientID}`);

        dispatch({
            type: UPDATE_PATIENT,
            payload: res.data
        });

        dispatch(setAlert('Prescription Removed', 'success')); // fix alerts
    } catch (err) {
         dispatch({
            type: PRESCRIPTION_ERROR,
            payload: { 
                msg: err.response.statusText, 
                status: err.response.status 
            }
        })
    }
}