import React, { useState } from 'react';
import './user-inhouse_modal.css';

const UserInhouseModal = ({ isOpen, onClose }) => {
    const [activityName, setActivityName] = useState('');
    const [dates, setDates] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="user-inhouse-modal-overlay">
            <div className="user-inhouse-modal-content">
                <div className="user-inhouse-modal-header">
                    <h2>In-House Activity</h2>
                    <button className="user-inhouse-modal-close" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="user-inhouse-modal-form">
                    <div className="user-inhouse-modal-form-group">
                        <label>Name of the Activity:</label>
                        <input
                            type="text"
                            value={activityName}
                            onChange={(e) => setActivityName(e.target.value)}
                            placeholder="Enter activity name"
                            required
                        />
                    </div>
                    <div className="user-inhouse-modal-form-group">
                        <label>Inclusive Dates (mm-dd-yyyy):</label>
                        <input
                            type="text"
                            value={dates}
                            onChange={(e) => setDates(e.target.value)}
                            placeholder="Enter dates"
                            required
                        />
                    </div>
                    <div className="user-inhouse-modal-form-group">
                        <p className="user-inhouse-modal-upload-text">Please upload file in jpeg, png, pdf format.</p>
                        <div className="user-inhouse-modal-file-container">
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                accept=".jpeg,.jpg,.png,.pdf"
                                id="inhouse-file-upload"
                                className="user-inhouse-modal-file-input"
                                required
                            />
                            <label htmlFor="inhouse-file-upload" className="user-inhouse-modal-file-label">
                                <i className="fas fa-cloud-upload-alt"></i>
                                Click here to upload files...
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="user-inhouse-modal-submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default UserInhouseModal;