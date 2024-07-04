// src/store/blogSlice.js
import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogService';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: { blogs: [], currentBlog: null, loading: false, error: null, blogsById: [] },
  reducers: {
    createBlogStart: (state) => { state.loading = true; },
    createBlogSuccess: (state, action) => {
      state.blogs.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    createBlogFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getBlogsStart: (state) => { state.loading = true; },
    getBlogsSuccess: (state, action) => {
      state.blogs = action.payload;
      state.loading = false;
      state.error = null;
    },
    getBlogsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getBlogByIdStart: (state) => { state.loading = true; },
    getBlogByIdSuccess: (state, action) => {
      state.currentBlog = action.payload;
      state.loading = false;
      state.error = null;
    },
    getBlogByIdFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getBlogsByIdsStart: (state) => { state.loading = true; },
    getBlogsByIdsSuccess: (state, action) => {
      state.blogsById = action.payload;
      state.loading = false;
      state.error = null;
    },
    getBlogsByIdsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateBlogStart: (state) => { state.loading = true; },
    updateBlogSuccess: (state, action) => {
      const index = state.blogs.findIndex(blog => blog.id === action.payload.id);
      if (index !== -1) {
        state.blogs[index] = action.payload;
      }
      state.currentBlog = action.payload; // Asegurarse de que currentBlog se actualice
      state.loading = false;
      state.error = null;
    },
    updateBlogFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteBlogStart: (state) => { state.loading = true; },
    deleteBlogSuccess: (state, action) => {
      state.blogs = state.blogs.filter(blog => blog.id !== action.payload);
      state.loading = false;
      state.error = null;
    },
    deleteBlogFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  }
});

export const {
  createBlogStart,
  createBlogSuccess,
  createBlogFailure,
  getBlogsStart,
  getBlogsSuccess,
  getBlogsFailure,
  getBlogByIdStart,
  getBlogByIdSuccess,
  getBlogByIdFailure,
  updateBlogStart,
  updateBlogSuccess,
  updateBlogFailure,
  deleteBlogStart,
  deleteBlogSuccess,
  deleteBlogFailure,
  getBlogsByIdsStart,
  getBlogsByIdsSuccess,
  getBlogsByIdsFailure
} = blogSlice.actions;

export const createBlog = (blogData) => async dispatch => {
  dispatch(createBlogStart());
  try {
    const response = await blogService.createBlog(blogData);
    dispatch(createBlogSuccess(response.data));
  } catch (error) {
    dispatch(createBlogFailure(error.message));
  }
};

export const getBlogs = () => async dispatch => {
  dispatch(getBlogsStart());
  try {
    const response = await blogService.getBlogs();
    dispatch(getBlogsSuccess(response.data));
  } catch (error) {
    dispatch(getBlogsFailure(error.message));
  }
};

export const getBlogsByIds = (ids) => async dispatch => {
  dispatch(getBlogsByIdsStart());
  if(ids.length > 0){
    try {
      console.log("ids",ids);
      const response = await blogService.getBlogsByIds(ids);
      console.log(response.data);
      dispatch(getBlogsByIdsSuccess(response.data));
    } catch (error) {
      dispatch(getBlogsByIdsFailure(error.message));
    }
  }
  
}

export const getBlogsByUser = (userId) => async dispatch => {
  dispatch(getBlogsStart());
  try {
    const response = await blogService.getBlogbyUser(userId);
    dispatch(getBlogsSuccess(response.data));
  } catch (error) {
    dispatch(getBlogsFailure(error.message));
  }
};

export const getBlogById = (id) => async dispatch => {
  dispatch(getBlogByIdStart());
  try {
    const response = await blogService.getBlogById(id);
    dispatch(getBlogByIdSuccess(response.data));
  } catch (error) {
    dispatch(getBlogByIdFailure(error.message));
  }
}

export const updateBlog = (id, blogData) => async dispatch => {
  dispatch(updateBlogStart());
  try {
    const response = await blogService.updateBlog(id, blogData);
    dispatch(updateBlogSuccess(response.data));
  } catch (error) {
    dispatch(updateBlogFailure(error.message));
  }
};

export const deleteBlog = (id) => async dispatch => {
  dispatch(deleteBlogStart());
  try {
    await blogService.deleteBlog(id);
    dispatch(deleteBlogSuccess(id));
  } catch (error) {
    dispatch(deleteBlogFailure(error.message));
  }
};

export default blogSlice.reducer;
