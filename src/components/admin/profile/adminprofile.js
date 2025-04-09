import React, { useState } from 'react';
import ProfileModal from '../profile/profilemodal';
import '../../../styles/admin/profile/adminprofile.css';

const AdminProfile = () => {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [profileData, setProfileData] = useState({
        fullName: 'Admin Name',
        adminId: 'ADM123456',
        email: 'admin@eduquest.com',
        phoneNumber: '+123456789',
        department: 'Administration',
        password: '********'
    });

    const handleEditProfileClick = () => {
        setIsProfileModalOpen(true);
    };

    const handleSaveProfileChanges = (updatedData) => {
        setProfileData(updatedData);
        setIsProfileModalOpen(false);
    };

    const handleCloseModal = () => {
        setIsProfileModalOpen(false);
    };
    

    return (
        <div className="admin-dashboard">
            <header>
                {/* Header content */}
            </header>

            <main className="main-content">
                <h2 className="page-title">Admin Profile</h2>
                <button onClick={handleEditProfileClick} className="edit-profile-btn">
                    Edit Profile
                </button>

                <ProfileModal 
                    isOpen={isProfileModalOpen}
                    onClose={handleCloseModal}
                    profileData={profileData}
                    onSave={handleSaveProfileChanges}
                />
            </main>

            <footer>
                {/* Footer content */}
            </footer>
        </div>
    );
};

export default AdminProfile;