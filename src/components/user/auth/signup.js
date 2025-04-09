import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../../styles/user/auth/signup.css';
import logo from '../../../assets/images/logo.png';
import { authService } from '../../../services/auth.service';

// Define courses array outside the component
const courses = [
  "BS Information Technology",
  "BS Computer Science",
  "BS Information Systems",
  "BS Computer Engineering",
  "BS Electronics Engineering",
  "BS Electrical Engineering",
  "BS Civil Engineering",
  "BS Mechanical Engineering",
  "BS Industrial Engineering",
  "BS Chemical Engineering",
  "BS Criminology",
  "BS Nursing",
  // Add more courses as needed
].sort();

function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    studentNo: '',
    course: '',
    birthday: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Check terms acceptance first
      if (!formData.termsAccepted) {
        setError('Please accept the terms and conditions');
        setIsLoading(false);
        return;
      }

      // Basic validation
      if (!formData.email || !formData.password || !formData.fullName || 
          !formData.studentNo || !formData.course || !formData.birthday) {
        setError('Please fill in all fields');
        setIsLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setIsLoading(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Please enter a valid email address');
        setIsLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        setIsLoading(false);
        return;
      }

      // Register user with Supabase
      const { data, error: signUpError } = await authService.signup(
        formData.email,
        formData.password,
        formData.fullName,
        formData.studentNo,
        formData.course,
        formData.birthday
      );


      if (signUpError) {
        console.error('Signup error details:', signUpError);
        throw signUpError;
      }

      // Navigate to login page on successful registration
      navigate('/login', {
        state: {
          message: 'Registration successful! Please check your email to verify your account.'
        }
      });
    } catch (err) {
      console.error('Full error details:', err);
      setError(err.message || 'An error occurred during registration');
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="signup-container">
      <div className="signup-form-box">
        <div className="signup-logo">
          <img 
            src={logo} 
            alt="EduQuest Logo" 
            className="logo-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'fallback-logo.png';
            }}
          />
          <h2 className="signup-logo-text">EduQuest</h2>
        </div>
        
        <div className="signup-header">
          <h3 className="page-title">SIGN UP</h3>
        </div>
        
        {error && <div className="signup-error-message">{error}</div>}
        
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="input-group fullname">
            <input
              type="text"
              id="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="number"
              id="studentNo."
              placeholder="Student No."
              value={formData.studentNo}
              onChange={(e) => {
                // Only allow numeric input
                const value = e.target.value.replace(/[^0-9]/g, '');
                setFormData(prevData => ({
                  ...prevData,
                  studentNo: value
                }));
              }}
              required
              min="0"
              pattern="[0-9]*"
              inputMode="numeric"
            />
          </div>
          <div className="input-group">
            <select
              id="course"
              value={formData.course}
              onChange={handleChange}
              required
              className="course-select"
            >
              <option value="">Select Course</option>
              {courses.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <input
              type="date"
              id="birthday"
              placeholder="Birthday"
              value={formData.birthday}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group password-group">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group confirm-password-group">
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="terms-checkbox">
            <label>
              <input
                type="checkbox"
                id="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                required
              />
              I agree to the <Link to="/terms">Terms & Conditions</Link>
            </label>
          </div>
          <button type="submit" className="submit-btn">
            Create Account
          </button>
        </form>

        <div className="form-footer">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;