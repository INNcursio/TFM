import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { deletePost } from '../../store/postSlice';
import './UserPosts.css';

const UserPosts = ({ posts }) => {
    const dispatch = useDispatch();

    const handleDelete = (postId) => {
        dispatch(deletePost(postId));
    };

    return (
        <Card>
            <Card.Header>Publicaciones del usuario</Card.Header>
            <ListGroup variant="flush">
                {posts.map(post => (
                    <ListGroup.Item key={post.id}>
                        <p>{post.contenido}</p>
                        <small className="text-muted">En el blog: {post.blogTitulo}</small>
                        <Button variant="danger" className="delete-button" onClick={() => handleDelete(post.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Card>
    );
};

export default UserPosts;
