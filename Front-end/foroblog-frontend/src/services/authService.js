// src/services/authService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/auth';

const login = (email, password) => {
    const URL_LOGIN = `${API_URL}/login`;

    return axios.post(URL_LOGIN, { email, password });
};

const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('access_token');
    localStorage.removeItem('userEmail');

};



export default { login, logout};
