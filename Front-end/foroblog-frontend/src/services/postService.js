// src/services/postService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/posts';

const getPosts = async () => {
    // Obtener el token JWT del localStorage
    const user = localStorage.getItem('user');
    if (user) {
        const parsedUser = JSON.parse(user);
        const token = parsedUser.access_token;

        return axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } else {
        console.error('User not found in localStorage');
        return Promise.reject(new Error('User not found in localStorage'));
    }
};

// url: /blog/:blogId
const getPostsByBlogId = async (blogId) => {
    // Obtener el token JWT del localStorage
    const user = localStorage.getItem('user');
    if (user) {
        const parsedUser = JSON.parse(user);
        const token = parsedUser.access_token;

        return axios.get(`${API_URL}/blog/${blogId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } else {
        console.error('User not found in localStorage');
        return Promise.reject(new Error('User not found in localStorage'));
    }
};

const getPostById = async (postId) => {
    // Obtener el token JWT del localStorage
    const user = localStorage.getItem('user');
    if (user) {
        const parsedUser = JSON.parse(user);
        const token = parsedUser.access_token;

        return axios.get(`${API_URL}/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } else {
        console.error('User not found in localStorage');
        return Promise.reject(new Error('User not found in localStorage'));
    }
};

const createPost = async (post) => {
    // Obtener el token JWT del localStorage
    const user = localStorage.getItem('user');
    if (user) {
        const parsedUser = JSON.parse(user);
        const token = parsedUser.access_token;

        return axios.post(API_URL, post, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } else {
        console.error('User not found in localStorage');
        return Promise.reject(new Error('User not found in localStorage'));
    }
}

const deletePost = async (postId) => {
    // Obtener el token JWT del localStorage
    const user = localStorage.getItem('user');
    if (user) {
        const parsedUser = JSON.parse(user);
        const token = parsedUser.access_token;

        return axios.delete(`${API_URL}/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } else {
        console.error('User not found in localStorage');
        return Promise.reject(new Error('User not found in localStorage'));
    }
}

const updatePost = async (postId, post) => {
    // Obtener el token JWT del localStorage
    const user = localStorage.getItem('user');
    if (user) {
        const parsedUser = JSON.parse(user);
        const token = parsedUser.access_token;

        return axios.put(`${API_URL}/${postId}`, post, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } else {
        console.error('User not found in localStorage');
        return Promise.reject(new Error('User not found in localStorage'));
    }
}

const getPostsByUser = async (userId) => {
    // Obtener el token JWT del localStorage
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
}


export default {
    getPosts,
    getPostsByBlogId,
    getPostById,
    createPost,
    deletePost,
    updatePost,
    getPostsByUser,
};
