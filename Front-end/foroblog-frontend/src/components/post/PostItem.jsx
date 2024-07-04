// src/components/PostItem.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getCommentsByPostId, createComment, updateComment, deleteComment } from '../../store/commentSlice';
import CommentList from '../comment/CommentList';
import CreateCommentForm from '../comment/CreateCommentForm';
import EditPostForm from './EditPostForm';
import { updatePost, deletePost } from '../../store/postSlice';
import './PostItem.css';

const PostItem = ({ post }) => {
  const { id, contenido, autor, fechaCreacion } = post;
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const { comments, loading, error } = useSelector(state => state.comments);

  useEffect(() => {
    if (showComments) {
      dispatch(getCommentsByPostId(id));
    }
  }, [showComments, dispatch, id]);

  const handleCommentSubmit = () => {
    if (editingComment) {
      dispatch(updateComment(editingComment.id, { contenido: newComment })).then(() => {
        setEditingComment(null);
        setNewComment('');
      });
    } else {
      dispatch(createComment({ contenido: newComment, postId: id, autorId: localStorage.getItem('userId'), autor: localStorage.getItem('userEmail') })).then(() => {
        setNewComment('');
      });
    }
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment);
    setNewComment(comment.contenido);
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment(commentId)).then(() => {
      if (editingComment && editingComment.id === commentId) {
        setEditingComment(null);
        setNewComment('');
      }
    });
  };

  const handleEditPost = (updatedPost) => {
    dispatch(updatePost(id, updatedPost));
  };

  const handleDeletePost = () => {
    dispatch(deletePost(id));
  };

  const isAuthor = localStorage.getItem('userEmail') === autor;

  return (
    <Card className="post-item mb-4">
      <Card.Body>
        <Card.Text className="post-content">{contenido}</Card.Text>
        <div className="post-meta">
          <span className="text-muted">Publicado por {autor} el {new Date(fechaCreacion).toLocaleDateString()}</span>
        </div>
        <div className="post-actions">
          <Button variant="light" className="post-action" onClick={() => setShowComments(true)}>
            <FontAwesomeIcon icon={faComment} /> Comentar
          </Button>
          {isAuthor && (
            <Button variant="light" className="post-action" onClick={() => setShowEditModal(true)}>
              <FontAwesomeIcon icon={faEdit} /> Editar
            </Button>
          )}
          {isAuthor && (
            <Button variant="light" className="post-action" onClick={handleDeletePost}>
              <FontAwesomeIcon icon={faTrash} /> Eliminar
            </Button>
          )}
        </div>

        <Offcanvas show={showComments} onHide={() => setShowComments(false)} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Comentarios</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <CommentList
              comments={comments}
              loading={loading}
              error={error}
              onEdit={handleEditComment}
              onDelete={handleDeleteComment}
            />
            <div className="comment-form-container">
              <CreateCommentForm
                newComment={newComment}
                setNewComment={setNewComment}
                handleSubmit={handleCommentSubmit}
                editingComment={editingComment}
              />
            </div>
          </Offcanvas.Body>
        </Offcanvas>
        <EditPostForm
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          handleSubmit={handleEditPost}
          post={post}
        />
      </Card.Body>
    </Card>
  );
};

export default PostItem;
