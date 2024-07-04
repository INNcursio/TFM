import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import blogReducer from './blogSlice';
import postReducer from './postSlice';
import commentReducer from './commentSlice';
import userReducer from './userSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        blogs: blogReducer,
        posts: postReducer,
        comments: commentReducer,
        user: userReducer,
    },
});

export default store;