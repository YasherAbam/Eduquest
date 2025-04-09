import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/admin/dashboard/admindashboard.css';
import '../../../styles/admin/system/adminprivacy.css';
import logo from '../../../assets/images/logo.png';

const AdminPrivacy = () => {
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
                <h2 className="page-title">Privacy Policy</h2>
                
                <div className="privacy-content">
                    <div className="privacy-section">
                        <div className="privacy-header">
                            <h2>EduQuest Privacy Policy</h2>
                            <p>Your privacy is important to us</p>
                        </div>

                        <div className="table-of-contents">
                            <h4>Table of Contents</h4>
                            <ul>
                                <li><a href="#information-collection">Information Collection</a></li>
                                <li><a href="#information-use">Use of Information</a></li>
                                <li><a href="#data-protection">Data Protection</a></li>
                                <li><a href="#user-rights">Your Rights</a></li>
                                <li><a href="#contact">Contact Us</a></li>
                            </ul>
                        </div>

                        <section id="information-collection">
                            <h3>Information Collection</h3>
                            <p>We collect information that you provide directly to us, including:</p>
                            <ul>
                                <li>Personal information (name, email address, contact details)</li>
                                <li>Academic records and documentation</li>
                                <li>Activity participation records</li>
                                <li>System usage data and preferences</li>
                            </ul>
                        </section>

                        <section id="information-use">
                            <h3>Use of Information</h3>
                            <p>The information we collect is used for:</p>
                            <ul>
                                <li>Managing student activities and internships</li>
                                <li>Processing and tracking documentation</li>
                                <li>Improving our services and user experience</li>
                                <li>Communication regarding system updates and activities</li>
                            </ul>
                        </section>

                        <section id="data-protection">
                            <h3>Data Protection</h3>
                            <p>We implement appropriate security measures to protect your information:</p>
                            <ul>
                                <li>Secure data encryption</li>
                                <li>Regular security audits</li>
                                <li>Access controls and authentication</li>
                                <li>Data backup and recovery procedures</li>
                            </ul>
                        </section>

                        <section id="user-rights">
                            <h3>Your Rights</h3>
                            <p>You have the right to:</p>
                            <ul>
                                <li>Access your personal information</li>
                                <li>Request corrections to your data</li>
                                <li>Request deletion of your data</li>
                                <li>Opt-out of certain data collection</li>
                            </ul>
                        </section>

                        <section id="contact">
                            <h3>Contact Us</h3>
                            <div className="contact-info">
                                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                                <p>Email: <a href="mailto:privacy@eduquest.com">privacy@eduquest.com</a></p>
                                <p>Phone: +1 (123) 456-7890</p>
                                <p>Address: 123 Education Street, Manila, Philippines</p>
                            </div>
                        </section>

                        <p className="last-updated">Last updated: March 2024</p>
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

export default AdminPrivacy;