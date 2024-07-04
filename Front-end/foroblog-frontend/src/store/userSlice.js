import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/userService';

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null, followingBlogs: [], loading: false, error: null },
  reducers: {
    followBlogStart: (state) => { state.loading = true; },
    followBlogSuccess: (state, action) => {
      state.followingBlogs.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    followBlogFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    unfollowBlogStart: (state) => { state.loading = true; },
    unfollowBlogSuccess: (state, action) => {
      state.followingBlogs = state.followingBlogs.filter(blogId => blogId !== action.payload);
      state.loading = false;
      state.error = null;
    },
    unfollowBlogFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getUserStart: (state) => { state.loading = true; },
    getUserSuccess: (state, action) => {
      state.user = action.payload;
      state.followingBlogs = action.payload.blogsSeguidos;
      state.loading = false;
      state.error = null;
    },
    getUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getUserUpdateStart: (state) => { state.loading = true; },
    getUserUpdateSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    getUserUpdateFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  }
});

export const {
  followBlogStart,
  followBlogSuccess,
  followBlogFailure,
  unfollowBlogStart,
  unfollowBlogSuccess,
  unfollowBlogFailure,
  getUserStart,
  getUserSuccess,
  getUserFailure,
  getUserUpdateStart,
  getUserUpdateSuccess,
  getUserUpdateFailure,
} = userSlice.actions;

export const followBlog = (userId, blogId) => async dispatch => {
  dispatch(followBlogStart());
  try {
    await userService.followBlog(userId, blogId);
    dispatch(followBlogSuccess(blogId));
  } catch (error) {
    dispatch(followBlogFailure(error.message));
  }
};

export const unfollowBlog = (userId, blogId) => async dispatch => {
  dispatch(unfollowBlogStart());
  try {
    await userService.unfollowBlog(userId, blogId);
    dispatch(unfollowBlogSuccess(blogId));
  } catch (error) {
    dispatch(unfollowBlogFailure(error.message));
  }
};

export const getUser = (id) => async dispatch => {
  dispatch(getUserStart());
  try {
    const response = await userService.getUser(id);
    dispatch(getUserSuccess(response.data));
  } catch (error) {
    dispatch(getUserFailure(error.message));
  }
};

export const updateUser = (id, userData) => async dispatch => {
  dispatch(getUserUpdateStart());
  try {
    const response = await userService.updateUser(id, userData);
    dispatch(getUserUpdateSuccess(response.data));
  } catch (error) {
    dispatch(getUserUpdateFailure(error.message));
  }
};

export default userSlice.reducer;
