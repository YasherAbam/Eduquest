import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/admin/dashboard/admindashboard.css';
import '../../../styles/admin/system/adminterms.css';
import logo from '../../../assets/images/logo.png';

const AdminTerms = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);
    const [adminName, setAdminName] = useState('Admin');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [profileImage, setProfileImage] = useState(null);

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
                            <Link to="/admin/dashboard">
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
                <h2 className="page-title">Terms of Service</h2>
                
                <div className="terms-content">
                    <div className="terms-section">
                        <div className="terms-header">
                            <h2>EduQuest Terms of Service</h2>
                            <p>Last updated: March 2024</p>
                        </div>

                        <div className="table-of-contents">
                            <h4>Table of Contents</h4>
                            <ul>
                                <li><a href="#acceptance">Acceptance of Terms</a></li>
                                <li><a href="#access">Access and Use</a></li>
                                <li><a href="#user-responsibilities">User Responsibilities</a></li>
                                <li><a href="#intellectual-property">Intellectual Property</a></li>
                                <li><a href="#termination">Termination</a></li>
                                <li><a href="#disclaimers">Disclaimers</a></li>
                                <li><a href="#contact">Contact Information</a></li>
                            </ul>
                        </div>

                        <section id="acceptance">
                            <h3>1. Acceptance of Terms</h3>
                            <p>By accessing and using the EduQuest platform, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</p>
                            <div className="highlight-box">
                                <p>These terms constitute a legally binding agreement between you and EduQuest.</p>
                            </div>
                        </section>

                        <section id="access">
                            <h3>2. Access and Use</h3>
                            <p>EduQuest grants you a limited, non-exclusive, non-transferable right to access and use the platform for its intended purpose.</p>
                            <ul>
                                <li>You must maintain the confidentiality of your account credentials</li>
                                <li>You are responsible for all activities that occur under your account</li>
                                <li>Unauthorized access or use is strictly prohibited</li>
                            </ul>
                        </section>

                        <section id="user-responsibilities">
                            <h3>3. User Responsibilities</h3>
                            <p>As a user of EduQuest, you agree to:</p>
                            <ul>
                                <li>Provide accurate and complete information</li>
                                <li>Comply with all applicable laws and regulations</li>
                                <li>Respect the privacy and rights of other users</li>
                                <li>Not engage in any harmful or disruptive behavior</li>
                            </ul>
                        </section>

                        <section id="intellectual-property">
                            <h3>4. Intellectual Property</h3>
                            <p>All content and materials available on EduQuest are protected by intellectual property rights.</p>
                            <div className="highlight-box">
                                <p>Users may not copy, modify, distribute, or use any content without explicit permission.</p>
                            </div>
                        </section>

                        <section id="termination">
                            <h3>5. Termination</h3>
                            <p>EduQuest reserves the right to:</p>
                            <ul>
                                <li>Suspend or terminate access to the platform</li>
                                <li>Modify or discontinue any service</li>
                                <li>Remove any content without prior notice</li>
                            </ul>
                            <p className="warning-text">Violations of these terms may result in immediate account termination.</p>
                        </section>

                        <section id="disclaimers">
                            <h3>6. Disclaimers</h3>
                            <p>The platform is provided "as is" and "as available" without any warranties.</p>
                            <ul>
                                <li>EduQuest is not responsible for any errors or omissions</li>
                                <li>We do not guarantee uninterrupted access</li>
                                <li>Users assume all risks associated with platform use</li>
                            </ul>
                        </section>

                        <section id="contact">
                            <h3>7. Contact Information</h3>
                            <div className="contact-info">
                                <p>For questions about these Terms of Service, please contact us:</p>
                                <p>Email: <a href="mailto:terms@eduquest.com">terms@eduquest.com</a></p>
                                <p>Phone: +1 (123) 456-7890</p>
                                <p>Address: 123 Education Street, Manila, Philippines</p>
                            </div>
                        </section>

                        <p className="last-updated">These terms are effective as of March 2024</p>
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

export default AdminTerms;