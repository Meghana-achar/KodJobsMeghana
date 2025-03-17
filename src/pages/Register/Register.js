import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import logo from './logo.png';

const images = [
    'https://images.unsplash.com/photo-1635350736475-c8cef4b21906?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?q=80&w=2100&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1678917827802-721b5f5b4bf0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
];   

const proverbs = [
    "Opportunities don't happen, you create them.",
    "Choose a job you love, and you will never have to work a day in your life.",
    "Success is where preparation and opportunity meet."
];

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '', dateOfBirth: '' });
    const [error, setError] = useState('');
    const [currentImage, setCurrentImage] = useState(0);
    const [currentProverb, setCurrentProverb] = useState(0);

    useEffect(() => {
        const imageInterval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 3000);
        
        const proverbInterval = setInterval(() => {
            setCurrentProverb((prev) => (prev + 1) % proverbs.length);
        }, 3000);
        
        return () => {
            clearInterval(imageInterval);
            clearInterval(proverbInterval);
        };
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!response.ok) throw new Error('Registration failed');
            alert('Registration successful!');
            navigate('/login');
        } catch (error) {
            setError('Registration failed: ' + error.message);
        }
    };

    return (
        <div className="register-container">
            {/* Left Section - Image Slider & Proverb */}
            <div className="left-section">
            <div className="logo-container">
           <img src={logo} alt="KodNest Logo" className="logo" />
           <span className="jobs-text">JOBS</span>
             </div>
                <div className="proverb-container">
                    <div className="proverb">{proverbs[currentProverb]}</div>
                </div>
                <img src={images[currentImage]} alt="Slideshow" className="slider" />
            </div>
    
            {/* Right Section - Registration Form */}
            <div className="right-section">
                <div className="register-box">
                    <h2 class="welcome">Welcome</h2>
                    <div className="toggle-buttons">
                        <Link to="/register" className="active">Register</Link>
                        <Link to="/login">Login</Link>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                        </div>
                        <button type="submit" className="register-button">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
    
};

export default Register;
