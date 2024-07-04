// src/components/auth/RegisterForm.jsx
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const RegisterForm = ({ handleRegister }) => {
  const [nombre, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleRegister(nombre, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={nombre}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="email" className="mt-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="password" className="mt-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-3">
        Register
      </Button>
    </Form>
  );
};

export default RegisterForm;
