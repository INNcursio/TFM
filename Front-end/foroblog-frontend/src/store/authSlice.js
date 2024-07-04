import { createSlice } from '@reduxjs/toolkit';
import authService from '../services/authService';
import {jwtDecode} from 'jwt-decode';
import userService from '../services/userService';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, loading: false, error: null },
  reducers: {
    loginStart: (state) => { state.loading = true; },
    loginSuccess: (state, action) => { 
      state.user = action.payload; 
      state.loading = false; 
      state.error = null;
    },
    loginFailure: (state, action) => { 
      state.error = action.payload; 
      state.loading = false; 
    },
    logout: (state) => { 
      state.user = null; 
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
      localStorage.removeItem('access_token');
    },
    registerStart: (state) => { state.loading = true; },
    registerSuccess: (state, action) => { 
      state.user = action.payload; 
      state.loading = false; 
      state.error = null;
    },
    registerFailure: (state, action) => { 
      state.error = action.payload; 
      state.loading = false; 
    },
    loadUser: (state, action) => {
      state.user = action.payload;
    }
  }
});

export const { loginStart, loginSuccess, loginFailure, logout, registerStart, registerSuccess, registerFailure, loadUser } = authSlice.actions;

export const login = (email, password) => async dispatch => {
  dispatch(loginStart());
  try {
    const response = await authService.login(email, password);
    console.log("response.data:", response.data);

    const { access_token } = response.data;
    localStorage.setItem('access_token', access_token);

    const decodedToken = jwtDecode(access_token);
    const userId = decodedToken.userId || decodedToken.sub;
    const userEmail = decodedToken.email;

    localStorage.setItem('userId', userId);
    localStorage.setItem('userEmail', userEmail);

    const user = { ...response.data, email: userEmail };
    localStorage.setItem('user', JSON.stringify(user));

    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const register = (userData) => async dispatch => {
  dispatch(registerStart());
  try {
    const response = await userService.register(userData);

    const { access_token } = response.data;
    localStorage.setItem('access_token', access_token);

    const decodedToken = jwtDecode(access_token);
    const userId = decodedToken.userId || decodedToken.sub;
    const userEmail = decodedToken.email;

    localStorage.setItem('userId', userId);
    localStorage.setItem('userEmail', userEmail);

    const user = { ...response.data, email: userEmail };
    localStorage.setItem('user', JSON.stringify(user));

    dispatch(registerSuccess(user));
  } catch (error) {
    dispatch(registerFailure(error.message));
  }
};

export const performLogout = () => async dispatch => {
  authService.logout();
  dispatch(logout());
};

export const loadUserFromStorage = () => dispatch => {
  const user = localStorage.getItem('user');
  if (user) {
    dispatch(loadUser(JSON.parse(user)));
  }
};

export default authSlice.reducer;
