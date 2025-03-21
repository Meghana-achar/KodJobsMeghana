import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.css';
import logo from './logo.png';
import fb from './fb.jpg';
import mail from './mail.jpg';
import x from './x.png';
import insta from './insta.png'


const API_URL = 'https://jooble.org/api/';
const API_KEY = '91327047-730f-4c0f-8f54-1de1490275c1';

const reviews = [
    { name: "John Doe", rating: "⭐⭐⭐⭐⭐", review: "Fantastic job search experience!" },
    { name: "Jane Smith", rating: "⭐⭐⭐⭐☆", review: "Found my dream job here!" },
    { name: "Alex Johnson", rating: "⭐⭐⭐☆☆", review: "Easy to use, but could improve." },
    { name: "Emily Davis", rating: "⭐⭐⭐⭐⭐", review: "Highly recommended for job seekers!" },
    { name: "Michael Brown", rating: "⭐⭐⭐⭐☆", review: "Great platform with useful features!" },
    { name: "Sophia Carter", rating: "⭐⭐⭐⭐⭐", review: "Amazing platform! Found my dream job within a week. Highly recommended!"},
    { name: "Daniel Smith", rating: "⭐⭐⭐⭐☆", review: "Great experience! The job search is smooth, but could use more filters."},
    { name: "Emma Johnson", rating: "⭐⭐⭐☆☆", review: "Decent service. Some job listings were outdated, but overall it's good." },
    { name: "Michael Brown", rating: "⭐⭐⭐⭐⭐", review: "Super user-friendly interface! This has made job hunting so much easier."},
    { name: "Olivia Wilson", rating: "⭐⭐☆☆☆", review: "Not many job opportunities in my field. Hope they add more soon." },
    { name: "James Anderson", rating: "⭐⭐⭐⭐⭐", review: "Fantastic job portal! Got multiple offers within days. Love it!"},
    { name: "Ava Thomas", rating: "⭐⭐⭐⭐☆", review: "Nice UI and experience. Would be great if they added more remote jobs." },
    { name: "Isabella Garcia", rating: "⭐⭐⭐☆☆", review: "Average experience. Some jobs were repetitive, but I did find a few good ones."},
    { name: "William Rodriguez", rating: "⭐⭐⭐⭐☆", review: "Smooth and fast job search. Found some great opportunities."}
];

const Main = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [currentReview, setCurrentReview] = useState(0);
    const [page, setPage] = useState(1); // Added page state for infinite scrolling

    const fetchJobs = async () => {
        try {
            const response = await fetch(`${API_URL}${API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ keywords: 'developer', location: 'remote', page: page }) // Fetch data with page number
            });

            const data = await response.json();
            setJobs((prevJobs) => [...prevJobs, ...(data.jobs || [])]); // Append new jobs instead of replacing
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, [page]); // Re-fetch jobs when page number updates

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentReview((prev) => (prev + 1) % reviews.length);
        }, 3000); // Change review every 3 seconds

        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        navigate('/login');
    };

    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (scrollTop + clientHeight >= scrollHeight - 10) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <div className="main-container">
            {/* Sidebar (30%) */}
            <div className="logo-container">
                <img src={logo} alt="KodNest Logo" className="logo" />
                <span className="jobs-text">JOBS</span>
            </div>
            <div className="sidebar">
                {/* Scrolling Message */}
                <div className="scrolling-message">
                    <marquee behavior="scroll" direction="left">
                        How can I help you today?
                    </marquee>
                </div>

                {/* Quick Actions */}
                <div className="quick-actions">
                    <h3>Features</h3>
                    <ul>
                        <li>🔍 Search for Jobs</li>
                        <li>⭐ Saved Jobs</li>
                        <li>📬 Job Alerts</li>
                        <li>💼 Applied Jobs</li>
                        <li>👤 Profile</li>
                        <li>⚙️ Job Preferences</li>
                        <li>🏢 Companies</li>
                        <li>🛠️ Services</li>
                    </ul>
                </div>

                {/* Support & Policies */}
                <div className="support-section">
                    <h3>Support & Policies</h3>
                    <ul>
                        <li>📖 About Us</li>
                        <li>🔒 Privacy Policy</li>
                        <li>⚖️ Terms & Conditions</li>
                    </ul>
                </div>

               

                {/* User Review Card */}
                <div className="review-card">
                    <h4> User Review </h4>
                    <p><strong>{reviews[currentReview].name}</strong></p>
                    <p className="rating">{reviews[currentReview].rating}</p>
                    <p>"{reviews[currentReview].review}"</p>
                </div>
                 {/* Logout Button */}
                 <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
                <div className="contact-icons">
       
          <img src={x} alt="Twitter" />
          <img src={fb} alt="Facebook" />
          <img src={mail} alt="Mail" />
          <img src={insta} alt="insta"/>
       
      </div>
            </div>

            {/* Main Content (70%) */}
            <div className="main-content" onScroll={handleScroll}>
                <div className="job-grid">
                    {jobs.map((job, index) => (
                        <div key={index} className="job-card">
                            <h3>{job.title}</h3>
                            <p><strong>Company:</strong> {job.company}</p>
                            <p><strong>Location:</strong> {job.location}</p>
                            <p><strong>Salary:</strong> {job.salary || 'Not disclosed'}</p>
                            <a href={job.link} target="_blank" rel="noopener noreferrer" className="apply-button">Apply Now</a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Main;
