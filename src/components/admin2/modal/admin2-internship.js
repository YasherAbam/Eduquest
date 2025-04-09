import React, { useState } from 'react';
import './admin2-internship.css';
import { supabase } from '../../../config/supabase';

const Admin2Internship = ({ isOpen, onClose, internshipData }) => {
    const [selectedInternship, setSelectedInternship] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('review');
    const [message, setMessage] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);

    // Mock data for internship list
    const internshipList = [
        {
            id: 1,
            department: 'SAM Department',
            date: 'September 21-22, 2024',
            status: 'pending',
            requestLetter: 'request_letter.pdf',
            medicalCertificate: 'medical_cert.pdf'
        },
        {
            id: 2,
            department: 'SEICT Department',
            date: 'September 23-24, 2024',
            status: 'pending',
            requestLetter: 'seict_request.pdf',
            medicalCertificate: 'seict_medical.pdf'
        }
    ];

    const handleInternshipClick = (internship) => {
        setSelectedInternship(internship);
    };

    const handleBackClick = () => {
        setSelectedInternship(null);
    };

    const handleUpdateStatus = async () => {
        try {
            const { error } = await supabase
                .from('internships')
                .update({
                    status: selectedStatus,
                    admin2_notes: message
                })
                .eq('id', selectedInternship.id);

            if (error) throw error;
            setSelectedInternship(null);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="admin2-internship-overlay">
            <div className="admin2-internship-container">
                <div className="admin2-internship-header">
                    <h2>Internship</h2>
                    <button className="admin2-internship-close" onClick={onClose}>&times;</button>
                </div>

                {!selectedInternship ? (
                    <div className="admin2-internship-list">
                        {internshipList.map((internship) => (
                            <div 
                                key={internship.id} 
                                className="admin2-internship-item"
                                onClick={() => handleInternshipClick(internship)}
                            >
                                <div className="admin2-internship-item-info">
                                    <h3>{internship.department}</h3>
                                    <p>{internship.date}</p>
                                </div>
                                <div className="admin2-internship-item-status">
                                    <span className="status-dot status-pending"></span>
                                    Pending
                                </div>
                                <i className="fas fa-chevron-right"></i>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="admin2-internship-content">
                        <button className="admin2-internship-back" onClick={handleBackClick}>
                            <i className="fas fa-arrow-left"></i> Back to list
                        </button>

                        <div className="admin2-internship-details">
                            <h3>{selectedInternship.department}</h3>
                            <p>Department Day</p>
                            <p>{selectedInternship.date}</p>
                        </div>

                        <div className="admin2-internship-documents">
                            <div className="admin2-internship-document">
                                <span>Request Letter</span>
                                <div className="admin2-internship-actions">
                                    <span className="admin2-internship-filename">
                                        {selectedInternship.requestLetter}
                                    </span>
                                    <button className="admin2-internship-download">
                                        <i className="fas fa-download"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="admin2-internship-document">
                                <span>Medical Certificate</span>
                                <div className="admin2-internship-actions">
                                    <span className="admin2-internship-filename">
                                        {selectedInternship.medicalCertificate}
                                    </span>
                                    <button className="admin2-internship-download">
                                        <i className="fas fa-download"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="admin2-internship-status">
                            <div className="admin2-internship-options">
                                <label>
                                    <input
                                        type="radio"
                                        name="status"
                                        value="review"
                                        checked={selectedStatus === 'review'}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                    />
                                    Review
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="status"
                                        value="hold"
                                        checked={selectedStatus === 'hold'}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                    />
                                    Hold
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="status"
                                        value="disapproved"
                                        checked={selectedStatus === 'disapproved'}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                    />
                                    Disapproved
                                </label>
                            </div>

                            <div className="admin2-internship-message">
                                <span>Note:</span>
                                <input
                                    type="text"
                                    placeholder="write a message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>

                            <div className="admin2-internship-upload">
                                <input
                                    type="file"
                                    id="fileUpload"
                                    style={{ display: 'none' }}
                                    onChange={(e) => setUploadedFile(e.target.files[0])}
                                />
                                <button className="admin2-internship-upload-btn" onClick={() => document.getElementById('fileUpload').click()}>
                                    <i className="fas fa-cloud-upload-alt"></i>
                                    Click here to Upload files...
                                </button>
                                {uploadedFile && <p>Selected file: {uploadedFile.name}</p>}
                            </div>
                        </div>

                        <div className="admin2-internship-footer">
                            <button className="admin2-internship-revise">
                                Revise
                            </button>
                            <button className="admin2-internship-update" onClick={handleUpdateStatus}>
                                Update status
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin2Internship;