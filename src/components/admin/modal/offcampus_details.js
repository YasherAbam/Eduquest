import React, { useState } from 'react';
import './offcampus_details.css';
import { FaUser } from 'react-icons/fa';

const OffCampusDetailsModal = ({ isOpen, onClose, activityData }) => {
    const [showRevisionModal, setShowRevisionModal] = useState(false);
    const [showIssueModal, setShowIssueModal] = useState(false);
    const [revisionNote, setRevisionNote] = useState('');
    const [issueNote, setIssueNote] = useState('');
    const [files, setFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

    // Check if activityData is available and has the required properties
    if (!activityData || !activityData.name) {
        return null;
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
        <div className="offcampus-details-modal-overlay" style={{ display: isOpen ? 'flex' : 'none' }}>
            <div className="offcampus-details-modal-content">
                <div className="offcampus-details-modal-header">
                    <h4>Off-Campus Activity Details</h4>
                    <button className="offcampus-details-close-button" onClick={onClose}>×</button>
                </div>
                <div className="offcampus-details-modal-body">
                    <div className="offcampus-activity-info">
                        <div className="offcampus-info-row">
                            <FaUser className="offcampus-user-icon" />
                            <div className="offcampus-user-details">
                                <h3>{activityData.name}</h3>
                                <p>Submitted on {activityData.date}</p>
                            </div>
                            <span className={`offcampus-status-badge offcampus-status-${activityData.status.toLowerCase()}`}>
                                {activityData.status}
                            </span>
                        </div>
                    </div>

                    <div className="offcampus-document-section">
                        <div className="offcampus-document-header">
                            <i className="fas fa-file-alt"></i>
                            <span>{activityData.fileName}</span>
                        </div>
                        <div className="offcampus-document-actions">
                            <button onClick={handleView}>View</button>
                            <button onClick={handleDownload}>Download</button>
                        </div>
                    </div>

                    <div className="offcampus-action-buttons">
                        <button className="offcampus-revise-btn" onClick={() => setShowRevisionModal(true)}>
                            Revise
                        </button>
                        <button className="offcampus-issue-btn" onClick={() => setShowIssueModal(true)}>
                            Issue Requirements
                        </button>
                    </div>
                </div>
            </div>

            {showRevisionModal && (
                <div className="offcampus-revision-modal-overlay">
                    <div className="offcampus-revision-modal-content">
                        <div className="offcampus-revision-modal-header">
                            <h4>Revision Note</h4>
                        </div>
                        <div className="offcampus-revision-modal-body">
                            <textarea
                                value={revisionNote}
                                onChange={(e) => setRevisionNote(e.target.value)}
                                placeholder="Enter revision note..."
                            />
                            <div className="offcampus-modal-buttons">
                                <button className="send-button" onClick={handleRevise}>Send</button>
                                <button className="cancel-button" onClick={() => setShowRevisionModal(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showIssueModal && (
                <div className="offcampus-revision-modal-overlay">
                    <div className="offcampus-revision-modal-content">
                        <div className="offcampus-revision-modal-header">
                            <h4>Requirements (Off-Campus Activity)</h4>
                        </div>
                        <div className="offcampus-revision-modal-body">
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
                                {files.length > 0 && (
                                    <div className="selected-files">
                                        {Array.from(files).map((file, index) => (
                                            <div key={index} className="file-item">
                                                {file.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="offcampus-modal-buttons">
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

export default OffCampusDetailsModal;