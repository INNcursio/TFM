// src/pages/CreateBlogPage.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CreateBlogForm from '../components/blog/CreateBlogForm';
import { useDispatch } from 'react-redux';
import { createBlog } from '../store/blogSlice';
import { useNavigate } from 'react-router-dom';
//import './CreateBlogPage.css';

const CreateBlogPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateBlog = async (blogData) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.access_token) {
        throw new Error('User not authenticated');
      }

      
      const blogDataWithUserId = {
        ...blogData,
        usuarioId: localStorage.getItem('userId'),
        autor: localStorage.getItem('userEmail'),
      };
      console.log(blogDataWithUserId);

      await dispatch(createBlog(blogDataWithUserId));
      navigate('/blogs');
    } catch (err) {
      console.error('Failed to create blog:', err);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8} lg={6}>
          <CreateBlogForm handleCreateBlog={handleCreateBlog} />
        </Col>
      </Row>
    </Container>
  );
};

export default CreateBlogPage;
