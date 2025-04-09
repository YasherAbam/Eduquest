import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/admin/dashboard/admin2dashboard.css';
import logo from '../../../assets/images/logo.png';
import Admin2Internship from '../modal/admin2-internship';
import Admin2Inhouse from '../modal/admin2-inhouse';
import Admin2Offcampus from '../modal/admin2-offcampus';
import { supabase } from '../../../config/supabase';



const Admin2Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [adminName, setAdminName] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [notificationCount, setNotificationCount] = useState(1);
    const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    
    // Modal states
    const [isInternshipModalOpen, setIsInternshipModalOpen] = useState(false);
    const [isInhouseModalOpen, setIsInhouseModalOpen] = useState(false);
    const [isOffcampusModalOpen, setIsOffcampusModalOpen] = useState(false);
    
    // Selected item states
    const [selectedInternship, setSelectedInternship] = useState(null);
    const [selectedInhouse, setSelectedInhouse] = useState(null);
    const [selectedOffcampus, setSelectedOffcampus] = useState(null);
    
    // Pending items states
    const [pendingInternships, setPendingInternships] = useState([]);
    const [pendingInhouse, setPendingInhouse] = useState([]);
    const [pendingOffcampus, setPendingOffcampus] = useState([]);
    
    // Fetch functions
    const fetchPendingInternships = async () => {
        try {
            const { data, error } = await supabase
                .from('internships')
                .select('*')
                .eq('status', 'approved_by_admin1');
            
            if (error) throw error;
            setPendingInternships(data || []);
        } catch (error) {
            console.error('Error fetching internships:', error);
        }
    };

    const fetchPendingInhouse = async () => {
        try {
            const { data, error } = await supabase
                .from('inhouse_activities')
                .select('*')
                .eq('status', 'approved_by_admin1');
            
            if (error) throw error;
            setPendingInhouse(data || []);
        } catch (error) {
            console.error('Error fetching in-house activities:', error);
        }
    };

    const fetchPendingOffcampus = async () => {
        try {
            const { data, error } = await supabase
                .from('offcampus_activities')
                .select('*')
                .eq('status', 'approved_by_admin1');
            
            if (error) throw error;
            setPendingOffcampus(data || []);
        } catch (error) {
            console.error('Error fetching off-campus activities:', error);
        }
    };

    // Click handlers
    const handleInternshipClick = (internship) => {
        setSelectedInternship(internship);
        setIsInternshipModalOpen(true);
    };

    const handleInhouseClick = (inhouse) => {
        setSelectedInhouse(inhouse);
        setIsInhouseModalOpen(true);
    };

    const handleOffcampusClick = (offcampus) => {
        setSelectedOffcampus(offcampus);
        setIsOffcampusModalOpen(true);
    };

    useEffect(() => {
        const mockAdminData = {
            name: "Admin 2",
            profileImage: null
        };
        setAdminName(mockAdminData.name);
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        
        if (query.trim() === '') {
            setSearchResults([]);
            setShowSearchResults(false);
            return;
        }

        setIsSearching(true);
        setShowSearchResults(true);

        const searchableData = [
            {
                type: 'Internship',
                items: [
                    { name: 'SAM Department', status: 'Pending', date: '09/20/24' },
                    { name: 'SEICT Department', status: 'Reviewed', date: '09/19/24' }
                ]
            },
            {
                type: 'In-house',
                items: [
                    { name: 'In-house Activity 1', status: 'Pending', date: '09/22/24' },
                    { name: 'In-house Activity 2', status: 'Approved', date: '09/21/24' }
                ]
            },
            {
                type: 'Off-campus',
                items: [
                    { name: 'Off-campus Event 1', status: 'Pending', date: '09/25/24' },
                    { name: 'Off-campus Event 2', status: 'Approved', date: '09/17/24' }
                ]
            }
        ];

        const results = searchableData.flatMap(category => 
            category.items.filter(item => 
                item.name.toLowerCase().includes(query) ||
                item.status.toLowerCase().includes(query) ||
                item.date.toLowerCase().includes(query)
            ).map(item => ({
                ...item,
                type: category.type
            }))
        );

        setSearchResults(results);
        setIsSearching(false);
    };

    const handleLogout = () => {
        // Add logout logic here
    };

    const handleProfileButtonClick = () => {
        // Add profile navigation logic here
    };

    return (
        <div className="admin2-dashboard">
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
                        onClick={() => setIsNotificationModalOpen(!isNotificationModalOpen)}
                    >
                        <i className="fas fa-bell"></i>
                        {notificationCount > 0 && (
                            <span className="notification-count has-notifications">
                                {notificationCount}
                            </span>
                        )}
                    </div>
                    <span id="userName">Welcome, {adminName}!</span>
                    <div className="profile-pic" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        {profileImage ? (
                            <img src={profileImage} alt="Admin Profile" />
                        ) : (
                            <i className="fas fa-user-circle"></i>
                        )}
                    </div>
                    
                    <ul className={`admin-dropdown-content ${isDropdownOpen ? 'active' : ''}`}>
                        <li>
                            <button onClick={handleProfileButtonClick} className="profile-button">
                                <i className="fas fa-user-cog"></i>
                                Profile
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={handleLogout} 
                                className="logout-button" 
                            >
                                <i className="fas fa-sign-out-alt"></i>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </header>

            <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <nav>
                    <div className="sidebar-category">Main Navigation</div>
                    <ul>
                        <li>
                            <Link to="/admin2-dashboard" className="active">
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
                            <Link to="/admin2-aboutus">
                                <i className="fas fa-info-circle"></i>
                                <span>About Us</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin2-FAQs">
                                <i className="fas fa-question-circle"></i>
                                <span>FAQs</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin2-settings">
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

                    <div className="sidebar-profile">
                        <div className="profile-image">
                            {profileImage ? (
                                <img src={profileImage} alt="Admin Profile" />
                            ) : (
                                <i className="fas fa-user-circle"></i>
                            )}
                        </div>
                        <div className="profile-info">
                            <h3>{adminName}</h3>
                            <p>admin@eduquest.com</p>
                        </div>
                    </div>
                </nav>
            </aside>

            <main className="main-content">
                <h2 className="page-title">Dashboard</h2>
                <div className="dashboard-grid">
                <div className="dashboard-card" onClick={() => handleInternshipClick(pendingInternships[0])}>
                        <h3><i className="fas fa-briefcase"></i>Internships Activity</h3>
                        <p>Total Pending: <span className="status-dot status-pending"></span> {pendingInternships.length}</p>
                        <p>Progress Status: <span className="status-dot status-pending"></span> Awaiting Endorsement</p>
                        <Link to="#" className="view-all">
                            View Details <i className="fas fa-arrow-right"></i>
                        </Link>
                    </div>


                    <div className="dashboard-card" onClick={() => handleInhouseClick(pendingInhouse[0])}>
                    <h3><i className="fas fa-building"></i>In-house Activity</h3>
                    <p>Total Pending: <span className="status-dot status-pending"></span> {pendingInhouse.length}</p>
                    <p>Progress Status: <span className="status-dot status-pending"></span> Awaiting Endorsement</p>
                    <Link to="#" className="view-all">
                        View Details <i className="fas fa-arrow-right"></i>
                    </Link>
                </div>

                <div className="dashboard-card" onClick={() => handleOffcampusClick(pendingOffcampus[0])}>
                    <h3><i className="fas fa-globe"></i>Off-Campus Activity</h3>
                    <p>Total Pending: <span className="status-dot status-pending"></span> {pendingOffcampus.length}</p>
                    <p>Progress Status: <span className="status-dot status-pending"></span> Awaiting Endorsement</p>
                    <Link to="#" className="view-all">
                        View Details <i className="fas fa-arrow-right"></i>
                    </Link>
                </div>
                    
                </div>
            </main>

            {isInternshipModalOpen && (
                <Admin2Internship
                    isOpen={isInternshipModalOpen}
                    onClose={() => {
                        setIsInternshipModalOpen(false);
                        setSelectedInternship(null);
                        fetchPendingInternships();
                    }}
                    internshipData={selectedInternship}
                />
            )}

            {isInhouseModalOpen && (
                <Admin2Inhouse
                    isOpen={isInhouseModalOpen}
                    onClose={() => {
                        setIsInhouseModalOpen(false);
                        setSelectedInhouse(null);
                        fetchPendingInhouse();
                    }}
                    inhouseData={selectedInhouse}
                />
            )}

            {isOffcampusModalOpen && (
                <Admin2Offcampus
                    isOpen={isOffcampusModalOpen}
                    onClose={() => {
                        setIsOffcampusModalOpen(false);
                        setSelectedOffcampus(null);
                        fetchPendingOffcampus();
                    }}
                    offcampusData={selectedOffcampus}
                />
            )}

            <footer>
                <p>&copy; 2024 EduQuest. All rights reserved.</p>
                <Link to="/help">Help</Link>
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/terms">Terms of Service</Link>
            </footer>
        </div>
    );
};

export default Admin2Dashboard;