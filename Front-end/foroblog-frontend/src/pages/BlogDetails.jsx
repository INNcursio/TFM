// src/pages/BlogDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getBlogById, deleteBlog } from '../store/blogSlice';
import { getPostsByBlogId, createPost } from '../store/postSlice';
import { followBlog, unfollowBlog } from '../store/userSlice';
import BlogHeader from '../components/blog/BlogHeader';
import EditBlogForm from '../components/blog/EditBlogForm';
import PostItem from '../components/post/PostItem';
import CreatePostForm from '../components/post/CreatePostForm';
import { updateBlog } from '../store/blogSlice';
import { Container, Spinner, Alert } from 'react-bootstrap';
import './BlogDetails.css';

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const { currentBlog: blog, loading: blogLoading, error: blogError } = useSelector(state => state.blogs);
  const { posts, loading: postsLoading, error: postsError } = useSelector(state => state.posts);
  const { followingBlogs } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getBlogById(id));
    dispatch(getPostsByBlogId(id));
  }, [dispatch, id]);

  const handleReply = () => {
    setShowReplyModal(true);
  };

  const handleEdit = () => {
    // Aquí puedes manejar la lógica para editar el blog.
    setShowEditModal(true);
  };

  const handleUpdateBlog = (updatedBlog) => {
    dispatch(updateBlog(id, updatedBlog));
  };

  const handleDelete = () => {
    // Aquí puedes manejar la lógica para borrar el blog.
    dispatch(deleteBlog(id)).then(() => {
      navigate('/'); // Redirigir a la página principal después de borrar el blog
    });
    console.log('Borrar el blog');
  };

  const handleCloseReplyModal = () => {
    setShowReplyModal(false);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleCreatePost = (post) => {
    dispatch(createPost({ ...post, blogId: id, autorId: localStorage.getItem('userId'), autor: localStorage.getItem('userEmail'), blogTitulo: blog.titulo}));
  };

  const handleFollowToggle = () => {
    const userId = localStorage.getItem('userId');
    if (followingBlogs.includes(id)) {
      console.log('Unfollow blog');
      dispatch(unfollowBlog(userId, id));
    } else {
      dispatch(followBlog(userId, id));
    }
  };

  if (blogLoading || postsLoading) {
    return <Spinner animation="border" className="d-block mx-auto" />;
  }

  if (blogError) {
    return <Alert variant="danger">{blogError}</Alert>;
  }

  if (postsError) {
    return <Alert variant="danger">{postsError}</Alert>;
  }

  if (!blog) {
    return <Alert variant="danger">Blog no encontrado</Alert>;
  }

  const isAuthor = localStorage.getItem('userEmail') === blog.autor;
  const isFollowing = followingBlogs.includes(id);

  return (
    <Container className="blog-details">
      {blog && (
        <BlogHeader
          title={blog.titulo}
          description={blog.descripcion}
          publishedDate={blog.fecha}
          author={blog.autor}
          onReply={handleReply}
          onEdit={isAuthor ? handleEdit : null}
          onDelete={isAuthor ? handleDelete : null}
          isFollowing={isFollowing}
          onFollowToggle={handleFollowToggle}
        />
      )}
      <div className="posts">
        {posts.map(post => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
      <CreatePostForm
        show={showReplyModal}
        handleClose={handleCloseReplyModal}
        handleSubmit={handleCreatePost}
      />
      {isAuthor && (
        <EditBlogForm
          show={showEditModal}
          handleClose={handleCloseEditModal}
          handleSubmit={handleUpdateBlog}
          blog={blog}
        />
      )}
    </Container>
  );
};

export default BlogDetails;