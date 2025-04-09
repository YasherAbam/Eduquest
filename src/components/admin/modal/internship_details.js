import React, { useState } from 'react';
import './internship_details.css';
import { FaUser, FaEye, FaDownload, FaPen, FaPaperPlane, FaFile } from 'react-icons/fa';

const InternshipDetailsModal = ({ isOpen, onClose, activityData }) => {
    const [showRevisionModal, setShowRevisionModal] = useState(false);
    const [showIssueModal, setShowIssueModal] = useState(false);
    const [revisionNote, setRevisionNote] = useState('');
    const [issueNote, setIssueNote] = useState('');
    const [files, setFiles] = useState([]);

    if (!isOpen) return null;

    // Provide default values if activityData is missing properties
    const {
        department = 'Department Name',
        date = 'MM/DD/YY',
        status = 'Pending',
        fileName = 'Document.pdf',
        fileUrl = '#'
    } = activityData || {};

    const handleView = () => {
        window.open(fileUrl, '_blank');
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleRevise = () => {
        console.log('Revision note:', revisionNote);
        setShowRevisionModal(false);
        setRevisionNote('');
    };

    const handleFileChange = (e) => {
        setFiles([...e.target.files]);
    };

    const handleIssueSubmit = () => {
        console.log('Issue note:', issueNote);
        console.log('Attached files:', files);
        setShowIssueModal(false);
        setIssueNote('');
        setFiles([]);
    };

    return (
        <div className="details-modal-overlay">
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
                                <h6>{department}</h6>
                                <p>Submitted on {date}</p>
                            </div>
                        </div>
                        <span className={`status-badge ${status.toLowerCase()}`}>
                            {status}
                        </span>
                    </div>

                    <div className="file-section">
                        <div className="file-container">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <FaFile style={{ color: '#2F5440' }} />
                                <span className="file-name">{fileName}</span>
                            </div>
                            <div className="file-actions">
                                <button className="view-btn" onClick={handleView}>
                                    <FaEye /> View
                                </button>
                                <button className="download-btn" onClick={handleDownload}>
                                    <FaDownload /> Download
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="action-buttons">
                        <button onClick={() => setShowRevisionModal(true)}>
                            <FaPen /> Revise
                        </button>
                        <button onClick={() => setShowIssueModal(true)}>
                            <FaPaperPlane /> Issue Requirements
                        </button>
                    </div>
                </div>
            </div>

            {showRevisionModal && (
                <div className="revision-modal-overlay">
                    <div className="revision-modal-content">
                        <h4>For Revision</h4>
                        <textarea
                            placeholder="Enter your revision notes here..."
                            value={revisionNote}
                            onChange={(e) => setRevisionNote(e.target.value)}
                        />
                        <div className="revision-actions">
                            <button onClick={handleRevise}>Send</button>
                            <button onClick={() => setShowRevisionModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {showIssueModal && (
                <div className="issue-modal-overlay">
                    <div className="issue-modal-content">
                        <h4>Issue Requirements</h4>
                        <textarea
                            placeholder="Enter requirements here..."
                            value={issueNote}
                            onChange={(e) => setIssueNote(e.target.value)}
                        />
                        <div className="file-upload">
                            <label>Attach Files:</label>
                            <input 
                                type="file" 
                                multiple 
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx"
                            />
                        </div>
                        <div className="issue-actions">
                            <button onClick={handleIssueSubmit}>Submit</button>
                            <button onClick={() => setShowIssueModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InternshipDetailsModal;