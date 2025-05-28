import React from 'react';
import { Link } from 'react-router-dom';

function AdminSupportPage() {
    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="bg-white rounded-md shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Support</h2>
                <p className="text-gray-600 mb-4">Here you can find resources and support information.</p>
                <ul>
                    <li><Link to="/admin/documentation" className="text-indigo-600 hover:text-indigo-800">Documentation</Link></li>
                    <li><Link to="/admin/faq" className="text-indigo-600 hover:text-indigo-800">Frequently Asked Questions</Link></li>
                    {/* Add more support links */}
                </ul>
            </div>
        </div>
    );
}

export default AdminSupportPage;