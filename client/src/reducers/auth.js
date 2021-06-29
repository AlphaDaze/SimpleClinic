import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT
} from '../actions/constants';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function auth (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
      case USER_LOADED:
          return {
              ...state,
              isAuthenticated: true,
              loading: false,
              user: payload,
          };
      case LOGIN_SUCCESS:
          localStorage.setItem('token', payload.token);
          return {
              ...state,
              ...payload,
              isAuthenticated: true,
              loading: false,
          };
      case LOGIN_FAIL:
      case LOGOUT:
      case AUTH_ERROR:
          localStorage.removeItem('token');
          return {
              ...state,
              token: null,
              isAuthenticated: false,
              loading: false,
          };
      default:
          return state;
  }
}
