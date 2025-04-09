import React, { useState } from 'react';
import './offcampus.css';
import OffCampusDetailsModal from './offcampus_details';
import OffCampusComplianceModal from './offcampus_compliance';

const OffCampusModal = ({ isOpen, onClose, title, data }) => {
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showComplianceModal, setShowComplianceModal] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);

    if (!isOpen) return null;

    const requestLetters = Array.isArray(data?.requestLetters) ? data.requestLetters : [];
    const compliance = Array.isArray(data?.compliance) ? data.compliance : [];

    const handleRequestLetterClick = (activity) => {
        setSelectedActivity({
            ...activity,
            name: activity.department,
            fileName: "Request Letter.pdf",
            fileUrl: "#",
            date: activity.date,
            status: activity.status
        });
        setShowDetailsModal(true);
    };

    const handleComplianceClick = (activity) => {
        setSelectedActivity({
            ...activity,
            name: activity.department,
            fileName: "Compliance Document.pdf",
            fileUrl: "#",
            date: activity.date,
            status: activity.status
        });
        setShowComplianceModal(true);
    };

    return (
        <>
            <div className="offcampus-modal-overlay">
                <div className="offcampus-modal-content">
                    <div className="offcampus-modal-header">
                        <h4>{title}</h4>
                        <button className="offcampus-close-button" onClick={onClose}>×</button>
                    </div>
                    <div className="offcampus-modal-body">
                        <div className="offcampus-modal-columns">
                            {/* Request Letter Column */}
                            <div className="offcampus-modal-column">
                                <h4>Request Letter</h4>
                                {requestLetters.map((request, index) => (
                                    <div 
                                        key={index} 
                                        className="department-item"
                                        onClick={() => handleRequestLetterClick(request)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="department-info">
                                            <div className="department-icon">
                                                <i className="fas fa-globe"></i>
                                            </div>
                                            <span>{request.department}</span>
                                        </div>
                                        <span className="date-info">{request.date}</span>
                                        <span className={`status-badge status-${request.status.toLowerCase()}`}>
                                            {request.status}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Compliance Column */}
                            <div className="offcampus-modal-column">
                                <h4>Compliance of Requirements</h4>
                                {compliance.map((complianceItem, index) => (
                                    <div 
                                        key={index} 
                                        className="department-item"
                                        onClick={() => handleComplianceClick(complianceItem)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="department-info">
                                            <div className="department-icon">
                                                <i className="fas fa-file-alt"></i>
                                            </div>
                                            <span>{complianceItem.department}</span>
                                        </div>
                                        <span className="date-info">{complianceItem.date}</span>
                                        <span className={`status-badge status-${complianceItem.status.toLowerCase()}`}>
                                            {complianceItem.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <OffCampusDetailsModal 
                isOpen={showDetailsModal}
                onClose={() => setShowDetailsModal(false)}
                activityData={selectedActivity}
            />

            <OffCampusComplianceModal 
                isOpen={showComplianceModal}
                onClose={() => setShowComplianceModal(false)}
                activityData={selectedActivity}
            />
        </>
    );
};

export default OffCampusModal;