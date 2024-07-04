// src/store/postSlice.js
import { createSlice } from '@reduxjs/toolkit';
import postService from '../services/postService';

const postSlice = createSlice({
  name: 'posts',
  initialState: { posts: [], currentPost: null, loading: false, error: null },
  reducers: {
    createPostStart: (state) => { state.loading = true; },
    createPostSuccess: (state, action) => {
      state.posts.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    createPostFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getPostsStart: (state) => { state.loading = true; },
    getPostsSuccess: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    },
    getPostsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getPostByIdStart: (state) => { state.loading = true; },
    getPostByIdSuccess: (state, action) => {
      state.currentPost = action.payload;
      state.loading = false;
      state.error = null;
    },
    getPostByIdFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getPostsByBlogIdStart: (state) => { state.loading = true; },
    getPostsByBlogIdSuccess: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    },
    getPostsByBlogIdFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updatePostStart: (state) => { state.loading = true; },
    updatePostSuccess: (state, action) => {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
      state.currentPost = action.payload;
      state.loading = false;
      state.error = null;
    },
    updatePostFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deletePostStart: (state) => { state.loading = true; },
    deletePostSuccess: (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
      state.loading = false;
      state.error = null;
    },
    deletePostFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // Obtener publicaciones por id de usuario
    getPostsByUserIdStart: (state) => { state.loading = true; },
    getPostsByUserIdSuccess: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    },
    getPostsByUserIdFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  }
});

export const {
  createPostStart,
  createPostSuccess,
  createPostFailure,
  getPostsStart,
  getPostsSuccess,
  getPostsFailure,
  getPostByIdStart,
  getPostByIdSuccess,
  getPostByIdFailure,
  getPostsByBlogIdStart,
  getPostsByBlogIdSuccess,
  getPostsByBlogIdFailure,
  updatePostStart,
  updatePostSuccess,
  updatePostFailure,
  deletePostStart,
  deletePostSuccess,
  deletePostFailure,
  getPostsByUserIdStart,
  getPostsByUserIdSuccess,
  getPostsByUserIdFailure
} = postSlice.actions;

export const createPost = (postData) => async dispatch => {
  dispatch(createPostStart());
  try {
    const response = await postService.createPost(postData);
    dispatch(createPostSuccess(response.data));
  } catch (error) {
    dispatch(createPostFailure(error.message));
  }
};

export const getPosts = () => async dispatch => {
  dispatch(getPostsStart());
  try {
    const response = await postService.getPosts();
    dispatch(getPostsSuccess(response.data));
  } catch (error) {
    dispatch(getPostsFailure(error.message));
  }
};

export const getPostById = (id) => async dispatch => {
  dispatch(getPostByIdStart());
  try {
    const response = await postService.getPostById(id);
    dispatch(getPostByIdSuccess(response.data));
  } catch (error) {
    dispatch(getPostByIdFailure(error.message));
  }
}

export const getPostsByBlogId = (blogId) => async dispatch => {
  dispatch(getPostsByBlogIdStart());
  try {
    const response = await postService.getPostsByBlogId(blogId);
    dispatch(getPostsByBlogIdSuccess(response.data));
  } catch (error) {
    dispatch(getPostsByBlogIdFailure(error.message));
  }
};

export const updatePost = (id, postData) => async dispatch => {
  dispatch(updatePostStart());
  try {
    const response = await postService.updatePost(id, postData);
    dispatch(updatePostSuccess(response.data));
  } catch (error) {
    dispatch(updatePostFailure(error.message));
  }
};

export const deletePost = (id) => async dispatch => {
  dispatch(deletePostStart());
  try {
    await postService.deletePost(id);
    dispatch(deletePostSuccess(id));
  } catch (error) {
    dispatch(deletePostFailure(error.message));
  }
};

export const getPostsByUserId = (userId) => async dispatch => {
  dispatch(getPostsByUserIdStart());
  try {
    const response = await postService.getPostsByUser(userId);
    console.log(response.data)
    dispatch(getPostsByUserIdSuccess(response.data));
  } catch (error) {
    dispatch(getPostsByUserIdFailure(error.message));
  }
};

export default postSlice.reducer;
