import {
    GET_PATIENT,
    PATIENT_ERROR
} from '../actions/constants';

const initialState = {
    patient: {},
    patients: [], 
    errors: {},
    loading: true,
}

export default function(state = initialState, action) {
    const { type, payload } = action;
    
    switch (type) {
        case GET_PATIENT:
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