import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../../assets/images/logo.png';
import '../../../styles/user/auth/forgotpassword.css';

function ForgotPassword() {
    const navigate = useNavigate();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const [email, setEmail] = useState(() => {
        return localStorage.getItem('rememberedEmail') || '';
    });

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        if (!isValidEmail(email)) {
            setErrorMessage('Please enter a valid email address');
            setShowErrorModal(true);
            setIsLoading(false);
            return;
        }

        try {
            const response = await checkEmailExistsActive(email);
            
            if (!response.exists) {
                setErrorMessage('This email is not registered in our system');
                setShowErrorModal(true);
                setIsLoading(false);
                return;
            }

            localStorage.setItem('rememberedEmail', email);
            
            setShowSuccessModal(true);
            
        } catch (error) {
            setErrorMessage('An error occurred. Please try again later.');
            setShowErrorModal(true);
        } finally {
            setIsLoading(false);
        }
    };

    const checkEmailExistsActive = async (email) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const registeredEmails = [
                'test@example.com',
                'user@example.com',
                'admin@eduquest.com'
            ];
            
            return { exists: registeredEmails.includes(email.toLowerCase()) };
        } catch (error) {
            console.error('Error checking email:', error);
            throw error;
        }
    };

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        const token = btoa(email);
        navigate(`/reset-password?token=${token}`);
    };

    const handleErrorModalClose = () => {
        setShowErrorModal(false);
        setErrorMessage('');
    };

    return (
        <div className="FORGOT-container">
            <div className="FORGOT-form-box">
                <div className="FORGOT-header">
                    <div className="FORGOT-logo-container">
                        <img 
                            src={logo} 
                            alt="EduQuest Logo" 
                            className="FORGOT-logo-image"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'fallback-logo.png';
                            }}
                        />
                    </div>
                    <h1 className="FORGOT-title">EduQuest</h1>
                    <h2 className="FORGOT-page-title">Forgot Password</h2>
                </div>

                {errorMessage && !showErrorModal && (
                    <div className="FORGOT-error" role="alert">
                        <span>{errorMessage}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="FORGOT-form">
                    <div className="FORGOT-input-group">
                        <label className="visually-hidden" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            aria-required="true"
                            disabled={isLoading}
                            autoComplete="email"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="FORGOT-submit-btn" 
                        disabled={isLoading}
                        aria-busy={isLoading}
                    >
                        {isLoading ? (
                            <span>
                                <span className="FORGOT-loading-spinner"></span>
                                Sending...
                            </span>
                        ) : (
                            <span>SEND RESET LINK</span>
                        )}
                    </button>

                    <div className="FORGOT-footer">
                        <p>
                            Remember your password?{' '}
                            <Link 
                                to="/login" 
                                tabIndex={isLoading ? -1 : 0}
                            >
                                Back to Login
                            </Link>
                        </p>
                    </div>
                </form>

                {/* Success Modal */}
                <Modal 
                    show={showSuccessModal} 
                    onHide={handleSuccessModalClose}
                    centered
                    className="FORGOT-modal success"
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Body>
                        <div className="FORGOT-status-icon success">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <h5 className="FORGOT-modal-title">Check your email</h5>
                        <p className="FORGOT-modal-message">We've sent you instructions to reset your password</p>
                        <Button 
                            className="FORGOT-btn-action"
                            onClick={handleSuccessModalClose}
                        >
                            Check Email
                        </Button>
                    </Modal.Body>
                </Modal>

                {/* Error Modal */}
                <Modal 
                    show={showErrorModal} 
                    onHide={handleErrorModalClose}
                    centered
                    className="FORGOT-modal error"
                >
                    <Modal.Body>
                        <div className="FORGOT-status-icon error">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 9V11M12 15H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeLinecap="round"/>
                            </svg>
                        </div>
                        <h5 className="FORGOT-modal-title">Unable to send link</h5>
                        <p className="FORGOT-modal-message">{errorMessage}</p>
                        <Button 
                            className="FORGOT-btn-action"
                            onClick={handleErrorModalClose}
                        >
                            Try Again
                        </Button>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}

export default ForgotPassword;