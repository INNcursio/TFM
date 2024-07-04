import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const UserInfo = ({ user, onEdit }) => {
    return (
        <div className="user-info">
            <h1>{user.nombre}</h1>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Bio:</strong> {user.bio}</p>
            <Button variant="primary" onClick={onEdit}>
                <FontAwesomeIcon icon={faEdit} /> Editar perfil
            </Button>
        </div>
    );
};

export default UserInfo;
