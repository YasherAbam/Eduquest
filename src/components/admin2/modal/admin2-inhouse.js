import React, { useState } from 'react';
import './admin2-inhouse.css';
import { supabase } from '../../../config/supabase';

const Admin2Inhouse = ({ isOpen, onClose, inhouseData }) => {
    const [selectedInhouse, setSelectedInhouse] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('review');
    const [message, setMessage] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);

    // Mock data for inhouse list
    const inhouseList = [
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

    const handleInhouseClick = (inhouse) => {
        setSelectedInhouse(inhouse);
    };

    const handleBackClick = () => {
        setSelectedInhouse(null);
    };

    const handleUpdateStatus = async () => {
        try {
            const { error } = await supabase
                .from('inhouse_activities')
                .update({
                    status: selectedStatus,
                    admin2_notes: message
                })
                .eq('id', selectedInhouse.id);

            if (error) throw error;
            setSelectedInhouse(null);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="admin2-inhouse-overlay">
            <div className="admin2-inhouse-container">
                <div className="admin2-inhouse-header">
                    <h2>In-house Activity</h2>
                    <button className="admin2-inhouse-close" onClick={onClose}>&times;</button>
                </div>

                {!selectedInhouse ? (
                    <div className="admin2-inhouse-list">
                        {inhouseList.map((inhouse) => (
                            <div 
                                key={inhouse.id} 
                                className="admin2-inhouse-item"
                                onClick={() => handleInhouseClick(inhouse)}
                            >
                                <div className="admin2-inhouse-item-info">
                                    <h3>{inhouse.department}</h3>
                                    <p>{inhouse.date}</p>
                                </div>
                                <div className="admin2-inhouse-item-status">
                                    <span className="status-dot status-pending"></span>
                                    Pending
                                </div>
                                <i className="fas fa-chevron-right"></i>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="admin2-inhouse-content">
                        <button className="admin2-inhouse-back" onClick={handleBackClick}>
                            <i className="fas fa-arrow-left"></i> Back to list
                        </button>

                        <div className="admin2-inhouse-details">
                            <h3>{selectedInhouse.department}</h3>
                            <p>Department Day</p>
                            <p>{selectedInhouse.date}</p>
                        </div>

                        <div className="admin2-inhouse-documents">
                            <div className="admin2-inhouse-document">
                                <span>Request Letter</span>
                                <div className="admin2-inhouse-actions">
                                    <span className="admin2-inhouse-filename">
                                        {selectedInhouse.requestLetter}
                                    </span>
                                    <button className="admin2-inhouse-download">
                                        <i className="fas fa-download"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="admin2-inhouse-document">
                                <span>Medical Certificate</span>
                                <div className="admin2-inhouse-actions">
                                    <span className="admin2-inhouse-filename">
                                        {selectedInhouse.medicalCertificate}
                                    </span>
                                    <button className="admin2-inhouse-download">
                                        <i className="fas fa-download"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="admin2-inhouse-status">
                            <div className="admin2-inhouse-options">
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

                            <div className="admin2-inhouse-message">
                                <span>Note:</span>
                                <input
                                    type="text"
                                    placeholder="write a message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>

                            <div className="admin2-inhouse-upload">
                                <input
                                    type="file"
                                    id="fileUpload"
                                    style={{ display: 'none' }}
                                    onChange={(e) => setUploadedFile(e.target.files[0])}
                                />
                                <button className="admin2-inhouse-upload-btn" onClick={() => document.getElementById('fileUpload').click()}>
                                    <i className="fas fa-cloud-upload-alt"></i>
                                    Click here to Upload files...
                                </button>
                                {uploadedFile && <p>Selected file: {uploadedFile.name}</p>}
                            </div>
                        </div>

                        <div className="admin2-inhouse-footer">
                            <button className="admin2-inhouse-revise">
                                Revise
                            </button>
                            <button className="admin2-inhouse-update" onClick={handleUpdateStatus}>
                                Update status
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin2Inhouse;