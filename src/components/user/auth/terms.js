import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../styles/user/auth/terms.css';

function Terms() {
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const navigate = useNavigate();

  const handleAccept = () => {
    setShowAcceptModal(true);
    setTimeout(() => {
      navigate('/signup');
    }, 1500);
  };
  
  const handleDecline = () => {
    setShowDeclineModal(true);
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="terms-container">
      <div className="terms-form-box">
        <div className="terms-header">
          <div className="terms-logo-container">
            <img 
              src={logo} 
              alt="EduQuest Logo" 
              className="terms-logo-image"
            />
          </div>
          <h1 className="terms-title">EduQuest</h1>
          <h2 className="terms-page-title">Terms and Conditions</h2>
        </div>
        
        <div className="terms-content">
          <div className="terms-section">
            <h3>1. Acceptance of Terms</h3>
            <p>By accessing and using EduQuest, you agree to be bound by these Terms and Conditions.</p>
            <ul>
              <li>You must be at least 18 years old to use this service</li>
              <li>You agree to provide accurate and complete information</li>
              <li>You are responsible for maintaining the confidentiality of your account</li>
            </ul>
          </div>

          <div className="terms-section">
            <h3>2. User Responsibilities</h3>
            <p>As a user of EduQuest, you agree to:</p>
            <ul>
              <li>Use the platform for educational purposes only</li>
              <li>Respect intellectual property rights</li>
              <li>Not share account credentials with others</li>
              <li>Follow academic integrity guidelines</li>
            </ul>
          </div>

          <div className="terms-section">
            <h3>3. Privacy Policy</h3>
            <p>We are committed to protecting your privacy:</p>
            <ul>
              <li>Personal information is collected and stored securely</li>
              <li>Data is used only for educational purposes</li>
              <li>We do not share information with third parties</li>
            </ul>
          </div>

          <div className="terms-section">
            <h3>4. Content Usage</h3>
            <p>Regarding content on EduQuest:</p>
            <ul>
              <li>All materials are for educational use only</li>
              <li>Do not distribute or copy content without permission</li>
              <li>Respect copyright and intellectual property laws</li>
            </ul>
          </div>
        </div>

        <div className="terms-actions">
          <button className="terms-accept-btn" onClick={handleAccept}>
            <span>Accept</span>
          </button>
          <button className="terms-decline-btn" onClick={handleDecline}>
            <span>Decline</span>
          </button>
        </div>
      </div>

      {/* Accept Modal */}
      <Modal 
        show={showAcceptModal} 
        onHide={() => setShowAcceptModal(false)}
        centered
        className="terms-modal success"
      >
        <Modal.Body>
          <div className="status-icon success">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h5 className="modal-title">Terms Accepted</h5>
          <p className="modal-message">Redirecting you to sign up...</p>
        </Modal.Body>
      </Modal>

      {/* Decline Modal */}
      <Modal 
        show={showDeclineModal} 
        onHide={() => setShowDeclineModal(false)}
        centered
        className="terms-modal error"
      >
        <Modal.Body>
          <div className="status-icon error">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8v4m0 4h.01M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h5 className="modal-title">Terms Declined</h5>
          <p className="modal-message">Redirecting you to login...</p>
        </Modal.Body>
      </Modal>
      
    </div>
  );
}

export default Terms;