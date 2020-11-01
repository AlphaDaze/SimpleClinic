import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_PATIENT,
    GET_PATIENTS,
    PATIENT_ERROR
} from './constants';

// Create or update patient
export const createPatient = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post('/api/patient', formData, config);
        console.log(res.data);
        dispatch({
            type: GET_PATIENT,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Patient Update' : 'Patient Created'));

        if (!edit) {
            history.push('/');
        }

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

         dispatch({
            type: PATIENT_ERROR,
            payload: { 
                msg: err.response.statusText, 
                status: err.response.status 
            }
        })
    }
}

// Get all patients
export const getAllPatients = () => async dispatch => {
    //dispatch({ type: CLEAR_PATIENT });
    try {
        const res = await axios.get('/api/patient');

        dispatch({
            type: GET_PATIENTS,
            payload: res.data
        });
    } catch (err) {
         dispatch({
            type: PATIENT_ERROR,
            payload: { 
                msg: err.response.statusText, 
                status: err.response.status 
            }
        })
    }
}

// Get patient by ID
export const getPatientById = patientID => async dispatch => {
    try {
        const res = await axios.get(`/api/patient/${patientID}`);
            
        dispatch({
            type: GET_PATIENT,
            payload: res.data
        });
    } catch (err) {
         dispatch({
            type: PATIENT_ERROR,
            payload: { 
                msg: err.response.statusText, 
                status: err.response.status 
            }
        })
    }
}