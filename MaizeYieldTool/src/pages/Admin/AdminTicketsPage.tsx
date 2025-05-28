import React from 'react';

function AdminTicketsPage() {
    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="bg-white rounded-md shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Submitted Tickets</h2>
                <p className="text-gray-600">This section will allow you to view and manage user-submitted support tickets.</p>
                {/* Ticket list and management UI would go here */}
            </div>
        </div>
    );
}

export default AdminTicketsPage;