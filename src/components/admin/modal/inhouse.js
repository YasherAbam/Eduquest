import React, { useState } from 'react';
import './inhouse.css';
import InHouseDetailsModal from './inhouse_details';
import InHouseCompliance from './inhouse_compliance'; // Corrected import

const InHouseModal = ({ isOpen, onClose, title }) => {
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showComplianceModal, setShowComplianceModal] = useState(false); // State for compliance modal
    const [requesterDetails, setRequesterDetails] = useState({}); // Add this line

    if (!isOpen) return null;

    const handleActivityClick = (activity) => {
        console.log("Activity clicked:", activity); // Debug log
        setSelectedActivity({
            ...activity,
            fileName: `${activity.name} Request Letter.pdf`,
            fileUrl: 'https://www.africau.edu/images/default/sample.pdf' // Sample PDF for testing
        });
        setShowDetailsModal(true);
    };

    const handleComplianceClick = (report) => {
        console.log("Compliance report clicked:", report); // Debug log
    
        // Set requester details based on the report clicked
        const requesterDetails = {
            department: report === "In-house Report 1" ? "DOTA 2" : "ML Tournament", // Example dynamic department
            activity: " " + report, // Example activity title
            date: report === "In-house Report 1" ? "September 24, 2024" : "September 18, 2024" // Example date
        };
    
        setRequesterDetails(requesterDetails); // Store the requester details
        setShowComplianceModal(true); // Set state to show compliance modal
    };

    return (
        <>
            <div className="inhouse-modal-overlay">
                <div className="inhouse-modal-content">
                    <div className="inhouse-modal-header">
                        <h4>In-house Activity</h4>
                        <button className="inhouse-close-button" onClick={onClose}>×</button>
                    </div>
                    <div className="inhouse-modal-body">
                        <div className="inhouse-columns">
                            {/* Left Column - Request Letter */}
                            <div className="inhouse-column">
                                <h4>Request Letter</h4>
                                <div className="activity-list">
                                    {/* Activity 1 */}
                                    <div 
                                        className="activity-item"
                                        onClick={() => handleActivityClick({
                                            name: "In-house Activity 1",
                                            date: "09/22/24",
                                            status: "PENDING"
                                        })}
                                    >
                                        <div className="activity-left">
                                            <i className="fas fa-user"></i>
                                            <span>In-house Activity 1</span>
                                        </div>
                                        <div className="activity-right">
                                            <span className="activity-date">09/22/24</span>
                                            <span className="status-badge pending">PENDING</span>
                                        </div>
                                    </div>
                                    
                                    {/* Activity 2 */}
                                    <div 
                                        className="activity-item"
                                        onClick={() => handleActivityClick({
                                            name: "In-house Activity 2",
                                            date: "09/21/24",
                                            status: "APPROVED"
                                        })}
                                    >
                                        <div className="activity-left">
                                            <i className="fas fa-user"></i>
                                            <span>In-house Activity 2</span>
                                        </div>
                                        <div className="activity-right">
                                            <span className="activity-date">09/21/24</span>
                                            <span className="status-badge approved">APPROVED</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Compliance */}
                            <div className="inhouse-column">
                                <h4>Compliance of Requirements</h4>
                                <div className="activity-list">
                                    {/* Compliance Document 1 */}
                                    <div className="activity-item" onClick={() => handleComplianceClick("In-house Report 1")}>
                                        <div className="activity-left">
                                            <i className="fas fa-file-alt"></i>
                                            <span>In-house Report 1</span>
                                        </div>
                                        <div className="activity-right">
                                            <span className="activity-date">09/24/24</span>
                                            <span className="status-badge pending">PENDING</span>
                                        </div>
                                    </div>
                                    {/* Compliance Document 2 */}
                                    <div className="activity-item" onClick={() => handleComplianceClick("In-house Report 2")}>
                                        <div className="activity-left">
                                            <i className="fas fa-file-alt"></i>
                                            <span>In-house Report 2</span>
                                        </div>
                                        <div className="activity-right">
                                            <span className="activity-date">09/18/24</span>
                                            <span className="status-badge reviewed">REVIEWED</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Compliance Details Modal */}
            <InHouseCompliance 
                isOpen={showComplianceModal}
                onClose={() => setShowComplianceModal(false)}
                reportName="In-house Report 1" // Pass the report name
                requesterDetails={requesterDetails} // Pass the requester details
            />
            {/* Details Modal */}
            <InHouseDetailsModal 
                isOpen={showDetailsModal}
                onClose={() => setShowDetailsModal(false)}
                activityData={selectedActivity}
            />
        </>
    );
};

export default InHouseModal;