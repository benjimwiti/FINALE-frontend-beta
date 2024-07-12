// src/components/ProfileImage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ProfileImageProps {
    filename: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ filename }) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/uploads/avatars/${filename}`, {
                    responseType: 'blob',
                });
                const imageUrl = URL.createObjectURL(response.data);
                setImageSrc(imageUrl);
                setLoading(false);
            } catch (err) {
                setError('Unable to load image');
                setLoading(false);
            }
        };

        fetchImage();
    }, [filename]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return <img src={imageSrc!} alt="Profile-pic" className='profile-pic' />;
};

export default ProfileImage;
