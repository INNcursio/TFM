import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteComment } from '../../store/commentSlice';
import './UserComments.css';

const UserComments = ({ comments }) => {
    const dispatch = useDispatch();

    const handleDelete = (commentId) => {
        dispatch(deleteComment(commentId));
    };

    return (
        <Card>
            <Card.Header>Comentarios del usuario</Card.Header>
            <ListGroup variant="flush">
                {comments.map(comment => (
                    <ListGroup.Item key={comment.id}>
                        <p>{comment.contenido}</p>
                        <small className="text-muted">En la publicación: {comment.postId}</small>
                        <Button variant="danger" className="delete-button" onClick={() => handleDelete(comment.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Card>
    );
};

export default UserComments;
