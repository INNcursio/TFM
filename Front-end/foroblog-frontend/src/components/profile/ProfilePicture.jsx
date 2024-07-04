import React from 'react';
import { Image } from 'react-bootstrap';
import avaterImg from '../../assets/Avatar.webp';
import './ProfilePicture.css';

const ProfilePicture = ({ user }) => {
    const avatarUrl = user.profilePicture || 'https://via.placeholder.com/150';

    return (
        <div className="profile-picture text-center">
            <Image src={avaterImg} roundedCircle />
            <h3>{user.name}</h3>
        </div>
    );
};

export default ProfilePicture;
