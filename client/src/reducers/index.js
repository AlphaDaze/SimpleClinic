import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import patient from './patient'


export default combineReducers({
    auth,
    alert,
    patient,
});
