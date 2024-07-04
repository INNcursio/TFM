import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './CommentItem.css';

const CommentItem = ({ comment, onEdit, onDelete }) => {
  const userEmail = localStorage.getItem('userEmail');

  const canEditOrDelete = comment.autor === userEmail;

  return (
    <div className="comment-item">
      <p>{comment.contenido}</p>
      <small className="text-muted">Publicado por {comment.autor} el {new Date(comment.fechaCreacion).toLocaleDateString()}</small>
      {canEditOrDelete && (
        <div className="comment-actions">
          <Button variant="light" onClick={() => onEdit(comment)}>
            <FontAwesomeIcon icon={faEdit} /> Editar
          </Button>
          <Button variant="light" onClick={() => onDelete(comment.id)}>
            <FontAwesomeIcon icon={faTrash} /> Eliminar
          </Button>
        </div>
      )}
    </div>
  );
};

export default CommentItem;
