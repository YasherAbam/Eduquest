import React from 'react';
import './user-OffcampusStatus_modal.css';

const UserOffcampusStatusModal = ({ isOpen, onClose, status }) => {
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
        <div className="offcampus-status-modal-overlay" onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
        }}>
            <div className="offcampus-status-modal-content">
                <div className="offcampus-status-modal-header">
                    <h2>Off-Campus Activity Status</h2>
                    <button className="offcampus-status-modal-close" onClick={onClose}>&times;</button>
                </div>
                <div className="offcampus-status-modal-body">
                    <div className="offcampus-status-content-box">
                        <div className="offcampus-status-steps">
                            <div className="offcampus-status-steps-container">
                                <div className="offcampus-status-line">
                                    <div 
                                        className="offcampus-status-line-progress" 
                                        style={{ width: getProgressWidth() }}
                                    />
                                </div>
                                {steps.map((step) => (
                                    <div 
                                        key={step.id}
                                        className={`offcampus-status-step ${getStepStatus(step.id)}`}
                                    >
                                        <div className="offcampus-status-icon">
                                            <i className={`fas fa-${step.icon}`}></i>
                                        </div>
                                        <span className="offcampus-status-label">{step.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="offcampus-status-details">
                            <div className="offcampus-status-item">
                                <span className="offcampus-status-label">Current Status:</span>
                                <span className="offcampus-status-value">
                                    {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Pending'}
                                </span>
                            </div>
                            <div className="offcampus-status-item">
                                <span className="offcampus-status-label">Last Updated:</span>
                                <span className="offcampus-status-value">January 5, 2025</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserOffcampusStatusModal;