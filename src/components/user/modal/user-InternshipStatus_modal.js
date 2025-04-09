import React from 'react';
import './user-InternshipStatus_modal.css';

const UserInternshipStatusModal = ({ isOpen, onClose, status }) => {
    if (!isOpen) return null;

    const steps = [
        { id: 'submitted', label: 'Submitted', icon: 'paper-plane' },
        { id: 'reviewed', label: 'Reviewed', icon: 'search' },
        { id: 'approved', label: 'Approved', icon: 'check' },
        { id: 'completed', label: 'Completed', icon: 'flag' }
    ];

    const getStepStatus = (stepId) => {
        const statusOrder = ['submitted', 'reviewed', 'approved', 'completed'];
        const currentIndex = statusOrder.indexOf(status);
        const stepIndex = statusOrder.indexOf(stepId);
        
        if (stepIndex < currentIndex) return 'completed';
        if (stepIndex === currentIndex) return 'active';
        return '';
    };

    const getProgressWidth = () => {
        const statusOrder = ['submitted', 'reviewed', 'approved', 'completed'];
        const currentIndex = statusOrder.indexOf(status);
        if (currentIndex === -1) return '0%';
        return `${(currentIndex / (statusOrder.length - 1)) * 100}%`;
    };

    return (
        <div className="internship-status-modal-overlay" onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
        }}>
            <div className="internship-status-modal-content">
                <div className="internship-status-modal-header">
                    <h2>Internship Status</h2>
                    <button className="internship-status-modal-close" onClick={onClose}>&times;</button>
                </div>
                <div className="internship-status-modal-body">
                    <div className="internship-status-content-box">
                        <div className="internship-status-steps">
                            <div className="internship-status-steps-container">
                                <div className="internship-status-line">
                                    <div 
                                        className="internship-status-line-progress" 
                                        style={{ width: getProgressWidth() }}
                                    />
                                </div>
                                {steps.map((step) => (
                                    <div 
                                        key={step.id}
                                        className={`internship-status-step ${getStepStatus(step.id)}`}
                                    >
                                        <div className="internship-status-icon">
                                            <i className={`fas fa-${step.icon}`}></i>
                                        </div>
                                        <span className="internship-status-label">{step.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="internship-status-details">
                            <div className="internship-status-item">
                                <span className="internship-status-label">Current Status:</span>
                                <span className="internship-status-value">
                                    {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Pending'}
                                </span>
                            </div>
                            <div className="internship-status-item">
                                <span className="internship-status-label">Last Updated:</span>
                                <span className="internship-status-value">January 5, 2025</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInternshipStatusModal;