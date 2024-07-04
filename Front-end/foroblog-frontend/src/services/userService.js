import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/usuarios';

const register = (userData) => {
    return axios.post(`${API_URL}`, userData);
};

const followBlog = async (userId, blogId) => {
    const user = localStorage.getItem('user');
    console.log(userId, blogId)
    const endpoint = API_URL + userId + '/agregar-blog-seguido/' + blogId;
    console.log(endpoint);
    if (user) {
      const parsedUser = JSON.parse(user);
      const token = parsedUser.access_token;
  
      return axios.put(`${API_URL}/${userId}/agregar-blog-seguido/${blogId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      console.error('User not found in localStorage');
      return Promise.reject(new Error('User not found in localStorage'));
    }
  };
  
  const unfollowBlog = async (userId, blogId) => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      const token = parsedUser.access_token;
  
      return axios.put(`${API_URL}/${userId}/remover-blog-seguido/${blogId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      console.error('User not found in localStorage');
      return Promise.reject(new Error('User not found in localStorage'));
    }
  };
  
  const getUser = async (id) => {
    const user = localStorage.getItem('user');
    console.log(id)
    if (user) {
      const parsedUser = JSON.parse(user);
      const token = parsedUser.access_token;
      return axios.get(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      console.error('User not found in localStorage');
      return Promise.reject(new Error('User not found in localStorage'));
    }
  };

  const updateUser = async (id, userData) => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      const token = parsedUser.access_token;
  
      return axios.put(`${API_URL}/${id}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      console.error('User not found in localStorage');
      return Promise.reject(new Error('User not found in localStorage'));
    }
  }


// Perfil.

export default { register, followBlog, unfollowBlog, getUser, updateUser};