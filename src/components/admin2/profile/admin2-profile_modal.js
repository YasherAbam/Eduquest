import React, { useState, useEffect } from 'react';
import './admin2-profile_modal.css';
import defaultProfileImage from '../../../assets/images/profile.jpg';

const Admin2ProfileModal = ({ isOpen, onClose, profileData, onSave }) => {
    const [formData, setFormData] = useState(profileData || {});
    const [profilePicture, setProfilePicture] = useState(defaultProfileImage);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (profileData) {
            setFormData(profileData);
        }
    }, [profileData]);

    useEffect(() => {
        if (!isOpen) {
            setIsEditing(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...formData, profilePicture });
        setIsEditing(false);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setFormData(profileData);
    };

    return (
        <div className="admin2-profile_modal-overlay" onClick={handleOverlayClick}>
            <div className="admin2-profile_modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="admin2-profile_modal-close-btn" onClick={onClose}>×</button>
                <div className="profile-picture">
                    <img src={profilePicture} alt="Profile" />
                    <div className="profile-info">
                        <div>{formData.fullName}</div>
                        <div className="role">Administrator</div>
                    </div>
                    {isEditing && (
                        <label className="upload-btn">
                            Change Picture
                            <input type="file" accept="image/*" onChange={handlePictureChange} />
                        </label>
                    )}
                </div>
                <div className="form-container">
                    <h2>Edit Profile</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName || ''}
                                onChange={handleChange}
                                disabled={!isEditing}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Admin ID</label>
                            <input type="text" name="adminId" value={formData.adminId || ''} disabled />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email || ''}
                                onChange={handleChange}
                                disabled={!isEditing}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber || ''}
                                onChange={handleChange}
                                disabled={!isEditing}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Department</label>
                            <input
                                type="text"
                                name="department"
                                value={formData.department || ''}
                                onChange={handleChange}
                                disabled={!isEditing}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password || ''}
                                onChange={handleChange}
                                disabled={!isEditing}
                                required
                            />
                        </div>
                        <div className="form-actions">
                            {!isEditing ? (
                                <button
                                    type="button"
                                    className="edit-profile-btn"
                                    onClick={handleEditClick}
                                >
                                    Edit Profile
                                </button>
                            ) : (
                                <>
                                    <button type="submit" className="save-changes-btn">
                                        Save Changes
                                    </button>
                                    <button
                                        type="button"
                                        className="cancel-btn"
                                        onClick={handleCancelClick}
                                    >
                                        Cancel
                                    </button>
                                </>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Admin2ProfileModal;