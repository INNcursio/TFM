// src/components/common/NavBar.jsx
import './NavBar.css';
import React from 'react';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch } from 'react-redux';
import { performLogout } from '../../store/authSlice';

const NavBar = ({ isAuthenticated, userEmail }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(performLogout());
    navigate('/');
    
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="mb-4 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">ForoBlog</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="fw-light">Inicio</Nav.Link>
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/blogs" className="fw-light">Mis Blogs</Nav.Link>
                <Nav.Link as={Link} to="/profile" className="fw-light">Perfil</Nav.Link>
                <Button variant="outline-light" className="ms-2" onClick={() => navigate('/create-blog')}>
                  Crear Blog
                </Button>
              </>
            )}
          </Nav>
          <Nav>
            {!isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/login" className="fw-light">Iniciar Sesión</Nav.Link>
                <Nav.Link as={Link} to="/register" className="fw-light">Registrarse</Nav.Link>
              </>
            ) : (
              <NavDropdown title={localStorage.getItem('userEmail')} id="basic-nav-dropdown" align="end">
                <NavDropdown.Item as={Link} to="/profile" className="fw-light">Perfil</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Cerrar Sesión</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
