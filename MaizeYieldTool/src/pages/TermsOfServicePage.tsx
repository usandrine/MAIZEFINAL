// src/pages/TermsOfServicePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfServicePage: React.FC = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <Link to="/" className="text-green-600 hover:underline mb-4 block">
                ← Back to Home
            </Link>
            <h1 className="text-2xl font-semibold text-gray-700 mb-6">AgriYield Terms of Service</h1>
            <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-700 mb-4">
                    Welcome to AgriYield! By accessing and using our services, you agree to
                    comply with these Terms of Service. Please read them carefully.
                </p>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Use of Our Services</h2>
                <p className="text-gray-700 mb-4">
                    Our services are intended to provide you with maize yield predictions
                    and related agricultural insights. You agree to use our platform for lawful
                    and legitimate purposes only.
                </p>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Intellectual Property</h2>
                <p className="text-gray-700 mb-4">
                    The AgriYield platform and its content are protected by intellectual
                    property laws. You may not reproduce, distribute, or modify our content
                    without our explicit permission.
                </p>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Disclaimer of Warranty</h2>
                <p className="text-gray-700 mb-4">
                    While we strive to provide accurate predictions, our services are provided
                    "as is" without any warranties, express or implied.
                </p>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Limitation of Liability</h2>
                <p className="text-gray-700 mb-4">
                    AgriYield shall not be liable for any indirect, incidental, or consequential
                    damages arising from your use of our services.
                </p>
                {/* Add more sections as needed */}
                <p className="text-gray-700 mt-4">
                    For the full details of our terms, please read the complete Terms of Service.
                </p>
            </div>
        </div>
    );
};

export default TermsOfServicePage;