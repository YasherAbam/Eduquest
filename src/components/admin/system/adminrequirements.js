import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/admin/dashboard/admindashboard.css';
import '../../../styles/admin/system/adminrequirements.css';
import logo from '../../../assets/images/logo.png';
import { FaEdit, FaTrash, FaSearch, FaBell, FaBars, FaUser, FaCalendar, FaComments } from 'react-icons/fa';
import NotificationModal from '../notification/notificationmodal';
import ProfileModal from '../profile/profilemodal';
import ChatList from '../../chat/ChatList';
import ChatWindow from '../../chat/ChatWindows';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AdminRequirements = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [notificationCount, setNotificationCount] = useState(1);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [requirements, setRequirements] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRequirement, setEditingRequirement] = useState(null);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentUser, setCurrentUser] = useState({ id: 1, name: 'Admin' });
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [selectedChat, setSelectedChat] = useState(null);
    const [adminName, setAdminName] = useState('Admin');
    const [profileImage, setProfileImage] = useState(null);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);


    const handleEdit = (requirement) => {
        setEditingRequirement(requirement);
        setFormData(requirement);
        setIsModalOpen(true);
    };


    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        setShowSearchResults(query.trim() !== '');
        setIsSearching(true);
        // Simulated search results
        setTimeout(() => {
            setSearchResults([
                { type: 'Student', name: 'John Doe', status: 'Active', date: '2024-01-08' },
                { type: 'Course', name: 'Web Development', status: 'Ongoing', date: '2024-01-08' }
            ]);
            setIsSearching(false);
        }, 500);
    };

    const handleSearchResultClick = (result) => {
        console.log('Selected result:', result);
        setShowSearchResults(false);
    };

    const handleProfileButtonClick = () => {
        setIsProfileModalOpen(true);
        setIsDropdownOpen(false);
    };

    const handleLogout = () => {
        // Add logout logic here
        console.log('Logging out...');
    };



    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'internship',
        status: 'active',
        attachments: []
    });

    // Mock data
    React.useEffect(() => {
        const mockRequirements = [
            {
                id: 1,
                title: 'Internship Documentation',
                description: 'Submit all required internship documents including the endorsement letter, memorandum of agreement, and weekly reports.',
                category: 'internship',
                status: 'active'
            },
            {
                id: 2,
                title: 'In-house Training Requirements',
                description: 'Complete all necessary in-house training modules and submit certificates of completion.',
                category: 'inhouse',
                status: 'active'
            },
            {
                id: 3,
                title: 'Off-campus Activity Documentation',
                description: 'Prepare and submit all required documents for off-campus activities including parental consent and medical certificates.',
                category: 'offcampus',
                status: 'active'
            }
        ];
        setRequirements(mockRequirements);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRequirement = {
            id: Date.now(),
            ...formData
        };
        
        if (editingRequirement) {
            setRequirements(requirements.map(req => 
                req.id === editingRequirement.id ? { ...newRequirement } : req
            ));
        } else {
            setRequirements([...requirements, newRequirement]);
        }
        
        setIsModalOpen(false);
        setEditingRequirement(null);
        setFormData({
            title: '',
            description: '',
            category: 'internship',
            status: 'active',
            attachments: []
        });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this requirement?')) {
            setRequirements(requirements.filter(req => req.id !== id));
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="admin-dashboard">
        {/* Header */}
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
                <div className="header-actions">

                    {/* Calendar Icon */}
                    <div className="calendar-icon" onClick={() => setIsCalendarOpen(true)}>
                        <i className="fas fa-calendar-alt"></i>
                    </div>

                    {/* Calendar Modal */}
                    {isCalendarOpen && (
                        <div className="calendar-modal-overlay" onClick={() => setIsCalendarOpen(false)}>
                            <div className="calendar-modal-content" onClick={e => e.stopPropagation()}>
                                <div className="calendar-modal-header">
                                    <h2>Calendar</h2>
                                    <button className="calendar-close-btn" onClick={() => setIsCalendarOpen(false)}>
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                                <div className="calendar-container">
                                    <Calendar
                                        onChange={setSelectedDate}
                                        value={selectedDate}
                                        className="custom-calendar"
                                    />
                                </div>
                                <div className="calendar-footer">
                                    <div className="selected-date">
                                        Selected Date: {selectedDate.toLocaleDateString()}
                                    </div>
                                    <div className="calendar-actions">
                                        <button className="calendar-btn">Add Reminder</button>
                                        <button className="calendar-btn">View Plans</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
             </div>

                    <button 
                        className="chat-button"
                        onClick={() => {
                            console.log('Chat button clicked, current state:', { currentUser, isChatOpen });
                            setIsChatOpen(prev => !prev);
                        }}
                    >
                        <i className="fas fa-comments"></i>

                    </button>

                    {/* Chat Integration */}
                        {isChatOpen && (
                        <div className="chat-container">
                            {!selectedChat ? (
                                // Show chat list when no chat is selected
                                <ChatList 
                                    currentUser={currentUser}
                                    onSelectChat={(user) => setSelectedChat(user)}
                                />
                            ) : (
                                // Show chat window when a chat is selected
                                <ChatWindow
                                    currentUser={currentUser}
                                    otherUser={selectedChat}
                                    onClose={() => {
                                        setSelectedChat(null); // Clear selected chat
                                        setIsChatOpen(true);   // Keep chat open, just go back to list
                                    }}
                                />
                            )}
                        </div>
                    )}

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



            {/* Sidebar */}
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
                            <Link to="/admin-requirements" className="active">
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

            {/* Main Content */}
            <main className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                <div className="admin-requirements">
                    <div className="requirements-header">
                        <h1>Requirements Management</h1>
                        <button 
                            className="add-requirement-btn"
                            onClick={() => {
                                setEditingRequirement(null);
                                setIsModalOpen(true);
                            }}
                        >
                            <i className="fas fa-plus"></i> Add Requirement
                        </button>
                    </div>

                    <div className="requirements-grid">
                    {requirements.map((requirement) => (
    <div className="requirement-card" key={requirement.id}>
        <div className="requirement-title-wrapper">
            <h3>{requirement.title}</h3>
            <span className="status-badge">{requirement.status}</span>
        </div>
        <p>{requirement.description}</p>
        <div className="requirement-footer">
            <span className="category-tag">{requirement.category}</span>
            <div className="action-buttons">
                <button className="edit-btn" onClick={() => handleEdit(requirement)}>
                    <FaEdit />
                </button>
                <button className="delete-btn" onClick={() => handleDelete(requirement.id)}>
                    <FaTrash />
                </button>
            </div>
        </div>
    </div>
))}
                    </div>

                    {isModalOpen && (
                        <div className="requirement-modal-overlay">
                            <div className="requirement-modal">
                                <div className="modal-header">
                                    <h2>{editingRequirement ? 'Edit Requirement' : 'Add New Requirement'}</h2>
                                    <button 
                                        className="close-btn"
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        ×
                                    </button>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Category</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                                        >
                                            <option value="internship">Internship</option>
                                            <option value="inhouse">In-house</option>
                                            <option value="offcampus">Off-campus</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Status</label>
                                        <select
                                            value={formData.status}
                                            onChange={(e) => setFormData({...formData, status: e.target.value})}
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Attachments</label>
                                        <input
                                            type="file"
                                            multiple
                                            onChange={(e) => setFormData({...formData, attachments: Array.from(e.target.files)})}
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="submit" className="save-btn">
                                            {editingRequirement ? 'Update' : 'Save'} Requirement
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>

                 {/* Modals */}
                    {isNotificationModalOpen && (
                        <NotificationModal 
                            isOpen={isNotificationModalOpen}
                            onClose={() => setIsNotificationModalOpen(false)}
                        />
                    )}
                    {isProfileModalOpen && (
                        <ProfileModal 
                            isOpen={isProfileModalOpen}
                            onClose={() => setIsProfileModalOpen(false)}
                        />
                    )}

            </main>

        {/* Footer */}
        <footer>
                <p>&copy; 2024 EduQuest. All rights reserved.</p>
                <Link to="/help">Help</Link>
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/terms">Terms of Service</Link>
            </footer>

        </div>
        
    );
};

export default AdminRequirements;