// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './RegisterPage.css';

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const handleSubmit = async (values, { setSubmitting }) => {
    // Remove confirmPassword as it's not needed in the API
    const { confirmPassword, ...userData } = values;
    
    const result = await register(userData);
    setSubmitting(false);
    
    if (result.success) {
      navigate('/');
    } else {
      setServerError(result.error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-header">
          <h2>Create a new account</h2>
        </div>
        
        {serverError && (
          <div className="error-message" role="alert">
            <span>{serverError}</span>
          </div>
        )}
        
        <Formik
          initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="register-form">
              <div className="form-group">
                <div className="input-group">
                  <label htmlFor="name" className="sr-only">Full Name</label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    className="form-input"
                    placeholder="Full Name"
                  />
                  <ErrorMessage name="name" component="div" className="error-text" />
                </div>
                
                <div className="input-group">
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="form-input"
                    placeholder="Email address"
                  />
                  <ErrorMessage name="email" component="div" className="error-text" />
                </div>
                
                <div className="input-group">
                  <label htmlFor="password" className="sr-only">Password</label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    className="form-input"
                    placeholder="Password"
                  />
                  <ErrorMessage name="password" component="div" className="error-text" />
                </div>
                
                <div className="input-group">
                  <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                  <Field
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    className="form-input"
                    placeholder="Confirm Password"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="error-text" />
                </div>
              </div>

              <div className="button-group">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-button"
                >
                  {isSubmitting ? 'Creating account...' : 'Register'}
                </button>
              </div>
              
              <div className="login-link">
                <Link to="/login">
                  Already have an account? Sign in
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterPage;