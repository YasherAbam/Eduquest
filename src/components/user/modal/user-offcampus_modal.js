import React, { useState } from 'react';
import './user-offcampus_modal.css';

const UserOffcampusModal = ({ isOpen, onClose }) => {
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
        <div className="user-offcampus-modal-overlay">
            <div className="user-offcampus-modal-content">
                <div className="user-offcampus-modal-header">
                    <h2>Off-Campus Activity</h2>
                    <button className="user-offcampus-modal-close" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="user-offcampus-modal-form">
                    <div className="user-offcampus-modal-form-group">
                        <label>Name of the Activity:</label>
                        <input
                            type="text"
                            value={activityName}
                            onChange={(e) => setActivityName(e.target.value)}
                            placeholder="Enter activity name"
                            required
                        />
                    </div>
                    <div className="user-offcampus-modal-form-group">
                        <label>Inclusive Dates (mm-dd-yyyy):</label>
                        <input
                            type="text"
                            value={dates}
                            onChange={(e) => setDates(e.target.value)}
                            placeholder="Enter dates"
                            required
                        />
                    </div>
                    <div className="user-offcampus-modal-form-group">
                        <p className="user-offcampus-modal-upload-text">Please upload file in jpeg, png, pdf format.</p>
                        <div className="user-offcampus-modal-file-container">
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                accept=".jpeg,.jpg,.png,.pdf"
                                id="offcampus-file-upload"
                                className="user-offcampus-modal-file-input"
                                required
                            />
                            <label htmlFor="offcampus-file-upload" className="user-offcampus-modal-file-label">
                                <i className="fas fa-cloud-upload-alt"></i>
                                Click here to upload files...
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="user-offcampus-modal-submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default UserOffcampusModal;