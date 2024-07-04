// src/components/post/EditPostForm.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import './EditPostForm.css';

const EditPostForm = ({ show, handleClose, handleSubmit, post }) => {
  const [content, setContent] = useState(post?.contenido || '');

  useEffect(() => {
    if (post) {
      setContent(post.contenido);
    }
  }, [post]);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ contenido: content });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar publicación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formContent">
            <Form.Label>Contenido</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Guardar <FontAwesomeIcon icon={faSave} />
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditPostForm;
