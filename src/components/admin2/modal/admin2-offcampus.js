import React, { useState } from 'react';
import './admin2-offcampus.css';
import { supabase } from '../../../config/supabase';

const Admin2Offcampus = ({ isOpen, onClose, offcampusData }) => {
    const [selectedOffcampus, setSelectedOffcampus] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('review');
    const [message, setMessage] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);

    // Mock data for offcampus list
    const offcampusList = [
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

    const handleOffcampusClick = (offcampus) => {
        setSelectedOffcampus(offcampus);
    };

    const handleBackClick = () => {
        setSelectedOffcampus(null);
    };

    const handleUpdateStatus = async () => {
        try {
            const { error } = await supabase
                .from('offcampus_activities')
                .update({
                    status: selectedStatus,
                    admin2_notes: message
                })
                .eq('id', selectedOffcampus.id);

            if (error) throw error;
            setSelectedOffcampus(null);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="admin2-offcampus-overlay">
            <div className="admin2-offcampus-container">
                <div className="admin2-offcampus-header">
                    <h2>Off-Campus Activity</h2>
                    <button className="admin2-offcampus-close" onClick={onClose}>&times;</button>
                </div>

                {!selectedOffcampus ? (
                    <div className="admin2-offcampus-list">
                        {offcampusList.map((offcampus) => (
                            <div 
                                key={offcampus.id} 
                                className="admin2-offcampus-item"
                                onClick={() => handleOffcampusClick(offcampus)}
                            >
                                <div className="admin2-offcampus-item-info">
                                    <h3>{offcampus.department}</h3>
                                    <p>{offcampus.date}</p>
                                </div>
                                <div className="admin2-offcampus-item-status">
                                    <span className="status-dot status-pending"></span>
                                    Pending
                                </div>
                                <i className="fas fa-chevron-right"></i>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="admin2-offcampus-content">
                        <button className="admin2-offcampus-back" onClick={handleBackClick}>
                            <i className="fas fa-arrow-left"></i> Back to list
                        </button>

                        <div className="admin2-offcampus-details">
                            <h3>{selectedOffcampus.department}</h3>
                            <p>Department Day</p>
                            <p>{selectedOffcampus.date}</p>
                        </div>

                        <div className="admin2-offcampus-documents">
                            <div className="admin2-offcampus-document">
                                <span>Request Letter</span>
                                <div className="admin2-offcampus-actions">
                                    <span className="admin2-offcampus-filename">
                                        {selectedOffcampus.requestLetter}
                                    </span>
                                    <button className="admin2-offcampus-download">
                                        <i className="fas fa-download"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="admin2-offcampus-document">
                                <span>Medical Certificate</span>
                                <div className="admin2-offcampus-actions">
                                    <span className="admin2-offcampus-filename">
                                        {selectedOffcampus.medicalCertificate}
                                    </span>
                                    <button className="admin2-offcampus-download">
                                        <i className="fas fa-download"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="admin2-offcampus-status">
                            <div className="admin2-offcampus-options">
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

                            <div className="admin2-offcampus-message">
                                <span>Note:</span>
                                <input
                                    type="text"
                                    placeholder="write a message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>

                            <div className="admin2-offcampus-upload">
                                <input
                                    type="file"
                                    id="fileUpload"
                                    style={{ display: 'none' }}
                                    onChange={(e) => setUploadedFile(e.target.files[0])}
                                />
                                <button className="admin2-offcampus-upload-btn" onClick={() => document.getElementById('fileUpload').click()}>
                                    <i className="fas fa-cloud-upload-alt"></i>
                                    Click here to Upload files...
                                </button>
                                {uploadedFile && <p>Selected file: {uploadedFile.name}</p>}
                            </div>
                        </div>

                        <div className="admin2-offcampus-footer">
                            <button className="admin2-offcampus-revise">
                                Revise
                            </button>
                            <button className="admin2-offcampus-update" onClick={handleUpdateStatus}>
                                Update status
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin2Offcampus;