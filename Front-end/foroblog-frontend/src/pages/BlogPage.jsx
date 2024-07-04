// src/pages/BlogPage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogsByUser } from '../store/blogSlice';
import { Container } from 'react-bootstrap';
import './BlogPage.css';
import BlogList from '../components/blog/BlogList';

const BlogPage = () => {
    const dispatch = useDispatch();
    const { blogs, loading, error } = useSelector(state => state.blogs);
    

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            dispatch(getBlogsByUser(userId));
        }
    }, [dispatch]);

    return (
        <Container>
            <h1 className="my-4 text-center">Mis Blogs</h1>
            <BlogList blogs={blogs} loading={loading} error={error} />
        </Container>
    );
};

export default BlogPage;
