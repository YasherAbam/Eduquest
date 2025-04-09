import React, { useState } from 'react';
import './offcampus_pending.css';
import OffcampusPendingDetailsModal from './offcampus-pending_details';

const PendingOffcampusModal = ({ isOpen, onClose, title }) => {
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [pendingRequests, setPendingRequests] = useState([
        {
            department: "SAM Department",
            activityName: "Off-Campus Activity 1",
            status: 2
        },
        {
            department: "SEICT Department",
            activityName: "Off-Campus Activity 2",
            status: 1
        },
        {
            department: "SBM Department",
            activityName: "Off-Campus Activity 3",
            status: 3
        },
        {
            department: "SCJ Department",
            activityName: "Off-Campus Activity 4",
            status: 4
        }
    ]);

    if (!isOpen) return null;

    const handleStatusChange = (newStatus) => {
        if (!selectedRequest) return;

        // Update the selected request's status
        const updatedRequest = {
            ...selectedRequest,
            status: newStatus
        };

        // Update the request in the list
        setPendingRequests(prevRequests =>
            prevRequests.map(req =>
                req === selectedRequest ? updatedRequest : req
            )
        );

        // Update the selected request
        setSelectedRequest(updatedRequest);

        // Update stepper status based on new status
        const stepperElements = document.querySelectorAll('.offcampus_pending_stepper_step');
        stepperElements.forEach((step, index) => {
            if (index < newStatus) {
                step.classList.add('completed');
            } else {
                step.classList.remove('completed');
            }
        });
    };

    const getStepIcon = (step, status) => {
        if (status >= step) {
            return <i className="fas fa-check"></i>;
        }
        switch (step) {
            case 1:
                return <i className="fas fa-file-alt"></i>;
            case 2:
                return <i className="fas fa-search"></i>;
            case 3:
                return <i className="fas fa-check"></i>;
            case 4:
                return <i className="fas fa-flag"></i>;
            default:
                return null;
        }
    };

    const handleRequestClick = (request) => {
        setSelectedRequest(request);
        setShowDetails(true);
    };

    const handleVPAAApproval = () => {
        if (!selectedRequest) return;

        const updatedRequest = {
            ...selectedRequest,
            status: 3
        };

        setPendingRequests(prevRequests =>
            prevRequests.map(req =>
                req === selectedRequest ? updatedRequest : req
            )
        );

        setSelectedRequest(updatedRequest);
    };

    return (
        <div className="offcampus_pending_modal_overlay">
            <div className="offcampus_pending_modal_content">
                <div className="offcampus_pending_modal_header">
                    <h4>{title || "Pending Off-Campus Activity Request"}</h4>
                    <button className="offcampus_pending_close_button" onClick={onClose}>×</button>
                </div>
                <div className="offcampus_pending_modal_body">
                    {pendingRequests.length === 0 ? (
                        <div className="no-requests-container">
                            <p className="no-requests">No pending off-campus requests available.</p>
                        </div>
                    ) : (
                        pendingRequests.map((request, index) => (
                            <div
                                key={index}
                                className="offcampus_pending_item"
                                onClick={() => handleRequestClick(request)}
                            >
                                <div className="offcampus_pending_department_info">
                                    <div className="offcampus_pending_department_icon">
                                        <i className="fas fa-building"></i>
                                    </div>
                                    <div className="offcampus_pending_department_details">
                                        <div className="offcampus_pending_department_name">{request.department}</div>
                                        <div className="offcampus_pending_activity_name">{request.activityName}</div>
                                    </div>
                                </div>

                                <div className="offcampus_pending_stepper_container">
                                    <div className="offcampus_pending_stepper_track">
                                        {[1, 2, 3, 4].map((step) => (
                                            <div
                                                key={step}
                                                className={`offcampus_pending_stepper_step ${request.status >= step ? 'completed' : ''}`}
                                            >
                                                <div className="offcampus_pending_step_icon">
                                                    {getStepIcon(step, request.status)}
                                                </div>
                                                <div className="offcampus_pending_step_label">
                                                    {step === 1 ? 'Submitted' :
                                                     step === 2 ? 'Reviewed' :
                                                     step === 3 ? 'Approved' : 'Completed'}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {showDetails && selectedRequest && (
                <OffcampusPendingDetailsModal
                    isOpen={showDetails}
                    onClose={() => setShowDetails(false)}
                    department={selectedRequest.department}
                    activityName={selectedRequest.activityName}
                    status={selectedRequest.status}
                    onVPAAApproval={handleVPAAApproval}
                    onStatusChange={handleStatusChange}
                />
            )}
        </div>
    );
};

export default PendingOffcampusModal;