import React from 'react';
import './notificationmodal.css';

const NotificationModal = ({ isOpen, onClose, notifications }) => {
    if (!isOpen) return null;

    return (
        <>
            <div className="notification-backdrop" onClick={onClose} />
            <div className="notification-modal-overlay">
                <div className="notification-modal-content" onClick={e => e.stopPropagation()}>
                    <div className="notification-modal-header">
                        <h4>
                            <i className="fas fa-bell"></i>
                            Notifications
                        </h4>
                    </div>
                    <div className="notification-modal-body">
                        {notifications.length === 0 ? (
                            <div className="no-notifications">
                                No new notifications
                            </div>
                        ) : (
                            <ul className="notification-list">
                                {notifications.map((notification) => (
                                    <li 
                                        key={notification.id} 
                                        className={`notification-item ${notification.status === 'unread' ? 'unread' : ''}`}
                                    >
                                        <div className="notification-content">
                                            <p className="notification-message">
                                                {notification.message}
                                            </p>
                                            <span className="notification-time">
                                                {notification.date}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotificationModal;