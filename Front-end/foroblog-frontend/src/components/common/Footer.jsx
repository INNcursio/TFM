// src/components/common/Footer.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-4">
      <Container>
        <Row className="py-4">
          <Col md={6}>
            <h5>Contacto</h5>
            <p>Email: contacto@foroblog.com</p>
            <p>Teléfono: +1 (555) 123-4567</p>
          </Col>
          <Col md={6} className="text-md-end">
            <h5>Síguenos</h5>
            <a href="#" className="text-white me-2">Facebook</a>
            <a href="#" className="text-white me-2">Twitter</a>
            <a href="#" className="text-white">Instagram</a>
          </Col>
        </Row>
        <Row className="py-2">
          <Col md={12} className="text-center">
            <a href="#" className="text-white me-2">Términos de Servicio</a>
            <a href="#" className="text-white">Política de Privacidad</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
