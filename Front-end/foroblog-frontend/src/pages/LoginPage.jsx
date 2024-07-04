// src/pages/LoginPage.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LoginForm from '../components/auth/LoginForm';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (email, password) => {
    try {
      await dispatch(login(email, password));
      navigate('/'); // Redirigir a la página principal después del inicio de sesión
    } catch (err) {
      console.error('Failed to login: ', err);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <LoginForm handleLogin={handleLogin} />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
