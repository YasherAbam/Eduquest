import React from 'react';
import './inhouse_compliance.css'; // CSS for styling
import { FaFileDownload, FaEye, FaRegFileAlt } from 'react-icons/fa'; // Importing the new file icon

const InHouseCompliance = ({ isOpen, onClose, reportName, requesterDetails }) => {
    if (!isOpen) return null;

    const handleView = (fileUrl) => {
        window.open(fileUrl, '_blank');
    };

    return (
        <div className="compliance-modal-overlay">
            <div className="compliance-modal-content">
                <div className="compliance-modal-header">
                    <h4>Compliance Details</h4>
                    <button className="compliance-close-button" onClick={onClose} aria-label="Close modal">×</button>
                </div>
                <div className="compliance-modal-body">
                    <div className="compliance-highlighted-section">
                        <div className="highlight-icon-container">
                            <FaRegFileAlt className="highlight-icon" />
                        </div>
                        <div className="highlight-text">
                            <h6>{requesterDetails.department}</h6>
                            <p>Activity related to {requesterDetails.activity}</p>
                            <p>Submitted on {requesterDetails.date}</p>
                        </div>
                    </div>
                    <div className="compliance-item">
                        <span>HIRAC (Safety and Guidelines assessed by SHED)</span>
                        <div className="file-actions">
                            <button className="view-btn" onClick={() => handleView('hirac-file-url.pdf')}>
                                <FaEye /> View
                            </button>
                            <button className="download-btn" onClick={() => handleView('hirac-file-url.pdf')}>
                                <i className="fas fa-download"></i> Download
                            </button>
                        </div>
                    </div>
                    <div className="compliance-item">
                        <span>Medical Certificate</span>
                        <div className="file-actions">
                            <button className="view-btn" onClick={() => handleView('medical-certificate-url.pdf')}>
                                <FaEye /> View
                            </button>
                            <button className="download-btn" onClick={() => handleView('medical-certificate-url.pdf')}>
                                <i className="fas fa-download"></i> Download
                            </button>
                        </div>
                    </div>
                    <div className="status-options">
                        <label>
                            <input type="radio" name="status" value="review" /> Review
                        </label>
                        <label>
                            <input type="radio" name="status" value="hold" /> Hold
                        </label>
                        <label>
                            <input type="radio" name="status" value="approved" /> Approved
                        </label>
                        <label>
                            <input type="radio" name="status" value="disapproved" /> Disapproved
                        </label>
                    </div>
                    <div className="note-section">
                        <label>Note:</label>
                        <textarea placeholder="Write a message..."></textarea>
                    </div>
                    <div className="action-buttons">
                        <button className="forward-status-button">Forward</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InHouseCompliance;