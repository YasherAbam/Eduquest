import React from 'react';
import './user-InhouseStatus_modal.css';

const UserInhouseStatusModal = ({ isOpen, onClose, status }) => {
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
        <div className="inhouse-status-modal-overlay" onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
        }}>
            <div className="inhouse-status-modal-content">
                <div className="inhouse-status-modal-header">
                    <h2>In-House Activity Status</h2>
                    <button className="inhouse-status-modal-close" onClick={onClose}>&times;</button>
                </div>
                <div className="inhouse-status-modal-body">
                    <div className="inhouse-status-content-box">
                        <div className="inhouse-status-steps">
                            <div className="inhouse-status-steps-container">
                                <div className="inhouse-status-line">
                                    <div 
                                        className="inhouse-status-line-progress" 
                                        style={{ width: getProgressWidth() }}
                                    />
                                </div>
                                {steps.map((step) => (
                                    <div 
                                        key={step.id}
                                        className={`inhouse-status-step ${getStepStatus(step.id)}`}
                                    >
                                        <div className="inhouse-status-icon">
                                            <i className={`fas fa-${step.icon}`}></i>
                                        </div>
                                        <span className="inhouse-status-label">{step.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="inhouse-status-details">
                            <div className="inhouse-status-item">
                                <span className="inhouse-status-label">Current Status:</span>
                                <span className="inhouse-status-value">
                                    {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Pending'}
                                </span>
                            </div>
                            <div className="inhouse-status-item">
                                <span className="inhouse-status-label">Last Updated:</span>
                                <span className="inhouse-status-value">January 5, 2025</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInhouseStatusModal;