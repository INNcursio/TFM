// src/components/CreatePostForm.jsx
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './CreatePostForm.css';

const CreatePostForm = ({ show, handleClose, handleSubmit }) => {
  const [contenido, setContenido] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ contenido, fechaCreacion: new Date() });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Nueva Publicación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formContenido">
            <Form.Label>Contenido</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="submit-button">
            <FontAwesomeIcon icon={faPaperPlane} /> Enviar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreatePostForm;
