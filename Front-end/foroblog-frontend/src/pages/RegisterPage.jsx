// src/pages/RegisterPage.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RegisterForm from '../components/auth/RegisterForm';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../store/authSlice';
import './RegisterPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (nombre, email, password) => {
    try {
      await dispatch(register({ nombre, email, password }));  
      navigate('/');
    } catch (err) {
      console.error('Failed to register:', err);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <RegisterForm handleRegister={handleRegister} />
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
