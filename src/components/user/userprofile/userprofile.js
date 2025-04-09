import React, { useState } from 'react';
import UserProfileModal from './user-profile_modal'; // Adjust the import path if necessary
import '../../../styles/user/userprofile/userprofile.css';

const UserProfile = () => {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [profileData, setProfileData] = useState({
        fullName: 'User Name',
        userId: 'USR123456',
        email: 'user@eduquest.com',
        phoneNumber: '+123456789',
        department: 'User Department',
        password: '********'
    });

    const handleEditProfileClick = () => {
        console.log('Edit Profile button clicked');
        setIsProfileModalOpen(true);
    };

    const handleSaveProfileChanges = (updatedData) => {
        console.log('Profile changes saved:', updatedData);
        setProfileData(updatedData);
        setIsProfileModalOpen(false);
    };

    const handleCloseModal = () => {
        console.log('Modal closed');
        setIsProfileModalOpen(false);
    };

    return (
        <div className="user-dashboard">
            <header>
                <div className="header-content">
                    <h1>EduQuest</h1>
                    <nav>
                        <ul>
                            <li><a href="/dashboard">Dashboard</a></li>
                            <li><a href="/profile">Profile</a></li>
                            <li><a href="/settings">Settings</a></li>
                            <li><a href="/logout">Logout</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="main-content">
                <h2 className="page-title">User Profile</h2>
                <button onClick={handleEditProfileClick} className="edit-profile-btn">
                    Edit Profile
                </button>

                {isProfileModalOpen && (
                    <UserProfileModal 
                        isOpen={isProfileModalOpen}
                        onClose={handleCloseModal}
                        profileData={profileData}
                        onSave={handleSaveProfileChanges}
                    />
                )}
            </main>

            <footer>
                <div className="footer-content">
                    <p>&copy; 2023 EduQuest. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default UserProfile;