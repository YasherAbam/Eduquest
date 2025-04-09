import React, { useState } from 'react';
import './internship.css';
import InternshipDetailsModal from './internship_details';
import InternshipCompliance from './internship_compliance';

const InternshipModal = ({ isOpen, onClose, title, internshipData }) => {
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showComplianceModal, setShowComplianceModal] = useState(false);
    const [requesterDetails, setRequesterDetails] = useState({});

    console.log('InternshipModal props:', { isOpen, title, internshipData });

    if (!isOpen) return null;

    const requestLetters = Array.isArray(internshipData?.requestLetters) ? internshipData.requestLetters : [];
    const compliance = Array.isArray(internshipData?.compliance) ? internshipData.compliance : [];

    const handleActivityClick = (activity) => {
        console.log('Activity clicked:', activity);
        setSelectedActivity(activity);
        setShowDetailsModal(true);
    };

    const handleComplianceClick = (complianceItem) => {
        setRequesterDetails({
            department: complianceItem.department,
            activity: complianceItem.activity,
            date: complianceItem.date
        });
        setShowComplianceModal(true);
    };

    return (
        <>
            <div className="internship-modal-overlay" onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}>
                <div className="internship-modal-content">
                    <div className="internship-modal-header">
                        <h4>{title || 'Internship Activity'}</h4>
                        <button className="internship-close-button" onClick={onClose}>×</button>
                    </div>
                    <div className="internship-modal-body">
                        <div className="internship-modal-columns">
                            <div className="internship-modal-column">
                                <h4>Request Letter</h4>
                                <div className="activity-list">
                                    {requestLetters.map((request, index) => (
                                        <div 
                                            key={index} 
                                            className="activity-item"
                                            onClick={() => handleActivityClick(request)}
                                        >
                                            <div className="activity-left">
                                                <i className="fas fa-user"></i>
                                                <span>{request.department}</span>
                                            </div>
                                            <div className="activity-right">
                                                <span className="activity-date">{request.date}</span>
                                                <span className={`status-badge ${request.status.toLowerCase()}`}>
                                                    {request.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="internship-modal-column">
                                <h4>Compliance of Requirements</h4>
                                <div className="activity-list">
                                    {compliance.map((complianceItem, index) => (
                                        <div 
                                            key={index} 
                                            className="activity-item" 
                                            onClick={() => handleComplianceClick(complianceItem)}
                                        >
                                            <div className="activity-left">
                                                <i className="fas fa-file-alt"></i>
                                                <span>{complianceItem.department}</span>
                                            </div>
                                            <div className="activity-right">
                                                <span className="activity-date">{complianceItem.date}</span>
                                                <span className={`status-badge ${complianceItem.status.toLowerCase()}`}>
                                                    {complianceItem.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details Modal */}
            <InternshipDetailsModal 
                isOpen={showDetailsModal} 
                onClose={() => setShowDetailsModal(false)} 
                activityData={selectedActivity} 
            />

            {/* Compliance Modal */}
            <InternshipCompliance 
                isOpen={showComplianceModal} 
                onClose={() => setShowComplianceModal(false)} 
                requesterDetails={requesterDetails} 
            />
        </>
    );
};

export default InternshipModal;