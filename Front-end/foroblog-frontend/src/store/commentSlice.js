// src/store/commentSlice.js
import { createSlice } from '@reduxjs/toolkit';
import commentService from '../services/commentService';

const commentSlice = createSlice({
  name: 'comments',
  initialState: { comments: [], loading: false, error: null },
  reducers: {
    getCommentsStart: (state) => { state.loading = true; },
    getCommentsSuccess: (state, action) => {
      state.comments = action.payload;
      state.loading = false;
      state.error = null;
    },
    getCommentsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createCommentStart: (state) => { state.loading = true; },
    createCommentSuccess: (state, action) => {
      state.comments.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    createCommentFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateCommentStart: (state) => { state.loading = true; },
    updateCommentSuccess: (state, action) => {
      const index = state.comments.findIndex(comment => comment.id === action.payload.id);
      if (index !== -1) {
        state.comments[index] = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    updateCommentFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteCommentStart: (state) => { state.loading = true; },
    deleteCommentSuccess: (state, action) => {
      state.comments = state.comments.filter(comment => comment.id !== action.payload);
      state.loading = false;
      state.error = null;
    },
    deleteCommentFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getCommentsByUserIdStart: (state) => { state.loading = true; },
    getCommentsByUserIdSuccess: (state, action) => {
      state.comments = action.payload;
      state.loading = false;
      state.error = null;
    },
    getCommentsByUserIdFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  }
});

export const {
  getCommentsStart,
  getCommentsSuccess,
  getCommentsFailure,
  createCommentStart,
  createCommentSuccess,
  createCommentFailure,
  updateCommentStart,
  updateCommentSuccess,
  updateCommentFailure,
  deleteCommentStart,
  deleteCommentSuccess,
  deleteCommentFailure,
  getCommentsByUserIdStart,
  getCommentsByUserIdSuccess,
  getCommentsByUserIdFailure
} = commentSlice.actions;

export const getCommentsByPostId = (postId) => async dispatch => {
  dispatch(getCommentsStart());
  try {
    const response = await commentService.getCommentsByPostId(postId);
    console.log(response.data);
    dispatch(getCommentsSuccess(response.data));
  } catch (error) {
    dispatch(getCommentsFailure(error.message));
  }
};

export const createComment = (comment) => async dispatch => {
  dispatch(createCommentStart());
  try {
    const response = await commentService.createComment(comment);
    dispatch(createCommentSuccess(response.data));
  } catch (error) {
    dispatch(createCommentFailure(error.message));
  }
};

export const updateComment = (id, updateCommentDto) => async dispatch => {
  dispatch(updateCommentStart());
  try {
    const response = await commentService.updateComment(id, updateCommentDto);
    dispatch(updateCommentSuccess(response.data));
  } catch (error) {
    dispatch(updateCommentFailure(error.message));
  }
};

export const deleteComment = (id) => async dispatch => {
  dispatch(deleteCommentStart());
  try {
    await commentService.deleteComment(id);
    dispatch(deleteCommentSuccess(id));
  } catch (error) {
    dispatch(deleteCommentFailure(error.message));
  }
};

export const getCommentsByUserId = (userId) => async dispatch => {
  dispatch(getCommentsByUserIdStart());
  try {
    const response = await commentService.getCommentsByUser(userId);
    dispatch(getCommentsByUserIdSuccess(response.data));
  } catch (error) {
    dispatch(getCommentsByUserIdFailure(error.message));
  }
}

export default commentSlice.reducer;
