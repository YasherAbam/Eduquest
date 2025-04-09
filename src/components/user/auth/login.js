import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../../styles/user/auth/login.css';
import logo from '../../../assets/images/logo.png';
import { authService } from '../../../services/auth.service';
import { supabase } from '../../../config/supabase';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    return {
      email: savedEmail || '',
      password: '',
      rememberMe: !!savedEmail
    };
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      // Basic validation
      if (!formData.email || !formData.password) {
        setError('Please fill in all fields');
        setIsLoading(false);
        return;
      }

      // Trim the email to remove any accidental spaces
      const email = formData.email.trim();
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address');
        setIsLoading(false);
        return;
      }

      console.log('Attempting to login with:', email);

      // Check if this is a test account
      if (process.env.REACT_APP_USE_TEST_LOGIN === 'true') {
        const testAdminEmail = 'admin@eduquest.com';
        const testAdmin2Email = 'admin2@eduquest.com';
        const testUserEmail = 'user@eduquest.com';
        const testPassword = 'password123';

        // Check if using a test account
        if ([testAdminEmail, testAdmin2Email, testUserEmail].includes(email) && 
            formData.password === testPassword) {
          console.log('Using test account login');
          
          if (email === testAdminEmail) {
            console.log('Logging in as test admin');
            sessionStorage.setItem('adminToken', 'demo-admin-token');
            handleRememberMe(email);
            navigate('/admin-dashboard');
            return;
          } else if (email === testAdmin2Email) {
            console.log('Logging in as test admin2');
            sessionStorage.setItem('adminToken', 'demo-admin2-token');
            handleRememberMe(email);
            navigate('/admin2-dashboard');
            return;
          } else if (email === testUserEmail) {
            console.log('Logging in as test user');
            sessionStorage.setItem('userToken', 'demo-user-token');
            handleRememberMe(email);
            navigate('/user-dashboard');
            return;
          }
        }
        
        // If not a test account, continue with Supabase auth
        console.log('Not a test account, using Supabase auth');
      }

      // Supabase Authentication
      const response = await authService.login(email, formData.password);
      console.log('Login response:', response);
      
      if (response.error) {
        console.error('Login error:', response.error);
        if (response.error.message.includes('Email not confirmed')) {
          setError('Please verify your email before logging in. Check your inbox for the verification link.');
        } else {
          setError(response.error.message || 'Invalid email or password');
        }
        setIsLoading(false);
        return;
      }

      if (!response.data || !response.data.profile) {
        console.error('Invalid login response:', response);
        setError('Error: User profile not found');
        setIsLoading(false);
        return;
      }

      console.log('Login successful:', response.data);

      // Store the session
      if (response.data.session) {
        sessionStorage.setItem('supabaseSession', JSON.stringify(response.data.session));
      }

      // Handle remember me
      handleRememberMe(email);
      
      // Navigate based on user role
      const userRole = response.data.profile.role || 'user';
      console.log('User role:', userRole);
      
      switch(userRole) {
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'admin2':
          navigate('/admin2-dashboard');
          break;
        default:
          navigate('/user-dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRememberMe = (email) => {
    if (formData.rememberMe) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
  };

  return (
    <div className="LOGIN-container">
      <div className="LOGIN-form-box">
        <div className="LOGIN-header">
          <div className="LOGIN-logo-container">
            <img 
              src={logo} 
              alt="EduQuest Logo" 
              className="LOGIN-logo-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'fallback-logo.png';
              }}
            />
          </div>
          <h1 className="LOGIN-app-title">EduQuest</h1>
          <h2 className="LOGIN-page-title">Login</h2>
        </div>

        {error && (
          <div className="LOGIN-error-message" role="alert">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="LOGIN-input-group">
            <label className="visually-hidden" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              aria-required="true"
              disabled={isLoading}
              autoComplete="email"
            />
          </div>

          <div className="LOGIN-input-group">
            <label className="visually-hidden" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              aria-required="true"
              disabled={isLoading}
              autoComplete="current-password"
            />
          </div>

          <div className="LOGIN-remember-forgot">
            <label className="LOGIN-remember-label">
              <input
                type="checkbox"
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                disabled={isLoading}
              />
              <span>Remember me</span>
            </label>
            <Link 
              to="/forgot-password" 
              className="LOGIN-forgot-link" 
              tabIndex={isLoading ? -1 : 0}
            >
              Forgot Password?
            </Link>
          </div>

          <button 
            type="submit" 
            className="LOGIN-submit-btn" 
            disabled={isLoading}
            aria-busy={isLoading}
          >
            <span>
            {isLoading ? (
            <>
              <div className="spinner"></div>
              <span>Logging in...</span>
            </>
          ) : (
            'Login'
          )}
            </span>
          </button>

          <div className="LOGIN-form-footer">
            <p>
              Don't have an account?
              <Link 
                to="/signup" 
                tabIndex={isLoading ? -1 : 0}
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;