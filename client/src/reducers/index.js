import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import patient from './patient'
import prescription from './prescription'
import visit from './visit'


export default combineReducers({
    auth,
    alert,
    patient,
    prescription,
    visit
});
