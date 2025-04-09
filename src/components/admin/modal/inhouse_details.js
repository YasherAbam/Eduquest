import React, { useState } from 'react';
import './inhouse_details.css';
import { FaUser } from 'react-icons/fa';

const InHouseDetailsModal = ({ isOpen, onClose, activityData }) => {
    const [showRevisionModal, setShowRevisionModal] = useState(false);
    const [showIssueModal, setShowIssueModal] = useState(false);
    const [revisionNote, setRevisionNote] = useState('');
    const [issueNote, setIssueNote] = useState('');
    const [files, setFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

    // Check if activityData is available and has the required properties
    if (!activityData || !activityData.name) {
        return null; // or a loading spinner, or some fallback UI
    }

    const handleView = () => {
        window.open(activityData.fileUrl, '_blank');
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = activityData.fileUrl;
        link.download = activityData.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleRevise = () => {
        console.log(revisionNote);
        setShowRevisionModal(false);
    };

    const handleFileChange = (e) => {
        setFiles([...e.target.files]);
    };

    const handleIssueSubmit = () => {
        console.log(issueNote, files);
        setShowIssueModal(false);
    };


    return (
        <div className="details-modal-overlay" style={{ display: isOpen ? 'flex' : 'none' }}>
            <div className="details-modal-content">
                <div className="details-modal-header">
                    <h4>Request Details</h4>
                    <button className="details-close-button" onClick={onClose}>×</button>
                </div>
                
                <div className="details-modal-body">
                    <div className="highlighted-section">
                        <div className="department-section">
                            <div className="user-icon">
                                <FaUser className="icon" />
                            </div>
                            <div>
                                <h6>{activityData.name}</h6>
                                <p>Submitted on {activityData.date}</p>
                            </div>
                        </div>
                        <span className={`status-badge ${activityData.status.toLowerCase()}`}>
                            {activityData.status}
                        </span>
                    </div>

                    <div className="file-section">
                        <div className="file-container">
                            <i className="fas fa-file-pdf file-icon"></i>
                            <span className="file-name">{activityData.fileName}</span>
                            <div className="file-actions">
                                <button className="view-btn" onClick={handleView}>
                                    <i className="fas fa-eye"></i>
                                    View
                                </button>
                                <button className="download-btn" onClick={handleDownload}>
                                    <i className="fas fa-download"></i>
                                    Download
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="action-buttons">
                        <button className="revise-btn" onClick={() => setShowRevisionModal(true)}>
                            <i className="fas fa-edit"></i>
                            Revise
                        </button>
                        <button className="issue-btn" onClick={() => setShowIssueModal(true)}>
                            <i className="fas fa-paper-plane"></i>
                            Issue Requirements
                        </button>
                    </div>
                </div>
            </div>

            {showRevisionModal && (
    <div className="inhouse-revision-modal-overlay">
        <div className="inhouse-revision-modal-content">
            <div className="inhouse-revision-modal-header">
                <h4>Revision Note</h4>
            </div>
            <div className="inhouse-revision-modal-body">
                <textarea
                    value={revisionNote}
                    onChange={(e) => setRevisionNote(e.target.value)}
                    placeholder="Enter revision note..."
                />
                <div className="inhouse-modal-buttons">
                    <button className="send-button" onClick={handleRevise}>Send</button>
                    <button className="cancel-button" onClick={() => setShowRevisionModal(false)}>Cancel</button>
                </div>
            </div>
        </div>
    </div>
)}

{showIssueModal && (
    <div className="inhouse-issue-modal-overlay">
        <div className="inhouse-issue-modal-content">
            <div className="inhouse-issue-modal-header">
                <h4>Requirements (In-House Activity)</h4>
            </div>
            <div className="inhouse-issue-modal-body">
                <div className="form-group">
                    <label>Note:</label>
                    <textarea
                        placeholder="Enter your message here..."
                        value={issueNote}
                        onChange={(e) => setIssueNote(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Upload Files:</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        id="file-upload"
                    />
                    <label htmlFor="file-upload" className="upload-area">
                        Click here to upload files...
                    </label>
                    {selectedFiles.length > 0 && (
                        <div className="selected-files">
                            {Array.from(selectedFiles).map((file, index) => (
                                <div key={index} className="file-item">
                                    {file.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="inhouse-modal-buttons">
                    <button className="send-button" onClick={handleIssueSubmit}>Submit</button>
                    <button className="cancel-button" onClick={() => setShowIssueModal(false)}>Cancel</button>
                </div>
            </div>
        </div>
    </div>
)}
        </div>
    );
};

export default InHouseDetailsModal;