import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CropStatusCard from '../components/CropStatusCard';
import YieldTrendChartCard from '../components/YieldTrendChartCard';
import TasksAlertsCard from '../components/TasksAlertsCard';
import WeatherDataCard from '../components/WeatherDataCard';
import AIRecommendationsCard from '../components/AIRecommendationsCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function UserDashboardPage() {
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    const toggleNotifications = () => {
        console.log('Notifications toggled');
        setIsNotificationsOpen(!isNotificationsOpen);
        console.log('isNotificationsOpen:', isNotificationsOpen);
    };

    const mockNotifications = [
        { id: 1, message: 'Reminder: Check soil moisture levels in Field A.', time: '5 mins ago' },
        { id: 2, message: 'Alert: Potential pest detected in Zone 3. Investigate.', time: '15 mins ago' },
        { id: 3, message: 'Information: Upcoming weather forecast update at 6 PM.', time: '30 mins ago' },
    ];

    return (
        <div className="bg-gray-100 min-h-screen flex">
            {/* Sidebar Navigation */}
            <aside className="bg-white w-64 p-6 shadow-md flex flex-col justify-between h-screen">
                <div>
                    {/* Logo */}
                    <div className="flex items-center mb-8">
                        <img src="/your-logo.png" alt="AgriYield Logo" className="w-10 h-10 mr-3" />
                        <span className="font-bold text-xl text-green-700">AgriYield</span>
                    </div>
                    {/* Navigation Links */}
                    <nav>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Dashboard</h3>
                        <a href="#crop-status-card" className="block py-2 px-4 text-gray-700 hover:bg-green-100 hover:text-green-700 rounded-md transition duration-150 ease-in-out">
                            <span className="mr-3">📊</span> Maize Crop Status
                        </a>
                        <a href="#weather-data-card" className="block py-2 px-4 text-gray-700 hover:bg-green-100 hover:text-green-700 rounded-md transition duration-150 ease-in-out">
                            <span className="mr-3">🌤️</span> Maize Weather Data
                        </a>
                        <a href="#ai-recommendations-card" className="block py-2 px-4 text-gray-700 hover:bg-green-100 hover:text-green-700 rounded-md transition duration-150 ease-in-out">
                            <span className="mr-3">🧠</span> Maize AI Recommendations
                        </a>
                        <Link to="/yield-prediction" className="block py-2 px-4 text-gray-700 hover:bg-green-100 hover:text-green-700 rounded-md transition duration-150 ease-in-out">
                            <span className="mr-3">📈</span> Maize Yield Prediction
                        </Link>
                        <Link to="/planting-harvesting" className="block py-2 px-4 text-gray-700 hover:bg-green-100 hover:text-green-700 rounded-md transition duration-150 ease-in-out">
        <span className="mr-3">🌱</span> Planting Records {/* You can choose a more relevant icon */}
    </Link>
    
    <Link to="/reports-analytics" className="block py-2 px-4 text-gray-700 hover:bg-green-100 hover:text-green-700 rounded-md transition duration-150 ease-in-out">
        <span className="mr-3">📊</span> Reports & Analytics {/* Choose an appropriate icon */}
    </Link>
                        <a href="#tasks-alerts-card" className="block py-2 px-4 text-gray-700 hover:bg-green-100 hover:text-green-700 rounded-md transition duration-150 ease-in-out">
                            <span className="mr-3">🔔</span> Maize Alerts
                        </a>
                        <Link to="/settings" className="block py-2 px-4 text-gray-700 hover:bg-green-100 hover:text-green-700 rounded-md transition duration-150 ease-in-out">
                            <span className="mr-3">⚙️</span> Maize Settings
                        </Link>
                        <a href="#dashboard-top" className="block py-2 px-4 text-gray-700 hover:bg-green-100 hover:text-green-700 rounded-md transition duration-150 ease-in-out">
                            <span className="mr-3">📊</span> Dashboard Top
                        </a>
                    </nav>
                </div>
                {/* Logout link remains at the bottom */}
                <div className="mt-8 pt-4 border-t border-gray-200">
                    <a href="/" className="block py-2 px-4 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-md transition duration-150 ease-in-out">
                        <span>🚪</span> Logout
                    </a>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-6">
                {/* User Info Bar */}
                <div className="bg-white p-4 rounded-md shadow-sm mb-6 flex items-center justify-end space-x-4 relative"> {/* Added relative for positioning */}
                    <span className="text-gray-700">👤 User Name</span>
                    <button onClick={toggleNotifications} className="relative">
                        <span className="text-gray-700">
                            <FontAwesomeIcon icon={faBell} className="mr-1 text-orange-500" /> Notifications
                        </span>
                        <span className="absolute top-0 right-[-8px] bg-red-500 text-white text-xs rounded-full px-2 py-0.5">3</span> {/* Example notification count */}

                        {/* Notification Dropdown */}
                        {isNotificationsOpen && (
                            <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-md shadow-xl border border-gray-200 z-10">
                                <h3 className="font-semibold text-gray-700 p-3 border-b border-gray-200">Notifications</h3>
                                <ul className="py-2">
                                    {mockNotifications.length > 0 ? (
                                        mockNotifications.map(notification => (
                                            <li key={notification.id} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                <p className="font-semibold">{notification.message}</p>
                                                <p className="text-xs text-gray-500">{notification.time}</p>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="px-4 py-2 text-sm text-gray-700">No new notifications.</li>
                                    )}
                                </ul>
                                <a href="/notifications" className="block p-3 text-center text-green-600 hover:bg-green-100 text-sm">
                                    View All Notifications {/* Placeholder link */}
                                </a>
                            </div>
                        )}
                    </button>
                    <Link to="/profile" className="ml-4 text-blue-500 hover:underline cursor-pointer">
                    Profile
                </Link>

                

                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div ref={undefined} id="crop-status-card" className="lg:col-span-1">
                        <CropStatusCard />
                    </div>
                    <div ref={undefined} id="tasks-alerts-card" className="lg:col-span-1">
                        <TasksAlertsCard />
                    </div>
                    <div ref={undefined} id="weather-data-card" className="lg:col-span-1">
                        <WeatherDataCard />
                    </div>
                    <div ref={undefined} id="yield-trend-chart-card" className="md:col-span-2 lg:col-span-3">
                        <YieldTrendChartCard />
                    </div>
                    <div ref={undefined} id="ai-recommendations-card" className="md:col-span-2 lg:col-span-3">
                        <AIRecommendationsCard />
                    </div>
                </div>
            </main>
            <div ref={undefined} id="dashboard-top" style={{ position: 'absolute', top: 0 }}></div>
        </div>
    );
}

export default UserDashboardPage;