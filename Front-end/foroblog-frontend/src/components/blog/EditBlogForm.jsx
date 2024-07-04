// src/components/blog/EditBlogForm.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './EditBlogForm.css';

const EditBlogForm = ({ show, handleClose, handleSubmit, blog }) => {
  const [title, setTitle] = useState(blog?.titulo || '');
  const [description, setDescription] = useState(blog?.descripcion || '');

  useEffect(() => {
    if (blog) {
      setTitle(blog.titulo);
      setDescription(blog.descripcion);
    }
  }, [blog]);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ titulo: title, descripcion: description });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Blog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formDescription" className="mt-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Guardar Cambios
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditBlogForm;
