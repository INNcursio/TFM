import React from 'react';
import CommentItem from './CommentItem';
import './CommentList.css';

const CommentList = ({ comments, loading, error, onEdit, onDelete }) => {
  return (
    <div className="comments-list">
      {loading && <p>Cargando comentarios...</p>}
      {error && <p>Error: {error}</p>}
      {comments.map(comment => (
        <CommentItem key={comment.id} comment={comment} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default CommentList;
