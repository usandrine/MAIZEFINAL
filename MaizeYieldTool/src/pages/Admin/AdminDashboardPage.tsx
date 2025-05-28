import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faChartBar, faCog, faSignOutAlt, faTachometerAlt, faExclamationTriangle, faBrain, faWifi, faQuestionCircle, faTicketAlt, faClipboardList, faBell } from '@fortawesome/free-solid-svg-icons'; // Added more icons

function AdminOverviewPage() {
    const totalUsers = 1050; // Mock data

    return (
        <div className="bg-gray-100 min-h-screen flex">
            {/* Sidebar Navigation */}
            <aside className="bg-white w-64 p-6 shadow-md flex flex-col justify-between h-screen">
                <div>
                    {/* Logo */}
                    <div className="flex items-center mb-8">
                        <img src="/your-logo.png" alt="AgriYield Admin Logo" className="w-10 h-10 mr-3" />
                        <span className="font-bold text-xl text-indigo-700">AgriYield Admin</span>
                    </div>
                    {/* Navigation Links */}
                    <nav>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Admin Menu</h3>
                        <Link to="/admin-Dashboard" className="block py-2 px-4 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 rounded-md transition duration-150 ease-in-out">
                            <FontAwesomeIcon icon={faTachometerAlt} className="mr-3" /> Dashboard
                        </Link>
                        <Link to="/User-Management" className="block py-2 px-4 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 rounded-md transition duration-150 ease-in-out">
                            <FontAwesomeIcon icon={faUsers} className="mr-3" /> User Management
                        </Link>
                        <Link to="/Admin-Reports-Analytics" className="block py-2 px-4 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 rounded-md transition duration-150 ease-in-out">
                            <FontAwesomeIcon icon={faChartBar} className="mr-3" /> Reports & Analytics
                        </Link>
                        <Link to="/Admin-Settings" className="block py-2 px-4 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 rounded-md transition duration-150 ease-in-out">
                            <FontAwesomeIcon icon={faCog} className="mr-3" /> Settings
                        </Link>
                        <Link to="/Admin-Alerts" className="block py-2 px-4 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 rounded-md transition duration-150 ease-in-out">
                            <FontAwesomeIcon icon={faExclamationTriangle} className="mr-3" /> System Alerts
                        </Link>
                        <Link to="/Admin-AI-IOT" className="block py-2 px-4 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 rounded-md transition duration-150 ease-in-out">
                            <FontAwesomeIcon icon={faBrain} className="mr-3" /> AI & IoT Config
                        </Link>
                        <Link to="/Admin-support" className="block py-2 px-4 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 rounded-md transition duration-150 ease-in-out">
                            <FontAwesomeIcon icon={faQuestionCircle} className="mr-3" /> Support
                        </Link>
                        <Link to="/admin/tickets" className="block py-2 px-4 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 rounded-md transition duration-150 ease-in-out">
                            <FontAwesomeIcon icon={faTicketAlt} className="mr-3" /> View Submitted Tickets
                        </Link>
                        <Link to="/Admin-log-Security" className="block py-2 px-4 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 rounded-md transition duration-150 ease-in-out">
                            <FontAwesomeIcon icon={faClipboardList} className="mr-3" /> System Logs & Security
                        </Link>
                        <Link to="/admin/send-alert" className="block py-2 px-4 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 rounded-md transition duration-150 ease-in-out">
                            <FontAwesomeIcon icon={faBell} className="mr-3" /> Send Alerts to Users
                        </Link>
                    </nav>
                </div>
                <div className="mt-8 pt-4 border-t border-gray-200">
                    <Link to="/logout" className="block py-2 px-4 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-md transition duration-150 ease-in-out">
                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" /> Logout
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-6">
                {/* Admin Info Bar */}
                <div className="bg-white p-4 rounded-md shadow-sm mb-6 flex items-center justify-between">
                    <span className="text-gray-700">👤 Admin Name</span>
                    <div>
                        <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-500 mr-2" />
                        <Link to="/admin/alerts" className="text-gray-700 hover:text-indigo-600">Notifications</Link>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faCog} className="text-gray-500 mr-2" />
                        <Link to="/admin/settings" className="text-gray-700 hover:text-indigo-600">Settings</Link>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-md shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Admin Dashboard Overview</h2>
                    <p className="text-gray-600 mb-4">Welcome to the Admin Dashboard. Here's a quick overview of key metrics and functionalities.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        <div className="bg-gray-50 rounded-md p-4 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Users</h3>
                            <p className="text-2xl font-bold text-indigo-600">{totalUsers}</p>
                        </div>
                        {/* Add more key metrics here */}
                    </div>

                    <p className="text-gray-600">Use the sidebar to navigate to different sections of the administration panel.</p>
                </div>
            </main>
        </div>
    );
}

export default AdminOverviewPage;