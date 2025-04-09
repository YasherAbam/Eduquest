import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../../styles/user/dashboard/userdashboard.css';
import logo from '../../../assets/images/logo.png';
import UserProfileModal from '../userprofile/user-profile_modal';
import { supabase } from '../../../config/supabase'
import UserInternshipModal from '../modal/user-internship_modal';
import UserInhouseModal from '../modal/user-inhouse_modal';
import UserOffcampusModal from '../modal/user-offcampus_modal';
import UserInternshipStatusModal from '../modal/user-InternshipStatus_modal';
import UserInhouseStatusModal from '../modal/user-InhouseStatus_modal';
import UserOffcampusStatusModal from '../modal/user-OffcampusStatus_modal';


const UserDashboard = () => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);
    const [profileImage, setProfileImage] = useState(null);
    const [userName, setUserName] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isTestAccount, setIsTestAccount] = useState(false);
    const [isInternshipModalOpen, setIsInternshipModalOpen] = useState(false);
    const [isInhouseModalOpen, setIsInhouseModalOpen] = useState(false);
    const [isOffcampusModalOpen, setIsOffcampusModalOpen] = useState(false);
    const [isInternshipStatusModalOpen, setIsInternshipStatusModalOpen] = useState(false);
    const [isInhouseStatusModalOpen, setIsInhouseStatusModalOpen] = useState(false);
    const [isOffcampusStatusModalOpen, setIsOffcampusStatusModalOpen] = useState(false)
    


    const [internshipData, setInternshipData] = useState({
        activityName: '',
        dates: '',
        status: 'pending',
        documents: [],
        feedback: ''
    });

    const [inhouseData, setInhouseData] = useState({
        activityName: '',
        dates: '',
        status: 'pending',
        documents: [],
        feedback: ''
    });

    const [offcampusData, setOffcampusData] = useState({
        activityName: '',
        dates: '',
        status: 'pending',
        documents: [],
        feedback: ''
    });

    const [profileData, setProfileData] = useState({
        fullName: '',
        studentId: '',
        email: '',
        phoneNumber: '',
        department: '',
        password: '*'
    });

    useEffect(() => {
        const initializeDashboard = async () => {
            // Check if this is a test account
            const session = JSON.parse(sessionStorage.getItem('supabaseSession'));
            const isTest = !session;
            setIsTestAccount(isTest);

            if (isTest) {
                // Load mock data for test account
                console.log('Loading test user data');
                const mockUserData = {
                    name: "User",
                    profileImage: null
                };
                setUserName(mockUserData.name);
                setProfileImage(mockUserData.profileImage);

                // Set mock profile data
                setProfileData({
                    fullName: 'Test Student',
                    studentId: 'TEST123',
                    email: 'user@eduquest.com',
                    phoneNumber: '+123456789',
                    department: 'Computer Science',
                    password: '********'
                });

                // Mock notifications
                const mockNotifications = [
                    { id: 1, message: "New requirement added", read: false },
                    { id: 2, message: "Application status updated", read: true }
                ];
                setNotifications(mockNotifications);
                setNotificationCount(mockNotifications.filter(n => !n.read).length);
            } else {
                try {
                    console.log('Loading real user data');
                    // Load real data from Supabase
                    const { data: profile, error } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', session.user.id)
                        .single();

                    if (error) throw error;

                    console.log('Loaded profile:', profile);

                    // Set real user data
                    setUserName(profile.full_name || profile.email);
                    setProfileImage(profile.avatar_url);
                    setProfileData({
                        fullName: profile.full_name || '',
                        studentId: profile.student_id || '',
                        email: profile.email,
                        phoneNumber: profile.phone_number || '',
                        department: profile.department || '',
                        password: '********'
                    });

                    // Fetch real notifications
                    const { data: notifs, error: notifsError } = await supabase
                        .from('notifications')
                        .select('*')
                        .eq('user_id', session.user.id)
                        .order('created_at', { ascending: false });

                    if (notifsError) throw notifsError;

                    console.log('Loaded notifications:', notifs);
                    setNotifications(notifs || []);
                    setNotificationCount(notifs?.filter(n => !n.read).length || 0);

                } catch (error) {
                    console.error('Error loading user data:', error);
                }
            }
        };

        initializeDashboard();
    }, []);

    const handleProfileClick = () => {
        console.log('Profile button clicked');
        setIsProfileModalOpen(true);
    };

    const handleSaveProfileChanges = async (updatedData) => {
        console.log('Saving profile changes:', updatedData);
        
        if (isTestAccount) {
            // Just update state for test account
            setProfileData(updatedData);
            setUserName(updatedData.fullName);
        } else {
            try {
                // Update real profile in Supabase
                const session = JSON.parse(sessionStorage.getItem('supabaseSession'));
                const { error } = await supabase
                    .from('profiles')
                    .update({
                        full_name: updatedData.fullName,
                        student_id: updatedData.studentId,
                        phone_number: updatedData.phoneNumber,
                        department: updatedData.department,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', session.user.id);

                if (error) throw error;

                // Update local state
                setProfileData(updatedData);
                setUserName(updatedData.fullName);
            } catch (error) {
                console.error('Error updating profile:', error);
                alert('Failed to update profile. Please try again.');
                return;
            }
        }
        
        setIsProfileModalOpen(false);
    };

    const handleCloseModal = () => {
        console.log('Modal closed');
        setIsProfileModalOpen(false);
    };

    const handleLogout = async () => {
        console.log('Logout button clicked');
        
        if (!isTestAccount) {
            // Sign out from Supabase for real users
            await supabase.auth.signOut();
        }
        
        // Clear all storage
        sessionStorage.clear();
        localStorage.removeItem('userToken');
        navigate('/login');
    };
    
    return (
        <div className="user-dashboard">
            <header>
                <div className="burger-menu" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <i className="fas fa-bars"></i>
                </div>
                <div className="logo">
                    <img src={logo} alt="EduQuest Logo" />
                    <h1>EduQuest</h1>
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="Search..." />
                    <button type="submit">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
                <div className="user-profile">
                    <div 
                        className={`notification-icon-container ${isNotificationModalOpen ? 'active' : ''}`}
                        onClick={() => setIsNotificationModalOpen(!isNotificationModalOpen)}
                    >
                        <i className="fas fa-bell"></i>
                        {notificationCount > 0 && (
                            <span className="notification-count has-notifications">
                                {notificationCount}
                            </span>
                        )}
                    </div>
                    <span id="userName">Welcome, {userName}!</span>
                    <div className="profile-pic" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        {profileImage ? (
                            <img src={profileImage} alt="User Profile" />
                        ) : (
                            <i className="fas fa-user-circle"></i>
                        )}
                    </div>
                    <ul className={`user-dropdown-content ${isDropdownOpen ? 'active' : ''}`}>
                        <li>
                            <button onClick={handleProfileClick} className="profile-button">
                                <i className="fas fa-user-circle"></i>
                                Profile
                            </button>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="logout-button">
                                <i className="fas fa-sign-out-alt"></i>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </header>
            <UserProfileModal 
                isOpen={isProfileModalOpen}
                onClose={handleCloseModal}
                profileData={profileData}
                onSave={handleSaveProfileChanges}
            />

            <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <nav>
                    <div className="sidebar-category">Main Navigation</div>
                    <ul>
                        <li>
                            <Link to="/user-dashboard" className="active">
                                <i className="fas fa-tachometer-alt"></i>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/user-requirements">
                                <i className="fas fa-file-alt"></i>
                                <span>Requirements</span>
                            </Link>
                        </li>
                    </ul>

                    <div className="sidebar-category">Settings</div>
                    <ul>
                    <li>
                            <Link to="/user-aboutus">
                                <i className="fas fa-info-circle"></i>
                                <span>About Us</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/user-FAQs">
                                <i className="fas fa-question-circle"></i>
                                <span>FAQs</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/user-settings">
                                <i className="fas fa-cog"></i>
                                <span>Settings</span>
                            </Link>
                        </li>
                    </ul>

                    <div className="sidebar-profile">
                        <div className="profile-image">
                            {profileImage ? (
                                <img src={profileImage} alt="User Profile" />
                            ) : (
                                <i className="fas fa-user-circle"></i>
                            )}
                        </div>
                        <div className="profile-info">
                            <h3>{userName}</h3>
                            <p>student@eduquest.com</p>
                        </div>
                    </div>
                </nav>
            </aside>

            <main className="main-content">
                <h2 className="page-title">Dashboard</h2>
                <div className="dashboard-grid">
                    <div className="dashboard-cards">
                        <div className="dashboard-card" onClick={() => setIsInternshipModalOpen(true)}>
                            <div className="card-content">
                                <h3>  <i className="fas fa-briefcase"></i>Internship</h3>
                            </div>
                            <div className="view-all">
                                <span>Click Here <i className="fas fa-arrow-right"></i></span> 
                            </div>
                        </div>
                </div>

                <div className="dashboard-card" onClick={() => setIsInhouseModalOpen(true)}>
                    <div className="card-content">
                        <h3><i className="fas fa-building"></i>In-House Activity</h3>
                    </div>
                    <div className="view-all">
                        <span>Click Here <i className="fas fa-arrow-right"></i></span>
                    </div>
                </div>

                <div className="dashboard-card" onClick={() => setIsOffcampusModalOpen(true)}>
                    <div className="card-content">
                        <h3> <i className="fas fa-globe"></i>Off-Campus Activity</h3>
                    </div>
                    <div className="view-all">
                        <span>Click Here <i className="fas fa-arrow-right"></i></span>
                    </div>
                </div>

                <div className="dashboard-card" onClick={() => setIsInternshipStatusModalOpen(true)}>
                        <h3><i className="fas fa-clock"></i> Status of Internship Request</h3>
                        <p>Total:</p>
                        <div className="view-all">
                            View Progress <i className="fas fa-arrow-right"></i>
                        </div>
                    </div>
                    <div className="dashboard-card" onClick={() => setIsInhouseStatusModalOpen(true)}>
                        <h3><i className="fas fa-clock"></i> Status of In-House Activity Request</h3>
                        <p>Total:</p>
                        <div className="view-all">
                            View Progress <i className="fas fa-arrow-right"></i>
                        </div>
                    </div>
                    <div className="dashboard-card" onClick={() => setIsOffcampusStatusModalOpen(true)}>
                        <h3><i className="fas fa-clock"></i> Status of Off-Campus Activity Request</h3>
                        <p>Total:</p>
                        <div className="view-all">
                            View Progress <i className="fas fa-arrow-right"></i>
                        </div>
                    </div>
                </div>
            </main>

            {/* Activity Modals */}
            <UserInternshipModal 
                isOpen={isInternshipModalOpen}
                onClose={() => setIsInternshipModalOpen(false)}
                internshipData={internshipData}
            />
            <UserInhouseModal 
                isOpen={isInhouseModalOpen}
                onClose={() => setIsInhouseModalOpen(false)}
            />
            <UserOffcampusModal 
                isOpen={isOffcampusModalOpen}
                onClose={() => setIsOffcampusModalOpen(false)}
            />

            {/* Status Modals */}
            <UserInternshipStatusModal 
                isOpen={isInternshipStatusModalOpen}
                onClose={() => setIsInternshipStatusModalOpen(false)}
                status={internshipData.status}
            />
            <UserInhouseStatusModal 
                isOpen={isInhouseStatusModalOpen}
                onClose={() => setIsInhouseStatusModalOpen(false)}
                status={inhouseData.status}
            />
            <UserOffcampusStatusModal 
                isOpen={isOffcampusStatusModalOpen}
                onClose={() => setIsOffcampusStatusModalOpen(false)}
                status={offcampusData.status}
            />
            

            <footer>
                <p>&copy; 2024 EduQuest. All rights reserved.</p>
                <Link to="/help">Help</Link>
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/terms">Terms of Service</Link>
            </footer>
        </div>
    );
};

export default UserDashboard;