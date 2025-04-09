import React from 'react';
import { Link } from 'react-router-dom';
import '../../../components/user/requirements/user-requirements.css';
import '../../../styles/user/dashboard/userdashboard.css';
import logo from '../../../assets/images/logo.png'; // Adjust the logo path if necessary

const Requirements = () => {
    const requirementsData = [
        { id: 1, title: 'Requirement 1', status: 'Pending' },
        { id: 2, title: 'Requirement 2', status: 'Completed' },
        { id: 3, title: 'Requirement 3', status: 'Pending' },
    ];

    return (
        <div className="user-dashboard">
            <header>
                <div className="burger-menu">
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
                    <span id="userName">Welcome, Student!</span>
                    <div className="profile-pic">
                        <i className="fas fa-user-circle"></i>
                    </div>
                </div>
            </header>

            <aside className="sidebar">
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
                            <Link to="/requirements">
                                <i className="fas fa-file-alt"></i>
                                <span>Requirements</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            <main className="main-content">
                <h2 className="page-title">Requirements</h2>
                <div className="requirements-grid">
                    {requirementsData.map(req => (
                        <div key={req.id} className="requirement-card">
                            <h3>{req.title}</h3>
                            <p>Status: {req.status}</p>
                            <Link to={`/requirements/${req.id}`} className="view-details">
                                View Details
                            </Link>
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

export default Requirements;