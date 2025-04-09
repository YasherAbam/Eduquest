import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../../assets/images/logo.png';
import '../../../styles/user/auth/resetpassword.css';

function ResetPassword() {
    const navigate = useNavigate();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [passwordRequirements, setPasswordRequirements] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false
    });
    const [message, setMessage] = useState({ text: '', type: '' });
    const [isLoading, setIsLoading] = useState(false);

    // Password validation function
    const validatePassword = (password) => {
        setPasswordRequirements({
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[^A-Za-z0-9]/.test(password)
        });
    };

    // Check if all password requirements are met
    const isPasswordValid = (password) => {
        return password.length >= 8 &&
               /[A-Z]/.test(password) &&
               /[a-z]/.test(password) &&
               /[0-9]/.test(password) &&
               /[^A-Za-z0-9]/.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.newPassword !== formData.confirmPassword) {
            setMessage({ text: 'Passwords do not match', type: 'error' });
            return;
        }

        if (!isPasswordValid(formData.newPassword)) {
            setMessage({ text: 'Please meet all password requirements', type: 'error' });
            return;
        }

        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            setShowSuccessModal(true); // Show the success modal
            
        } catch (error) {
            setMessage({ text: 'Failed to reset password', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    // Update password validation on input change
    useEffect(() => {
        validatePassword(formData.newPassword);
    }, [formData.newPassword]);

    return (
        <div className="RESET-container">
            <div className="RESET-form-box">
                <div className="RESET-header">
                    <div className="RESET-logo-container">
                        <img src={logo} alt="EduQuest Logo" className="RESET-logo-image" />
                        <div className="RESET-logo-line"></div>
                    </div>
                    <h1 className="RESET-app-title">EduQuest</h1>
                    <h2 className="RESET-page-title">Reset Password</h2>
                </div>

                {message.text && (
                    <div className={`RESET-error-message ${message.type}`} role="alert">
                        <span>{message.text}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                    <div className="RESET-input-group">
                        <input
                            type="password"
                            placeholder="New Password"
                            value={formData.newPassword}
                            onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                            required
                        />
                    </div>

                    <div className="RESET-input-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                            required
                        />
                    </div>

                    <div className="RESET-password-requirements">
                        <p>Password must contain:</p>
                        <ul>
                            <li className={passwordRequirements.length ? 'valid' : ''}>
                                At least 8 characters
                            </li>
                            <li className={passwordRequirements.uppercase ? 'valid' : ''}>
                                One uppercase letter
                            </li>
                            <li className={passwordRequirements.lowercase ? 'valid' : ''}>
                                One lowercase letter
                            </li>
                            <li className={passwordRequirements.number ? 'valid' : ''}>
                                One number
                            </li>
                            <li className={passwordRequirements.special ? 'valid' : ''}>
                                One special character
                            </li>
                        </ul>
                    </div>

                    <button 
                        type="submit" 
                        className="RESET-submit-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Resetting...' : 'Reset Password'}
                    </button>

                    <div className="RESET-form-footer">
                        <p>Remember your password? <Link to="/login">Back to Login</Link></p>
                    </div>
                </form>
            </div>

            {/* Success Modal */}
            <Modal 
                show={showSuccessModal} 
                onHide={() => setShowSuccessModal(false)}
                centered
                className="RESET-forgot-modal success"
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body>
                    <div className="RESET-status-icon success">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <h5 className="RESET-modal-title">Password Reset Successful</h5>
                    <p className="RESET-modal-message">Your password has been reset successfully.</p>
                    <Button 
                        className="RESET-btn-action"
                        onClick={() => {
                            setShowSuccessModal(false);
                            navigate('/login'); // Navigate to login when closing the modal
                        }}
                    >
                        Close
                    </Button>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ResetPassword;