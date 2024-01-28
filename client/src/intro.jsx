import React from 'react';
import { Link } from 'react-router-dom';

const Intro = () => (
    <div className="intro-page">
        <div className="intro-content">
            <h1>Welcome to Browsify!</h1>
            <p>Your personalized selling experience starts here.</p>
        </div>
        <div className="intro-button">
            <Link to="/view" id="introbtn" className="btn btn-primary">Get Started</Link>
        </div>
    </div>
);

export default Intro;