// src/pages/AboutPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <Link to="/" className="text-green-600 hover:underline mb-4 block">
                ← Back to Home
            </Link>
            <h1 className="text-2xl font-semibold text-gray-700 mb-6">About AgriYield</h1>
            <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-700">
                    This is the About Us page for AgriYield. Here, you can provide information
                    about your team, mission, and the technology behind your crop yield tool.
                    (Content to be added later)
                </p>
            </div>
        </div>
    );
};

export default AboutPage;