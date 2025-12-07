import React, { useState, useRef } from 'react';
import styles from './ProfileImageUploader.module.css';

const ProfileImageUploader = ({ onImageChange, previewUrl: initialPreview, helperText }) => {
    const [preview, setPreview] = useState(initialPreview || null);
    const fileInputRef = useRef(null);

    const handleContainerClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);

            if (onImageChange) {
                onImageChange(file);
            }
        }
    };

    return (
        <div className={styles.container}>
            <label className={styles.label}>프로필 사진</label>
            {helperText && <p className={styles.helperText}>{helperText}</p>}

            <div
                className={styles.uploaderCircle}
                onClick={handleContainerClick}
                style={{ backgroundImage: preview ? `url(${preview})` : 'none' }}
            >
                {!preview && <span className={styles.plusIcon}>+</span>}
                <input
                    type="file"
                    ref={fileInputRef}
                    className={styles.hiddenInput}
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>
        </div>
    );
};

export default ProfileImageUploader;
