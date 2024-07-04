import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/blogs';

const getBlogs = () => {

  return axios.get(API_URL);
};

const getBlogbyUser = (id) => {
  //Obtener el token JWT del localStorage
  const user = localStorage.getItem('user');
  if (user) {
    const parsedUser = JSON.parse(user);
    const token = parsedUser.access_token;

    return axios.get(`${API_URL}/usuario/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    console.error('User not found in localStorage');
    return Promise.reject(new Error('User not found in localStorage'));
  }
};

const getBlogById = (id) => {
  // Obtener el token JWT del localStorage
  const user = localStorage.getItem('user');
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
}

const getBlogsByIds = (ids) => {
  // Obtener el token JWT del localStorage
  const user = localStorage.getItem('user');
  if (user) {
    const parsedUser = JSON.parse(user);
    const token = parsedUser.access_token;

    return axios.get(`${API_URL}/ids/${ids.join(',')}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    console.error('User not found in localStorage');
    return Promise.reject(new Error('User not found in localStorage'));
  }
}

const createBlog = (blogData) => {
  // Obtener el token JWT del localStorage
  const user = localStorage.getItem('user');
  if (user) {
    const parsedUser = JSON.parse(user);
    const token = parsedUser.access_token;

    return axios.post(API_URL, blogData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  else {
    console.error('User not found in localStorage');
    return Promise.reject(new Error('User not found in localStorage'));
  }
};

const updateBlog = (id, blogData) => {
  // Obtener el token JWT del localStorage
  const user = localStorage.getItem('user');
  if (user) {
    const parsedUser = JSON.parse(user);
    const token = parsedUser.access_token;

    return axios.put(`${API_URL}/${id}`, blogData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    console.error('User not found in localStorage');
    return Promise.reject(new Error('User not found in localStorage'));
  }
};

const deleteBlog = (id) => {
  // Obtener el token JWT del localStorage
  const user = localStorage.getItem('user');
  if (user) {
    const parsedUser = JSON.parse(user);
    const token = parsedUser.access_token;

    return axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  else {
    console.error('User not found in localStorage');
    return Promise.reject(new Error('User not found in localStorage'));
  }
};

export default { getBlogs, createBlog, updateBlog, deleteBlog, getBlogbyUser, getBlogById, getBlogsByIds };
