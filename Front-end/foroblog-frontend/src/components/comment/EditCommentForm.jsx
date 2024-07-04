import axios from 'axios';

const API_URL = 'http://api.foroblog.com/auth';

const login = (username, password) => {
    return axios.post(`${API_URL}/login`, { username, password });
};

const register = (userData) => {
    return axios.post(`${API_URL}/register`, userData);
};

const logout = () => {
    localStorage.removeItem('user');
};

export default { login, register, logout };
