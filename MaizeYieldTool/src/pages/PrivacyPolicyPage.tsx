// src/pages/PrivacyPolicyPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage: React.FC = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <Link to="/" className="text-green-600 hover:underline mb-4 block">
                ← Back to Home
            </Link>
            <h1 className="text-2xl font-semibold text-gray-700 mb-6">AgriYield Privacy Policy</h1>
            <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-700 mb-4">
                    At AgriYield, we are committed to protecting your privacy. This Privacy Policy
                    explains how we collect, use, and safeguard your personal information when you
                    use our website and services.
                </p>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Information We Collect</h2>
                <p className="text-gray-700 mb-4">
                    We may collect information such as your name, email address, farm details,
                    and usage data. This information helps us to provide you with accurate
                    yield predictions and improve our services.
                </p>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">How We Use Your Information</h2>
                <p className="text-gray-700 mb-4">
                    Your information is used to generate yield predictions, personalize your
                    experience, communicate with you about our services, and for analytical purposes
                    to enhance our platform.
                </p>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Data Security</h2>
                <p className="text-gray-700 mb-4">
                    We implement security measures to protect your personal information from
                    unauthorized access, use, or disclosure.
                </p>
                {/* Add more sections as needed */}
                <p className="text-gray-700 mt-4">
                    For more detailed information, please read our full Privacy Policy.
                </p>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;