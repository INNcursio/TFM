// src/components/BlogItem.jsx
import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import './BlogItem.css';
import actualidadImg from '../../assets/Actualidad.webp';
import economiaImg from '../../assets/Economia.webp';
import deportesImg from '../../assets/Deportes.webp';
import saludImg from '../../assets/Salud.webp';
import cienciaImg from '../../assets/Ciencia.webp';

const BlogItem = ({ blog }) => {
    const navigate = useNavigate();
    console.log(blog.categoria);
    const handleClick = () => {
        navigate(`/blogs/${blog.id}`);
    };
    const getCategoryImage = (category) => {
        switch (category) {
            case 'Actualidad':
                return actualidadImg;
            case 'Ciencia':
                return cienciaImg;
            case 'Deportes':
                return deportesImg;
            case 'Economía':
                return economiaImg;
            case 'Salud':
                return saludImg;
            default:
                return ''; // Puedes asignar una imagen por defecto si no hay coincidencia
        }
    };

    return (
        <Col md={6} lg={4} className="mb-4" onClick={handleClick} style={{ cursor: 'pointer' }}>
            <Card className="blog-card h-100 shadow-sm">
                <Card.Img 
                    variant="top" 
                    src={getCategoryImage(blog.categoria)} 
                    alt={blog.titulo} 
                    className="blog-card-img" 
                />
                <Card.Body>
                    <Card.Title className="text-truncate">{blog.titulo}</Card.Title>
                    <Card.Text className="blog-card-text text-truncate">
                        {blog.descripcion}
                    </Card.Text>
                    <Card.Text className="text-muted small">{blog.autor}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">
                        Publicado el {isNaN(Date.parse(blog.fecha)) ? 'Fecha no válida' : new Date(blog.fecha).toLocaleDateString()}
                    </small>
                </Card.Footer>
            </Card>
        </Col>
    );
};

export default BlogItem;