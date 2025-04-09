import React, { useState, useEffect } from 'react';
import './offcampus-pending_details.css';

const OffcampusPendingDetailsModal = ({ isOpen, onClose, department, activityName, status, onVPAAApproval, onStatusChange }) => {
    const [showVPAADialog, setShowVPAADialog] = useState(false);
    const [localSteps, setLocalSteps] = useState(() => getStepsFromStatus(status));

    useEffect(() => {
        // Check if all steps are completed and update status
        if (localSteps.requestLetter && 
            localSteps.compliance && 
            localSteps.endorsedBySDS && 
            localSteps.approvedByVPAA && 
            localSteps.narrativeReport) {
            onStatusChange(4); // Mark as completed
        } else if (localSteps.approvedByVPAA) {
            onStatusChange(3); // Approved status
        } else if (localSteps.compliance) {
            onStatusChange(2); // Reviewed status
        } else {
            onStatusChange(1); // Submitted status
        }
    }, [localSteps, onStatusChange]);

    if (!isOpen) return null;

    function getStepsFromStatus(status) {
        switch(status) {
            case 1: // Submitted
                return {
                    requestLetter: true,
                    compliance: false,
                    endorsedBySDS: false,
                    approvedByVPAA: false,
                    narrativeReport: false
                };
            case 2: // Reviewed
                return {
                    requestLetter: true,
                    compliance: true,
                    endorsedBySDS: false,
                    approvedByVPAA: false,
                    narrativeReport: false
                };
            case 3: // Approved (requires both SDS and VPAA)
                return {
                    requestLetter: true,
                    compliance: true,
                    endorsedBySDS: true,
                    approvedByVPAA: true,
                    narrativeReport: false
                };
            case 4: // Completed
                return {
                    requestLetter: true,
                    compliance: true,
                    endorsedBySDS: true,
                    approvedByVPAA: true,
                    narrativeReport: true
                };
            default:
                return {
                    requestLetter: false,
                    compliance: false,
                    endorsedBySDS: false,
                    approvedByVPAA: false,
                    narrativeReport: false
                };
        }
    }

    const handleStepClick = (stepName) => {
        // For unchecking steps
        if (stepName === 'narrativeReport' && localSteps.narrativeReport) {
            setLocalSteps(prev => ({
                ...prev,
                narrativeReport: false
            }));
            onStatusChange(3); // Set back to Approved status
            return;
        }

        if (stepName === 'approvedByVPAA' && localSteps.approvedByVPAA) {
            if (localSteps.narrativeReport) {
                alert('Please uncheck Narrative Report first');
                return;
            }
            setLocalSteps(prev => ({
                ...prev,
                approvedByVPAA: false,
                narrativeReport: false // Also uncheck narrative report
            }));
            onStatusChange(2); // Set back to Reviewed status
            return;
        }

        if (stepName === 'endorsedBySDS' && localSteps.endorsedBySDS) {
            if (localSteps.approvedByVPAA) {
                alert('Please uncheck VPAA Approval first');
                return;
            }
            setLocalSteps(prev => ({
                ...prev,
                endorsedBySDS: false,
                approvedByVPAA: false, // Also uncheck VPAA approval
                narrativeReport: false // Also uncheck narrative report
            }));
            onStatusChange(2); // Set back to Reviewed status
            return;
        }

        if (stepName === 'compliance' && localSteps.compliance) {
            if (localSteps.endorsedBySDS) {
                alert('Please uncheck SDS Endorsement first');
                return;
            }
            setLocalSteps(prev => ({
                ...prev,
                compliance: false,
                endorsedBySDS: false, // Also uncheck SDS endorsement
                approvedByVPAA: false, // Also uncheck VPAA approval
                narrativeReport: false // Also uncheck narrative report
            }));
            onStatusChange(1); // Set back to Submitted status
            return;
        }

        // Original logic for checking steps
        if (stepName === 'compliance') {
            if (!localSteps.requestLetter) {
                alert('Request Letter must be completed first');
                return;
            }
            setLocalSteps(prev => ({
                ...prev,
                compliance: true
            }));
            onStatusChange(2); // Set to Reviewed status
        }

        if (stepName === 'endorsedBySDS') {
            if (!localSteps.requestLetter || !localSteps.compliance) {
                alert('Both Request Letter and Compliance must be completed first');
                return;
            }
            setLocalSteps(prev => ({
                ...prev,
                endorsedBySDS: true
            }));
        }
        
        if (stepName === 'approvedByVPAA') {
            if (!localSteps.endorsedBySDS) {
                alert('Endorsed by SDS Director must be completed first');
                return;
            }
            if (!localSteps.requestLetter || !localSteps.compliance) {
                alert('Both Request Letter and Compliance must be completed first');
                return;
            }
            setShowVPAADialog(true);
        }

        if (stepName === 'narrativeReport') {
            if (!localSteps.requestLetter || !localSteps.compliance || !localSteps.endorsedBySDS || !localSteps.approvedByVPAA) {
                alert('All previous steps must be completed first');
                return;
            }
            setLocalSteps(prev => ({
                ...prev,
                narrativeReport: true
            }));
        }
    };

    const handleVPAAApproval = () => {
        const updatedSteps = {
            ...localSteps,
            approvedByVPAA: true
        };
        setLocalSteps(updatedSteps);
        
        if (updatedSteps.endorsedBySDS && updatedSteps.approvedByVPAA) {
            onVPAAApproval();
            onStatusChange(3); // Set to Approved status
        }
        setShowVPAADialog(false);
    };

    return (
        <>
            <div className="offcampus_pending-details-modal-overlay">
                <div className="offcampus_pending-details-modal-content">
                    <div className="offcampus_pending-details-modal-header">
                        <h4>Pending Off-Campus Activity Request Details</h4>
                        <button className="offcampus_pending-close-button" onClick={onClose}>×</button>
                    </div>
                    <div className="offcampus_pending-details-modal-body">
                        <div className="offcampus_pending-details-section">
                            <h5>Department Information</h5>
                            <div className="offcampus_pending-info-item">
                                <span className="label">Department:</span>
                                <span className="value">{department}</span>
                            </div>
                            <div className="offcampus_pending-info-item">
                                <span className="label">Activity:</span>
                                <span className="value">{activityName}</span>
                            </div>
                        </div>
                        
                        <div className="offcampus_pending-status-section">
                            <h5>Status Progress</h5>
                            <div className="offcampus_pending-steps-list">
                                <div className="offcampus_pending-step-item">
                                    <span className={`offcampus_pending-step-icon ${localSteps.requestLetter ? 'completed' : ''}`}>
                                        {localSteps.requestLetter ? '✓' : ''}
                                    </span>
                                    <span className="offcampus_pending-step-name">Request Letter</span>
                                </div>
                                <div 
                                    className={`offcampus_pending-step-item ${!localSteps.compliance ? 'clickable' : ''}`}
                                    onClick={() => handleStepClick('compliance')}
                                >
                                    <span className={`offcampus_pending-step-icon ${localSteps.compliance ? 'completed' : ''}`}>
                                        {localSteps.compliance ? '✓' : ''}
                                    </span>
                                    <span className="offcampus_pending-step-name">Compliance of Requirements</span>
                                </div>
                                <div 
                                    className={`offcampus_pending-step-item ${!localSteps.endorsedBySDS || localSteps.endorsedBySDS ? 'clickable' : ''}`}
                                    onClick={() => handleStepClick('endorsedBySDS')}
                                >
                                    <span className={`offcampus_pending-step-icon ${localSteps.endorsedBySDS ? 'completed' : ''}`}>
                                        {localSteps.endorsedBySDS ? '✓' : ''}
                                    </span>
                                    <span className="offcampus_pending-step-name">Endorsed by SDS Director</span>
                                </div>
                                <div 
                                    className={`offcampus_pending-step-item ${!localSteps.approvedByVPAA || localSteps.approvedByVPAA ? 'clickable' : ''}`}
                                    onClick={() => handleStepClick('approvedByVPAA')}
                                >
                                    <span className={`offcampus_pending-step-icon ${localSteps.approvedByVPAA ? 'completed' : ''}`}>
                                        {localSteps.approvedByVPAA ? '✓' : ''}
                                    </span>
                                    <span className="offcampus_pending-step-name">Approved by VPAA</span>
                                </div>
                                <div 
                                    className={`offcampus_pending-step-item ${!localSteps.narrativeReport || localSteps.narrativeReport ? 'clickable' : ''}`}
                                    onClick={() => handleStepClick('narrativeReport')}
                                >
                                    <span className={`offcampus_pending-step-icon ${localSteps.narrativeReport ? 'completed' : ''}`}>
                                        {localSteps.narrativeReport ? '✓' : ''}
                                    </span>
                                    <span className="offcampus_pending-step-name">Narrative Report</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showVPAADialog && !localSteps.approvedByVPAA && (
                <div className="offcampus_pending-vpaa-dialog-overlay">
                    <div className="offcampus_pending-vpaa-dialog">
                        <h4>Have already received an approved letter from VPAA?</h4>
                        <div className="offcampus_pending-vpaa-dialog-buttons">
                            <button 
                                className="offcampus_pending-vpaa-button not-yet"
                                onClick={() => setShowVPAADialog(false)}
                            >
                                Not yet
                            </button>
                            <button 
                                className="offcampus_pending-vpaa-button yes"
                                onClick={handleVPAAApproval}
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default OffcampusPendingDetailsModal;