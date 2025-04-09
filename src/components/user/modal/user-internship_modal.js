import React, { useState } from 'react';
import './user-internship_modal.css';

const UserInternshipModal = ({ isOpen, onClose }) => {
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
        <div className="user-internship-modal-overlay">
            <div className="user-internship-modal-content">
                <div className="user-internship-modal-header">
                    <h2>Internship</h2>
                    <button className="user-internship-modal-close" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="user-internship-modal-form">
                    <div className="user-internship-modal-form-group">
                        <label>Name of the Activity:</label>
                        <input
                            type="text"
                            value={activityName}
                            onChange={(e) => setActivityName(e.target.value)}
                            placeholder="Enter activity name"
                            required
                        />
                    </div>
                    <div className="user-internship-modal-form-group">
                        <label>Inclusive Dates (mm-dd-yyyy):</label>
                        <input
                            type="text"
                            value={dates}
                            onChange={(e) => setDates(e.target.value)}
                            placeholder="Enter dates"
                            required
                        />
                    </div>
                    <div className="user-internship-modal-form-group">
                        <p className="user-internship-modal-upload-text">Please upload file in jpeg, png, pdf format.</p>
                        <div className="user-internship-modal-file-container">
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                accept=".jpeg,.jpg,.png,.pdf"
                                id="file-upload"
                                className="user-internship-modal-file-input"
                                required
                            />
                            <label htmlFor="file-upload" className="user-internship-modal-file-label">
                                <i className="fas fa-cloud-upload-alt"></i>
                                Click here to upload files...
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="user-internship-modal-submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default UserInternshipModal;