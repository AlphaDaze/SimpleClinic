import {
    GET_PRESCRIPTION,
    PRESCRIPTION_ERROR
} from '../actions/constants';

const initialState = {
    prescription: {},
    errors: {},
    loading: true,
}

const prescription = (state = initialState, action) => {
    const { type, payload } = action;
    
    switch (type) {
        case GET_PRESCRIPTION:
            return {
                ...state, 
                prescription: payload,
                loading: false
            };
        case PRESCRIPTION_ERROR:
            return {
                ...state, 
                error: payload,
                loading: false
            };
        default:
            return state;
    }
  }
  
export default prescription;
