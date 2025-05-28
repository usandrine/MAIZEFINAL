// src/components/ProfilePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface User {
    name: string;
    email: string;
    // Add other relevant user information types here
}

const ProfilePage: React.FC = () => {
    // In a real application, you would fetch user data here, likely using a state management solution or React Context
    const user: User = {
        name: 'John Doe', // Replace with actual user data
        email: 'john.doe@example.com', // Replace with actual user data
        // Add other relevant user information here
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <Link to="/dashboard" className="text-green-600 hover:underline mb-4 block">
                ← Back to Dashboard
            </Link>
            <h1 className="text-2xl font-semibold text-gray-700 mb-6">User Profile</h1>
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Account Information</h2>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                {/* You can add more user details or settings here in the future */}
            </div>
            {/* You could add sections for settings, preferences, etc. */}
        </div>
    );
};

export default ProfilePage;