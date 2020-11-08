import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_PRESCRIPTION,
    PRESCRIPTION_ERROR
} from './constants';

// Create prescription
export const createPrescription = (patientID, formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post(`/api/patient/prescription/${patientID}`, formData, config);

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


// Get prescription by ID
export const getPrescriptionById = prescriptionID => async dispatch => {
    try {
        const res = await axios.get(`/api/prescription/${prescriptionID}`);
            
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