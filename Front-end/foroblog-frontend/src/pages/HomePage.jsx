import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { getBlogs } from '../store/blogSlice';
import BlogList from '../components/blog/BlogList';
import './HomePage.css';

function HomePage() {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector(state => state.blogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredBlogs = blogs.filter(blog => {
    return (
      (blog.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || blog.descripcion.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === '' || blog.categoria === selectedCategory)
    );
  });

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h1>Welcome to ForoBlog</h1>
          <p>Your place to share and discuss blog posts.</p>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search blogs by title or description..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Col>
        <Col md={6}>
          <Form.Control as="select" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Select a category</option>
            <option value="Actualidad">Actualidad</option>
            <option value="Economía">Economía</option>
            <option value="Deportes">Deportes</option>
            <option value="Salud">Salud</option>
            <option value="Ciencia">Ciencia</option>
          </Form.Control>
        </Col>
      </Row>
      <Row>
        <BlogList blogs={filteredBlogs} loading={loading} error={error} />
      </Row>
    </Container>
  );
}

export default HomePage;
