import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/admin/dashboard/admindashboard.css';
import '../../../styles/admin/system/adminaboutus.css';
import logo from '../../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import NotificationModal from '../notification/notificationmodal';
import ProfileModal from '../profile/profilemodal';

const AdminAboutUs = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);
    const [adminName, setAdminName] = useState('Admin');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [profileImage, setProfileImage] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const navigate = useNavigate();
    const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    
    const [profileData, setProfileData] = useState({
        fullName: 'Admin Name',
        adminId: 'ADM123456',
        email: 'admin@eduquest.com',
        phoneNumber: '+123456789',
        department: 'Administration',
        password: '********',
    });
    const handleLogout = () => {
        // Add any cleanup or logout logic here
        navigate('/login');
    };

    const handleProfileClick = () => {
        setIsProfileModalOpen(true);
        setIsDropdownOpen(false);
    };

    const handleSaveProfile = (updatedData) => {
        setProfileData(updatedData);
        if (updatedData.profilePicture) {
            setProfileImage(updatedData.profilePicture);
        }
        setIsProfileModalOpen(false);
    };


        // Add notification handling functions
        const handleNotificationClick = () => {
            setIsNotificationModalOpen(true);
        };
    
        const handleCloseNotificationModal = () => {
            setIsNotificationModalOpen(false);
        };
    
        // Mock notifications data (you can replace this with real data later)
        useEffect(() => {
            // Simulating notifications data
            const mockNotifications = [
                {
                    id: 1,
                    title: "New Internship Request",
                    message: "SAM Department submitted a new internship request",
                    date: "2024-01-15",
                    status: "unread"
                },
                {
                    id: 2,
                    title: "In-house Activity Update",
                    message: "SEICT Department updated their activity status",
                    date: "2024-01-14",
                    status: "read"
                }
            ];
            setNotifications(mockNotifications);
            setNotificationCount(mockNotifications.filter(n => n.status === "unread").length);
        }, []);
    

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        console.log('Search query:', query);

        if (query.trim() === '') {
            setSearchResults([]);
            setShowSearchResults(false);
            return;
        }

        setIsSearching(true);
        setShowSearchResults(true);

        // Using the same data structure as dashboard
        const searchableData = [
            {
                type: 'Internship',
                items: [
                    { name: 'SAM Department', status: 'Pending', date: '09/20/24' },
                    { name: 'SEICT Department', status: 'Reviewed', date: '09/19/24' },
                    { name: 'SCJ Department', status: 'Approved', date: '09/15/24' }
                ]
            },
            {
                type: 'In-house',
                items: [
                    { name: 'In-house Activity 1', status: 'Pending', date: '09/22/24' },
                    { name: 'In-house Activity 2', status: 'Approved', date: '09/21/24' },
                    { name: 'In-house Workshop', status: 'In Progress', date: '09/23/24' }
                ]
            },
            {
                type: 'Off-campus',
                items: [
                    { name: 'Off-campus Event 1', status: 'Pending', date: '09/25/24' },
                    { name: 'Off-campus Event 2', status: 'Approved', date: '09/17/24' },
                    { name: 'Field Trip Activity', status: 'Scheduled', date: '09/24/24' }
                ]
            }
        ];

        // Search through all data
        const results = searchableData.flatMap(category => 
            category.items
                .filter(item => {
                    const nameMatch = item.name?.toLowerCase().includes(query);
                    const statusMatch = item.status?.toLowerCase().includes(query);
                    const dateMatch = item.date?.toLowerCase().includes(query);
                    return nameMatch || statusMatch || dateMatch;
                })
                .map(item => ({
                    ...item,
                    type: category.type,
                    category: category.type.toLowerCase().replace('-', '')
                }))
        );

        console.log('Search results:', results);
        setSearchResults(results);
        setIsSearching(false);
    };

    const handleSearchResultClick = (result) => {
        // Navigate to dashboard with the specific search
        navigate('/admin/dashboard', { 
            state: { 
                searchType: result.category,
                searchQuery: result.name
            } 
        });
        setSearchQuery('');
        setSearchResults([]);
        setShowSearchResults(false);
    };


    return (
        <div className="admin-dashboard">
            {/* Header - Same as AdminDashboard */}
            <header>
                <div className="burger-menu" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <i className="fas fa-bars"></i>
                </div>
                <div className="logo">
                    <img src={logo} alt="EduQuest Logo" />
                    <h1>EduQuest</h1>
                </div>

                <div className="search-bar">
                    <input 
                        type="text" 
                        placeholder="Search here..." 
                        value={searchQuery}
                        onChange={handleSearch}
                        className="search-input"
                    />
                    <button type="button" className="search-button">
                        {isSearching ? (
                            <i className="fas fa-spinner fa-spin"></i>
                        ) : (
                            <i className="fas fa-search"></i>
                        )}
                    </button>
                    {searchResults.length > 0 && (
                        <div className="search-results-container">
                            {searchResults.map((result, index) => (
                                <div
                                    key={index}
                                    className="search-result-item"
                                    onClick={() => handleSearchResultClick(result)}
                                >
                                    <div className="result-badge" data-type={result.type.toLowerCase()}>
                                        {result.type}
                                    </div>
                                    <div className="result-content">
                                        <div className="result-title">
                                            {result.name}
                                        </div>
                                        <div className="result-meta">
                                            <span className="status-dot" data-status={result.status.toLowerCase()}></span>
                                            <span className="status-text">{result.status}</span>
                                            <span className="date-text">{result.date}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>


                <div className="user-profile">
                    <div 
                        className={`notification-icon-container ${isNotificationModalOpen ? 'active' : ''}`} 
                        onClick={handleNotificationClick}
                    >
                        <i className="fas fa-bell"></i>
                        {notificationCount > 0 && (
                            <span className="notification-badge">{notificationCount}</span>
                        )}
                    </div>
                    
                    <NotificationModal
                        isOpen={isNotificationModalOpen}
                        onClose={handleCloseNotificationModal}
                        notifications={notifications}
                    />

                    <span id="userName">Welcome, Admin!</span>


                    <div className="profile-pic" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <i className="fas fa-user-circle"></i>
                    </div>
                    <ul className={`admin-dropdown-content ${isDropdownOpen ? 'active' : ''}`}>
                        <li className="profile-button" onClick={handleProfileClick}>
                            <a>
                                <i className="fas fa-user-cog"></i>
                                Profile
                            </a>
                        </li>
                        <li className="logout-button" onClick={handleLogout}>
                            <a>
                                <i className="fas fa-sign-out-alt"></i>
                                Logout
                            </a>
                        </li>
                    </ul>

                    <ProfileModal
                        isOpen={isProfileModalOpen}
                        onClose={() => setIsProfileModalOpen(false)}
                        profileData={profileData}
                        onSave={handleSaveProfile}
                    />
                </div>
            </header>

            {/* Sidebar - Same as AdminDashboard */}
            <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <nav>
                    <div className="sidebar-category">Main Navigation</div>
                    <ul>
                        <li>
                            <Link to="/admin-dashboard">
                                <i className="fas fa-tachometer-alt"></i>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin-requirements">
                                <i className="fas fa-file-alt"></i>
                                <span>Requirements</span>
                            </Link>
                        </li>
                    </ul>

                    <div className="sidebar-category">System</div>
                    <ul>
                        <li>
                            <Link to="/admin-aboutus" className="active">
                                <i className="fas fa-info-circle"></i>
                                <span>About Us</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin-FAQs">
                                <i className="fas fa-question-circle"></i>
                                <span>FAQs</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin-settings">
                                <i className="fas fa-cog"></i>
                                <span>Settings</span>
                            </Link>
                        </li>
                        <li>
                            <button 
                                className="nav-link"
                                onClick={() => setIsFeedbackModalOpen(true)}
                            >
                                <i className="fas fa-comment-alt"></i>
                                <span>Feedback</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content - About Us specific */}
            <main className="main-content">
                <h2 className="page-title">About Us</h2>
                <div className="dashboard-grid">
                    <div className="dashboard-card">
                        <h3><i className="fas fa-bullseye"></i> Our Mission</h3>
                        <p>To streamline and enhance the management of internships and activities for students, providing a seamless experience for both administrators and participants.</p>
                    </div>

                    <div className="dashboard-card">
                        <h3><i className="fas fa-eye"></i> Our Vision</h3>
                        <p>To be the leading platform for educational activity management, fostering growth and development in academic institutions.</p>
                    </div>

                    <div className="dashboard-card">
                        <h3><i className="fas fa-tasks"></i> What We Do</h3>
                        <ul>
                            <li>Manage internship applications and placements</li>
                            <li>Coordinate in-house activities</li>
                            <li>Facilitate off-campus programs</li>
                            <li>Track student progress and compliance</li>
                            <li>Generate comprehensive reports</li>
                        </ul>
                    </div>
                </div>
            </main>

            <footer>
                <p>&copy; 2024 EduQuest. All rights reserved.</p>
                <Link to="/help">Help</Link>
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/terms">Terms of Service</Link>
            </footer>
            
        </div>
    );
};

export default AdminAboutUs;