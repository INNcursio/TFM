import React, { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './CommentForm.css';

const CreateCommentForm = ({ newComment, setNewComment, handleSubmit, editingComment }) => {
  useEffect(() => {
    if (editingComment) {
      setNewComment(editingComment.contenido);
    }
  }, [editingComment, setNewComment]);

  return (
    <div className="comment-form">
      <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <Form.Group controlId="formNewComment">
          <Form.Control
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escribe un comentario..."
            required
          />
        </Form.Group>
        <div className="button-container">
          <Button variant="primary" type="submit" className="send-button">
            {editingComment ? 'Actualizar' : 'Enviar'} <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateCommentForm;
