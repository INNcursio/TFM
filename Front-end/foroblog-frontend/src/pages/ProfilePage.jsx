import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Nav, Tab, Spinner, Alert } from 'react-bootstrap';
import ProfilePicture from '../components/profile/ProfilePicture';
import UserInfo from '../components/profile/UserInfo';
import EditProfile from '../components/profile/EditProfile';
import UserPosts from '../components/profile/UserPosts';
import UserComments from '../components/profile/UserComments';
import FollowedBlogs from '../components/profile/FollowedBlogs';
import { getUser, updateUser } from '../store/userSlice';
import { getPostsByUserId } from '../store/postSlice';
import { getCommentsByUserId } from '../store/commentSlice';
import { getBlogsByIds } from '../store/blogSlice';
import './ProfilePage.css';

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const userId = localStorage.getItem('userId'); // Obtener el userId del localStorage
    const { user, loading: userLoading, error: userError } = useSelector(state => state.user);
    const { posts, loading: postsLoading, error: postsError } = useSelector(state => state.posts);
    const { comments, loading: commentsLoading, error: commentsError } = useSelector(state => state.comments);
    const { blogsById, loading: blogsByIdLoading, error: blogsByIdError } = useSelector(state => state.blogs);

    useEffect(() => {
        if (userId) {
            dispatch(getUser(userId));
            dispatch(getPostsByUserId(userId));
            dispatch(getCommentsByUserId(userId));
        }
    }, [dispatch, userId]);

    useEffect(() => {
        if (user?.blogsSeguidos) {
            dispatch(getBlogsByIds(user.blogsSeguidos));
            console.log(blogsById)
        }
    }, [dispatch, user]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = (updatedUser) => {
        dispatch(updateUser(userId, updatedUser));
        setIsEditing(false);
    };

    if (userLoading || postsLoading || commentsLoading) {
        return <Spinner animation="border" className="d-block mx-auto" />;
    }

    if (userError || postsError || commentsError) {
        return <Alert variant="danger">{userError || postsError || commentsError}</Alert>;
    }

    return (
        <Container className="user-profile">
            {user && (
                <>
                    <Row className="justify-content-md-center">
                        <Col md={4}>
                            <ProfilePicture user={user} />
                        </Col>
                        <Col md={8}>
                            {isEditing ? (
                                <EditProfile user={user} onSave={handleSave} />
                            ) : (
                                <UserInfo user={user} onEdit={handleEdit} />
                            )}
                        </Col>
                    </Row>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="posts">
                        <Row className="mt-4">
                            <Col sm={3}>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link eventKey="posts">Publicaciones</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="comments">Comentarios</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={9}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="posts">
                                        <UserPosts posts={posts} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="comments">
                                        <UserComments comments={comments} />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                    <Row className="mt-4">
                        {/* Mostrar solo si el usuario sigue blogs el tamaño es mayor a 0 */
                        user.blogsSeguidos && user.blogsSeguidos.length > 0 && (
                            <Col>
                                <FollowedBlogs blogs={blogsById} />
                            </Col>
                           
                        )}

                    </Row>
                </>
            )}
        </Container>
    );
};

export default ProfilePage;
