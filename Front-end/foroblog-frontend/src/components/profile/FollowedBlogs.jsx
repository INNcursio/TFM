import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import BlogItem from '../blog/BlogItem';
import './FollowedBlogs.css';

const FollowedBlogs = ({ blogs }) => {
    console.log(blogs);
    return (
        <Row>
        {blogs.map((blog) => (
            <BlogItem key={blog.id} blog={blog} />
        ))}
    </Row>
    );
};

export default FollowedBlogs;
