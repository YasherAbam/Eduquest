import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../../../styles/admin/dashboard/admindashboard.css';
import logo from '../../../assets/images/logo.png';
import InternshipModal from '../modal/intership';  // This is for the internship modal
import ProfileModal from '../profile/profilemodal'; // Import the ProfileModal
import NotificationModal from '../notification/notificationmodal';
import PendingInternshipModal from '../modal/internship_pending';
import PendingInHouseModal from '../modal/inhouse_pending';
import PendingOffCampusModal from '../modal/offcampus_pending';
import InHouseModal from '../modal/inhouse';
import OffCampusModal from '../modal/offcampus';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import  supabase  from '../../../config/supabase';
import ChatList from '../../chat/ChatList';
import ChatWindow from '../../chat/ChatWindows';
import FeedbackForm from '../../feedback/FeedBackForm';
import SatisfactionSurvey from '../../feedback/SatisfactionSurvery';



const AdminDashboard = () => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [notifications, setNotifications] = useState([]); // For future notification data
    const [notificationCount, setNotificationCount] = useState(0);
    const [profileImage, setProfileImage] = useState(null);
    const [adminName, setAdminName] = useState(''); // Add this state
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isPendingModalOpen, setIsPendingModalOpen] = useState(false);
    const [activePendingModal, setActivePendingModal] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const [internshipData, setInternshipData] = useState({});
    const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
    const [isInternshipModalOpen, setIsInternshipModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedChat, setSelectedChat] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [activeFeedbackTab, setActiveFeedbackTab] = useState('feedback');

    useEffect(() => {
        const getCurrentUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setCurrentUser(user);
            }
        };
        getCurrentUser();
    }, []);

   
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data: { user }, error } = await supabase.auth.getUser();
                console.log("Auth check result:", { user, error });
                
                if (error) {
                    console.error("Auth error:", error.message);
                    return;
                }
    
                if (user) {
                    console.log("Setting current user:", user);
                    setCurrentUser(user);
                } else {
                    console.log("No user found, trying to sign in");
                    const { data, error: signInError } = await supabase.auth.signInWithPassword({
                        email: 'admin@eduquest.com',
                        password: 'admin123'
                    });
                    
                    if (signInError) {
                        console.error("Sign in error:", signInError.message);
                        return;
                    }
                    
                    if (data.user) {
                        console.log("Successfully signed in:", data.user);
                        setCurrentUser(data.user);
                    }
                }
            } catch (error) {
                console.error("Unexpected error:", error);
            }
        };
    
        checkAuth();
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

        // Combine mock data with any future backend data
        const searchableData = [
            {
                type: 'Internship',
                items: [
                    ...(internshipData?.requestLetters?.map(item => ({
                        name: item.department,
                        status: item.status,
                        date: item.date
                    })) || []),
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
        console.log('Clicked result:', result);
        handleCardClick(result.category);
        setSearchQuery('');
        setSearchResults([]);
        setShowSearchResults(false);
    };



    

    const [profileData, setProfileData] = useState({
        fullName: 'Admin Name',
        adminId: 'ADM123456',
        email: 'admin@eduquest.com',
        phoneNumber: '+123456789',
        department: 'Administration',
        password: '********'
    });

     // Define the function to handle profile button click
    const handleProfileButtonClick = () => {
        setIsProfileModalOpen(true); // Open the profile modal
    };

    const fetchInternshipData = async (cardType) => {
        try {
            const response = await fetch(`/api/internships/${cardType}`); // Adjust the endpoint as needed
            const data = await response.json();
            
            // Ensure the data structure is correct
            setInternshipData({
                requestLetters: Array.isArray(data.requestLetters) ? data.requestLetters : [],
                compliance: Array.isArray(data.compliance) ? data.compliance : []
            });
            
            setIsModalOpen(true); // Open the modal
        } catch (error) {
            console.error("Error fetching internship data:", error);
        }
    };

    const handleCardClick = (cardType) => {
        let title = '';
        switch(cardType) {
            case 'internship':
                title = 'Internship Activity';
                setInternshipData({
                    requestLetters: [
                        { department: "SAM Department", status: "Pending", date: "09/20/24" },
                        { department: "SEICT Department", status: "Reviewed", date: "09/19/24" }
                    ],
                    compliance: [
                        { department: "SAM Department", status: "Pending", date: "09/23/24" },
                        { department: "SCJ Department", status: "Approved", date: "09/15/24" }
                    ]
                });
                setIsInternshipModalOpen(true);
                break;
    
            case 'inhouse':
                title = 'In-house Activity';
                setInternshipData({
                    requestLetters: [
                        { department: "In-house Activity 1", status: "Pending", date: "09/22/24" },
                        { department: "In-house Activity 2", status: "Approved", date: "09/21/24" }
                    ],
                    compliance: [
                        { department: "In-house Report 1", status: "Pending", date: "09/24/24" },
                        { department: "In-house Report 2", status: "Reviewed", date: "09/18/24" }
                    ]
                });
                setIsModalOpen(true);
                setActiveModal('inhouse');
                break;
    
            case 'offcampus':
                title = 'Off-campus Activity';
                setInternshipData({
                    requestLetters: [
                        { department: "Off-campus Event 1", status: "Pending", date: "09/25/24" },
                        { department: "Off-campus Event 2", status: "Approved", date: "09/17/24" }
                    ],
                    compliance: [
                        { department: "Off-campus Report 1", status: "Pending", date: "09/26/24" },
                        { department: "Off-campus Report 2", status: "Reviewed", date: "09/16/24" }
                    ]
                });
                setIsModalOpen(true);
                setActiveModal('offcampus');
                break;
    
            default:
                break;
        }
        setModalTitle(title);
    };

    useEffect(() => {
        const mockAdminData = {
            name: "Admin",
            profileImage: null
        };
        
        setAdminName(mockAdminData.name);
        setProfileImage(mockAdminData.profileImage);
    }, []);



    useEffect(() => {
        // Simulate getting admin data after login
        // Later replace this with actual API call
        const mockAdminData = {
            name: "Admin",  // This will come from your backend
            profileImage: null
        };
        
        setAdminName(mockAdminData.name);
        setProfileImage(mockAdminData.profileImage);
        
        // ... your existing notification code ...
    }, []);

    // This useEffect will be useful when you add backend
    useEffect(() => {
        // Temporary: You can simulate notifications for testing
        const mockNotifications = [
            { id: 1, message: "New internship request", read: false },
            { id: 2, message: "Document submitted", read: true }
        ];

        // Later, replace this with actual API call
        setNotifications(mockNotifications);
        setNotificationCount(mockNotifications.filter(n => !n.read).length);

        // Comment out WebSocket code until backend is ready
        // const socket = io();
        // socket.on('newNotification', handleNewNotification);
    }, []);

    // Function to handle new notifications (for future use)
    const handleNewNotification = (notification) => {
        setNotifications(prev => [...prev, notification]);
        setNotificationCount(prev => prev + 1);
    };

    const handlePendingCardClick = (cardType) => {
        setActivePendingModal(cardType);
        setIsPendingModalOpen(true);
    };
 
    const handleLogout = () => {
        // Clear user data
        localStorage.removeItem('userToken'); // Adjust based on your implementation
        // Redirect to login page
        navigate('/login'); // Use navigate instead of history.push
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            const notificationContainer = event.target.closest('.notification-icon-container');
            const notificationModal = event.target.closest('.notification-modal-content');
            
            if (isNotificationModalOpen && 
                !notificationContainer && 
                !notificationModal) {
                setIsNotificationModalOpen(false);
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isNotificationModalOpen]);
    
    // Add this effect to handle escape key
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape' && isNotificationModalOpen) {
                setIsNotificationModalOpen(false);
            }
        };
    
        document.addEventListener('keydown', handleEscKey);
        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [isNotificationModalOpen]);
        


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

            <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <nav>
                    <div className="sidebar-category">Main Navigation</div>
                    <ul>
                        <li>
                            <Link to="/admin-dashboard" className="active">
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
                    {/* Top three cards */}
                    <div className="dashboard-card">
                        <h3><i className="fas fa-briefcase"></i> Internship</h3>
                        <p>Request Letter:</p>
                        <p>Compliance of Requirements:</p>
                        <Link 
                            onClick={(e) => {
                                e.preventDefault();
                                handleCardClick('internship');
                            }} 
                            to="/internships" 
                            className="view-all"
                        >View All<i className="fas fa-arrow-right"></i></Link>
                    </div>

                    <div className="dashboard-card">
                        <h3><i className="fas fa-building"></i> In-house Activity</h3>
                        <p>Request Letter:</p>
                        <p>Compliance of Requirements:</p>
                        <Link 
                            onClick={(e) => {
                                e.preventDefault();
                                handleCardClick('inhouse');
                            }} 
                            to="/in-house-activities" 
                            className="view-all"
                        >View All<i className="fas fa-arrow-right"></i></Link>
                    </div>

                    <div className="dashboard-card">
                        <h3><i className="fas fa-globe"></i> Off-Campus Activity</h3>
                        <p>Request Letter:</p>
                        <p>Compliance of Requirements:</p>
                        <Link 
                            onClick={(e) => {
                                e.preventDefault();
                                handleCardClick('offcampus');
                            }} 
                            to="/off-campus-activities" 
                            className="view-all"
                        >View All<i className="fas fa-arrow-right"></i></Link>
                    </div>

                    {/* Bottom three cards */}
                    <div className="dashboard-card">
                        <h3><i className="fas fa-clock"></i> Pending Internship</h3>
                        <p>Total Pending:</p>
                        
                        <Link 
                            onClick={(e) => {
                                e.preventDefault();
                                handlePendingCardClick('internship');
                            }} 
                            to="/pending-internships" 
                            className="view-all"
                        >Review Pending<i className="fas fa-arrow-right"></i></Link>
                    </div>

                    <div className="dashboard-card">
                        <h3><i className="fas fa-clock"></i> Pending In-House Activity</h3>
                        <p>Total Pending:</p>
                        
                        <Link 
                            onClick={(e) => {
                                e.preventDefault();
                                handlePendingCardClick('inhouse');
                            }} 
                            to="/pending-in-house" 
                            className="view-all"
                        >Review Pending<i className="fas fa-arrow-right"></i></Link>
                    </div>

                    <div className="dashboard-card">
                        <h3><i className="fas fa-clock"></i> Pending Off-Campus Activity</h3>
                        <p>Total Pending:</p>
                        
                        <Link 
                            onClick={(e) => {
                                e.preventDefault();
                                handlePendingCardClick('offcampus');
                            }} 
                            to="/pending-off-campus" 
                            className="view-all"
                        >Review Pending<i className="fas fa-arrow-right"></i></Link>
                    </div>
                </div>
                

                {isFeedbackModalOpen && (
    <div className="admin-feedback-survey-modal-overlay" onClick={() => setIsFeedbackModalOpen(false)}>
        <div className="admin-feedback-survey-modal-content" onClick={e => e.stopPropagation()}>
            <div className="admin-feedback-survey-modal-header">
                <h2>{activeFeedbackTab === 'feedback' ? 'Quick Feedback' : 'System Evaluation Survey'}</h2>
                <button className="admin-feedback-survey-modal-close" onClick={() => setIsFeedbackModalOpen(false)}>×</button>
            </div>
            <div className="admin-feedback-survey-modal-tabs">
                <button 
                    className={`admin-feedback-survey-tab ${activeFeedbackTab === 'feedback' ? 'active' : ''}`}
                    onClick={() => setActiveFeedbackTab('feedback')}
                >
                    <i className="fas fa-comment"></i>
                    Quick Feedback
                </button>
                <button 
                    className={`admin-feedback-survey-tab ${activeFeedbackTab === 'satisfaction' ? 'active' : ''}`}
                    onClick={() => setActiveFeedbackTab('satisfaction')}
                >
                    <i className="fas fa-clipboard-list"></i>
                    System Survey
                </button>
            </div>
            <div className="admin-feedback-survey-modal-body">
                {activeFeedbackTab === 'feedback' ? (
                    <FeedbackForm 
                        userId={currentUser?.id}
                        activityId="system_feedback"
                        onSubmit={() => {
                            alert('Thank you for your feedback!');
                            setIsFeedbackModalOpen(false);
                        }}
                    />
                ) : (
                    <SatisfactionSurvey 
                        userId={currentUser?.id}
                        userType="admin"
                        onSubmit={() => {
                            alert('Thank you for completing the survey!');
                            setIsFeedbackModalOpen(false);
                        }}
                    />
                )}
            </div>
        </div>
    </div>
)}

                {/* Modal Usage */}
                <InternshipModal 
                    isOpen={isInternshipModalOpen} 
                    onClose={() => setIsInternshipModalOpen(false)} 
                    title={modalTitle}  // Use the dynamic title here
                    internshipData={internshipData}
                />
                {/* InHouse Modal */}
                <InHouseModal 
                    isOpen={isModalOpen && activeModal === 'inhouse'}
                    onClose={() => {
                        setIsModalOpen(false);
                        setActiveModal(null);
                    }}
                    title={modalTitle}
                 />
                {/* Off-Campus Modal */}
                <OffCampusModal 
                    isOpen={isModalOpen && activeModal === 'offcampus'}
                    onClose={() => {
                        setIsModalOpen(false);
                        setActiveModal(null);
                    }}
                    title={modalTitle}
                    data={internshipData}  
                />
                {/* Notification Modal */}
                <NotificationModal 
                    isOpen={isNotificationModalOpen} 
                    onClose={() => setIsNotificationModalOpen(false)} 
                    notifications={notifications} 
                />
                <ProfileModal 
                    isOpen={isProfileModalOpen} 
                    onClose={() => setIsProfileModalOpen(false)} 
                    profileData={profileData} 
                    onSave={(updatedData) => {
                        setProfileData(updatedData);
                        setIsProfileModalOpen(false);
                    }}
                />
                {/* Add PendingInternshipModal */}
                <PendingInternshipModal 
                    isOpen={isPendingModalOpen && activePendingModal === 'internship'} 
                    onClose={() => setIsPendingModalOpen(false)}
                    title="Pending Internship Request"
                    pendingData={[]} 
                />
                <PendingInHouseModal 
                    isOpen={isPendingModalOpen && activePendingModal === 'inhouse'} 
                    onClose={() => setIsPendingModalOpen(false)}
                    title="Pending In-House Activity Request"
                    pendingData={[]} 
                 />
                 <PendingOffCampusModal 
                    isOpen={isPendingModalOpen && activePendingModal === 'offcampus'} 
                    onClose={() => setIsPendingModalOpen(false)}
                    title="Pending Off-Campus Activity Request"
                    pendingData={[]} 
                 />
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

export default AdminDashboard;