// src/components/BlogHeader.jsx
import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faTrash, faEdit, faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import './BlogHeader.css';

const BlogHeader = ({ 
  title, 
  description, 
  publishedDate, 
  author, 
  onReply, 
  onEdit, 
  onDelete, 
  isFollowing, 
  onFollowToggle 
}) => (
  <Card className="blog-header mb-4">
    <Card.Body>
      <Card.Title as="h1" className="blog-title">{title}</Card.Title>
      <Card.Text className="blog-description">{description}</Card.Text>
      <Card.Text className="blog-meta text-muted">
        Publicado el {new Date(publishedDate).toLocaleDateString()} por {author}
      </Card.Text>
      <div className="icon-container">
        <div className="reply-icon" onClick={onReply} title="Responder">
          <FontAwesomeIcon icon={faReply} />
        </div>
        {onEdit && (
          <div className="edit-icon" onClick={onEdit} title="Editar">
            <FontAwesomeIcon icon={faEdit} />
          </div>
        )}
        {onDelete && (
          <div className="delete-icon" onClick={onDelete} title="Borrar">
            <FontAwesomeIcon icon={faTrash} />
          </div>
        )}
        <div className="follow-icon" onClick={onFollowToggle} title={isFollowing ? "Dejar de seguir" : "Seguir"}>
          <FontAwesomeIcon icon={isFollowing ? faHeartBroken : faHeart} />
        </div>
      </div>
    </Card.Body>
  </Card>
);

export default BlogHeader;
