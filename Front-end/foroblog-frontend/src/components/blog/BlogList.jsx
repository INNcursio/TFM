// src/components/BlogList.jsx
import React from 'react';
import { Row, Spinner, Alert } from 'react-bootstrap';
import BlogItem from './BlogItem';

const BlogList = ({ blogs, loading, error }) => {
    return (
        <>
            {loading && <Spinner animation="border" className="d-block mx-auto" />}
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
                {blogs.map((blog) => (
                    <BlogItem key={blog.id} blog={blog} />
                ))}
            </Row>
        </>
    );
};

export default BlogList;
