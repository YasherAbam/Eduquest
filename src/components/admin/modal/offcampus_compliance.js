import React, { useState } from 'react';
import './offcampus_compliance.css';
import { FaFileDownload, FaEye, FaRegFileAlt, FaTimes } from 'react-icons/fa';

const OffCampusComplianceModal = ({ isOpen, onClose, activityData }) => {
    const [selectedStatus, setSelectedStatus] = useState('');
    const [note, setNote] = useState('');

    if (!isOpen) return null;

    const handleView = (fileUrl) => {
        window.open(fileUrl, '_blank');
    };

    const handleSubmit = () => {
        console.log({
            status: selectedStatus,
            note: note
        });
        setSelectedStatus('');
        setNote('');
        onClose();
    };

    return (
        <div className="offcampus-compliance-modal-overlay">
            <div className="offcampus-compliance-modal-content">
                <div className="offcampus-compliance-modal-header">
                    <h4>Compliance Details</h4>
                    <button className="offcampus-compliance-close-button" onClick={onClose} aria-label="Close modal">
                        <FaTimes />
                    </button>
                </div>
                <div className="offcampus-compliance-modal-body">
                    <div className="offcampus-compliance-info-box">
                        <div className="offcampus-compliance-icon-container">
                            <FaRegFileAlt className="offcampus-compliance-icon" />
                        </div>
                        <div className="offcampus-compliance-text">
                            <h6>{activityData?.name || 'Off-campus Report 1'}</h6>
                            <p>Activity related to {activityData?.activity || 'Off-campus Report 1'}</p>
                            <p>Submitted on {activityData?.date || 'September 26, 2024'}</p>
                        </div>
                        <span className="offcampus-compliance-status-badge">
                            {activityData?.status || 'Pending'}
                        </span>
                    </div>

                    <div className="offcampus-compliance-item">
                        <span>Compliance Document.pdf</span>
                        <div className="offcampus-compliance-file-actions">
                            <button className="offcampus-compliance-view-btn" onClick={() => handleView('document-url.pdf')}>
                                <FaEye /> View
                            </button>
                            <button className="offcampus-compliance-download-btn" onClick={() => handleView('document-url.pdf')}>
                                <FaFileDownload /> Download
                            </button>
                        </div>
                    </div>

                    <div className="offcampus-compliance-status-options">
                        <label>
                            <input
                                type="radio"
                                name="status"
                                value="Review"
                                checked={selectedStatus === 'Review'}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                            /> Review
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="status"
                                value="Hold"
                                checked={selectedStatus === 'Hold'}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                            /> Hold
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="status"
                                value="Approved"
                                checked={selectedStatus === 'Approved'}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                            /> Approved
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="status"
                                value="Disapproved"
                                checked={selectedStatus === 'Disapproved'}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                            /> Disapproved
                        </label>
                    </div>

                    <div className="offcampus-compliance-note">
                        <label>Note:</label>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Write a message..."
                        />
                    </div>

                    <div className="offcampus-compliance-action-buttons">
                        <button 
                            className="offcampus-compliance-forward-button"
                            onClick={handleSubmit}
                        >
                            Forward
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OffCampusComplianceModal;