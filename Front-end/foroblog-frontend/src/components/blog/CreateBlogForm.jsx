// src/components/blog/CreateBlogForm.jsx
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';


const CreateBlogForm = ({ handleCreateBlog }) => {
  const [titulo, setTitle] = useState('');
  const [descripcion, setDescription] = useState('');
  const [categoria, setCategory] = useState('');
  const [error, setError] = useState(null);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleCreateBlog({ titulo, descripcion, categoria });
      setTitle('');
      setDescription('');
      setCategory('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="mb-4 text-center">Crear Nuevo Blog</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group controlId="formBlogTitle" className="mb-3">
        <Form.Label>Título</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingresa el título del blog"
          value={titulo}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formBlogDescription" className="mb-3">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          placeholder="Ingresa la descripción del blog"
          value={descripcion}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formBlogCategory" className="mb-3">
        <Form.Label>Categoría</Form.Label>
        <Form.Control
          as="select"
          value={categoria}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Selecciona una categoría</option>
          <option value="Actualidad">Actualidad</option>
          <option value="Economía">Economía</option>
          <option value="Deportes">Deportes</option>
          <option value="Salud">Salud</option>
          <option value="Ciencia">Ciencia</option>
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit" className="w-100">
        Crear Blog
      </Button>
    </Form>
  );
};

export default CreateBlogForm;
