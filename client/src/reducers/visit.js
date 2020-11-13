import {
    GET_VISIT,
    VISIT_ERROR
} from '../actions/constants';

const initialState = {
    visit: {},
    errors: {},
    loading: true,
}

const visit = (state = initialState, action) => {
    const { type, payload } = action;
    
    switch (type) {
        case GET_VISIT:
            return {
                ...state, 
                visit: payload,
                loading: false
            };
        case VISIT_ERROR:
            return {
                ...state, 
                error: payload,
                loading: false
            };
        default:
            return state;
    }
  }
  
export default visit;
