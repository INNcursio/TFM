import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

const EditProfile = ({ user, onSave }) => {
    const [formData, setFormData] = useState(user);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Form className="edit-profile" onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
                <Form.Label>Nombre (Nick)</Form.Label>
                <Form.Control
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group controlId="formBio">
                <Form.Label>Bio</Form.Label>
                <Form.Control
                    type="text"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                />
            </Form.Group>
            <Button variant="success" type="submit">
                <FontAwesomeIcon icon={faSave} /> Guradar
            </Button>
        </Form>
    );
};

export default EditProfile;
