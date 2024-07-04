// src/services/commentService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/comments';

const getCommentsByPostId = async (postId) => {
    const user = localStorage.getItem('user');
    if (user) {
        const parsedUser = JSON.parse(user);
        const token = parsedUser.access_token;
        const url = `${API_URL}/post/${postId}`;
        console.log(url);
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } else {
        console.error('User not found in localStorage');
        return Promise.reject(new Error('User not found in localStorage'));
    }
};

const createComment = async (comment) => {
    const user = localStorage.getItem('user');
    if (user) {
        const parsedUser = JSON.parse(user);
        const token = parsedUser.access_token;
        return axios.post(API_URL, comment, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } else {
        console.error('User not found in localStorage');
        return Promise.reject(new Error('User not found in localStorage'));
    }
};

const updateComment = async (commentId, updateCommentDto) => {
    const user = localStorage.getItem('user');
    if (user) {
        const parsedUser = JSON.parse(user);
        const token = parsedUser.access_token;
        console.log(commentId);
        return axios.put(`${API_URL}/${commentId}`, updateCommentDto, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } else {
        console.error('User not found in localStorage');
        return Promise.reject(new Error('User not found in localStorage'));
    }
};

const deleteComment = async (commentId) => {
    const user = localStorage.getItem('user');
    if (user) {
        const parsedUser = JSON.parse(user);
        const token = parsedUser.access_token;
        return axios.delete(`${API_URL}/${commentId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } else {
        console.error('User not found in localStorage');
        return Promise.reject(new Error('User not found in localStorage'));
    }
};

const getCommentsByUser = async (userId) => {
    const user = localStorage.getItem('user');
    if (user) {
        const parsedUser = JSON.parse(user);
        const token = parsedUser.access_token;
        return axios.get(`${API_URL}/autor/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } else {
        console.error('User not found in localStorage');
        return Promise.reject(new Error('User not found in localStorage'));
    }
};

export default {
    getCommentsByPostId,
    createComment,
    updateComment,
    deleteComment,
    getCommentsByUser,
};
