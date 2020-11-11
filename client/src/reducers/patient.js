import {
    GET_PATIENT,
    GET_PATIENTS,
    UPDATE_PATIENT,
    PATIENT_ERROR
} from '../actions/constants';

const initialState = {
    patient: {},
    patients: [], 
    errors: {},
    loading: true,
}

const patient = (state = initialState, action) => {
    const { type, payload } = action;
    
    switch (type) {
        case GET_PATIENT:
        case UPDATE_PATIENT:
            return {
                ...state, 
                patient: payload,
                loading: false
            };
        case GET_PATIENTS:
            return {
                ...state, 
                patients: payload,
                loading: false
            };
        case PATIENT_ERROR:
            return {
                ...state, 
                error: payload,
                loading: false
            };
        default:
            return state;
    }
  }
  
export default patient;
