import { setAlert } from './alert';
import api from '../utils/api';


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

        const res = await api.post('/patient', formData, config);

        dispatch({
            type: GET_PATIENT,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Patient Updated' : 'Patient Created'));

        // redirect if it isnt editing
        if (!edit) {
            history.push('/patients/' + res.data._id);
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

// Update patient by ID
export const editPatientById = (patientID, formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await api.post(`/patient/${patientID}`, formData, config);
            
        dispatch({
            type: GET_PATIENT,
            payload: res.data
        });

        dispatch(setAlert('Patient Updated'));

        // redirect if it isnt editing
        history.push('/patients/' + res.data._id);
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

// Get all patients
export const getAllPatients = () => async dispatch => {
    //dispatch({ type: CLEAR_PATIENT });
    try {
        const res = await api.get('/patient');

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
        const res = await api.get(`/patient/${patientID}`);
            
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