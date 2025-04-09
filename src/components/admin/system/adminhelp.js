import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/admin/dashboard/admindashboard.css';
import '../../../styles/admin/system/adminhelp.css';
import logo from '../../../assets/images/logo.png';

const AdminHelp = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);
    const [adminName, setAdminName] = useState('Admin');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [profileImage, setProfileImage] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="admin-dashboard">
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
                    <div className="notification-icon">
                        <i className="fas fa-bell"></i>
                        {notificationCount > 0 && (
                            <span className="notification-count has-notifications">
                                {notificationCount}
                            </span>
                        )}
                    </div>
                    <span>Welcome, {adminName}!</span>
                    <div className="profile-pic" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        {profileImage ? (
                            <img src={profileImage} alt="Admin Profile" />
                        ) : (
                            <i className="fas fa-user-circle"></i>
                        )}
                    </div>
                </div>
            </header>

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
                    </ul>
                    
                    <div className="sidebar-category">System</div>
                    <ul>
                        <li>
                            <Link to="/admin-aboutus">
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
                    </ul>
                </nav>
            </aside>

            <main className="main-content">
                <h2 className="page-title">Help Center</h2>
                
                <div className="help-content">
                    <div className="search-help">
                        <i className="fas fa-search"></i>
                        <input 
                            type="text" 
                            placeholder="Search for help topics..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="help-section">
                        <h3>Getting Started</h3>
                        <div className="help-grid">
                            <div className="help-card">
                                <h4><i className="fas fa-rocket"></i> Quick Start Guide</h4>
                                <p>Learn the basics of navigating and using the admin dashboard.</p>
                                <Link to="/help/quick-start" className="help-link">
                                    Learn More <i className="fas fa-arrow-right"></i>
                                </Link>
                            </div>
                            <div className="help-card">
                                <h4><i className="fas fa-user-cog"></i> Account Setup</h4>
                                <p>Set up your admin profile and customize your preferences.</p>
                                <Link to="/help/account-setup" className="help-link">
                                    Learn More <i className="fas fa-arrow-right"></i>
                                </Link>
                            </div>
                            <div className="help-card">
                                <h4><i className="fas fa-shield-alt"></i> Security Guide</h4>
                                <p>Learn about security best practices and account protection.</p>
                                <Link to="/help/security" className="help-link">
                                    Learn More <i className="fas fa-arrow-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="help-section">
                        <h3>Common Tasks</h3>
                        <div className="help-grid">
                            <div className="help-card">
                                <h4><i className="fas fa-tasks"></i> Managing Activities</h4>
                                <p>Learn how to manage and track student activities.</p>
                                <Link to="/help/activities" className="help-link">
                                    Learn More <i className="fas fa-arrow-right"></i>
                                </Link>
                            </div>
                            <div className="help-card">
                                <h4><i className="fas fa-file-alt"></i> Document Management</h4>
                                <p>Handle document submissions and approvals efficiently.</p>
                                <Link to="/help/documents" className="help-link">
                                    Learn More <i className="fas fa-arrow-right"></i>
                                </Link>
                            </div>
                            <div className="help-card">
                                <h4><i className="fas fa-chart-bar"></i> Reports & Analytics</h4>
                                <p>Generate and understand various system reports.</p>
                                <Link to="/help/reports" className="help-link">
                                    Learn More <i className="fas fa-arrow-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="contact-support">
                        <h3>Need More Help?</h3>
                        <p>Our support team is ready to assist you with any questions or concerns.</p>
                        <Link to="/contact-support" className="support-button">
                            Contact Support
                        </Link>
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

export default AdminHelp;