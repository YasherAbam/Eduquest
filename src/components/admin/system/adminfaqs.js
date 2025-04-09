import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/admin/dashboard/admindashboard.css';
import '../../../styles/admin/system/adminfaqs.css';
import logo from '../../../assets/images/logo.png';

const AdminFAQs = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);
    const [adminName, setAdminName] = useState('Admin');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [profileImage, setProfileImage] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');
    const [openFAQs, setOpenFAQs] = useState({});
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

    // FAQ Categories
    const categories = ['all', 'general', 'internship', 'activities', 'technical'];

    // FAQ Data
    const faqs = [
        {
            id: 1,
            category: 'general',
            question: 'What is EduQuest?',
            answer: 'EduQuest is a comprehensive platform designed to streamline and manage educational activities, internships, and administrative tasks for educational institutions.'
        },
        {
            id: 2,
            category: 'internship',
            question: 'How do I approve an internship request?',
            answer: 'To approve an internship request, navigate to the Internship Management section, select the pending request, review the details, and click the "Approve" button. You can also add comments if needed.'
        },
        {
            id: 3,
            category: 'activities',
            question: 'How do I manage activity submissions?',
            answer: 'Activity submissions can be managed through the Activities dashboard. You can view, approve, or reject submissions, and provide feedback to students.'
        },
        {
            id: 4,
            category: 'technical',
            question: 'How do I reset my admin password?',
            answer: 'To reset your password, click on the "Forgot Password" link on the login page. Follow the instructions sent to your registered email address.'
        },
        {
            id: 5,
            category: 'general',
            question: 'How do I contact technical support?',
            answer: 'You can contact technical support by emailing support@eduquest.com or through the Help desk section in your admin dashboard.'
        }
    ];

    const toggleFAQ = (id) => {
        setOpenFAQs(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const filteredFAQs = faqs.filter(faq => 
        activeCategory === 'all' || faq.category === activeCategory
    );

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
                            <Link to="/admin-aboutus">
                                <i className="fas fa-info-circle"></i>
                                <span>About Us</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin-FAQs" className="active">
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

            <main className="main-content">
                <h2 className="page-title">Frequently Asked Questions</h2>
                
                <div className="faqs-content">
                    <div className="faq-categories">
                        {categories.map(category => (
                            <button
                                key={category}
                                className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                        ))}
                    </div>
                    {filteredFAQs.map(faq => (
                        <div 
                            key={faq.id} 
                            className={`faq-card ${openFAQs[faq.id] ? 'active' : ''}`}
                        >
                            <div 
                                className="faq-question"
                                onClick={() => toggleFAQ(faq.id)}
                            >
                                <h3>{faq.question}</h3>
                                <i className={`fas fa-chevron-down faq-icon ${openFAQs[faq.id] ? 'open' : ''}`}></i>
                            </div>
                            {openFAQs[faq.id] && (
                                <div className="faq-answer">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
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

export default AdminFAQs;