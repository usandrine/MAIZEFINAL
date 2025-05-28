import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // If you decide to use Link for navigation

function SettingsPage() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light'); // Get theme from local storage or default to light

  useEffect(() => {
    document.body.className = theme; // Set the theme as a class on the body
    localStorage.setItem('theme', theme); // Save theme to local storage
  }, [theme]);

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(event.target.value);
  };

  return (
    <div className={`bg-gray-100 min-h-screen p-6 ${theme === 'dark' ? 'dark-bg' : ''}`}>
      <div className="bg-white rounded-lg shadow-md p-8">
        <Link to="/dashboard" className="text-green-600 hover:underline mb-4 block">
          ← Back to Dashboard
        </Link>
        <h1 className="text-2xl font-semibold text-green-700 mb-6">Settings</h1>
        <p className="text-gray-600">This page will allow users to manage their application settings.</p>

        {/* Account Settings */}
        <div className="mt-6 border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Account Settings</h2>
          <div className="mb-4">
            <label htmlFor="currentPassword" className="block text-gray-700 text-sm font-bold mb-2">
              Current Password:
            </label>
            <input
              type="password"
              id="currentPassword"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold mb-2">
              New Password:
            </label>
            <input
              type="password"
              id="newPassword"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
              Confirm New Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            type="button"
          >
            Change Password
          </button>
        </div>

        {/* Farm Settings */}
        <div className="mt-6 border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Farm Settings</h2>
          <div className="mb-4">
            <label htmlFor="farmName" className="block text-gray-700 text-sm font-bold mb-2">
              Farm Name:
            </label>
            <input
              type="text"
              id="farmName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="farmLocation" className="block text-gray-700 text-sm font-bold mb-2">
              Farm Location:
            </label>
            <input
              type="text"
              id="farmLocation"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="primaryCrop" className="block text-gray-700 text-sm font-bold mb-2">
              Primary Crop:
            </label>
            <select
              id="primaryCrop"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option>Maize</option>
              <option>Rice</option>
              <option>Wheat</option>
              {/* Add more crop options */}
            </select>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Units of Measurement:
            </label>
            <div className="flex items-center space-x-4">
              <label>
                <input type="radio" name="units" value="metric" className="mr-2" defaultChecked />
                Metric (e.g., hectares, kg)
              </label>
              <label>
                <input type="radio" name="units" value="imperial" className="mr-2" />
                Imperial (e.g., acres, lbs)
              </label>
            </div>
          </div>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            type="button"
          >
            Save Farm Settings
          </button>
        </div>

        {/* Notification Settings */}
        <div className="mt-6 border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Notification Settings</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Alert Preferences:
            </label>
            <div>
              <label className="inline-flex items-center mr-4">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" defaultChecked />
                <span className="ml-2 text-gray-700">Pest & Disease Warnings</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" />
                <span className="ml-2 text-gray-700">Critical Weather Updates</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" defaultChecked />
                <span className="ml-2 text-gray-700">Task Reminders</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Receive Notifications Via:
            </label>
            <div className="flex items-center space-x-4">
              <label>
                <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600 mr-2" defaultChecked />
                <span className="text-gray-700">Email</span>
              </label>
              <label>
                <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600 mr-2" />
                <span className="text-gray-700">In-App</span>
              </label>
            </div>
          </div>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            type="button"
          >
            Save Notification Settings
          </button>
        </div>

        {/* Display Preferences */}
        <div className="mt-6 border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Display Preferences</h2>
          <div className="mb-4 flex items-center space-x-4">
            <label className="block text-gray-700 text-sm font-bold">
              Theme:
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-green-600"
                name="theme"
                value="light"
                checked={theme === 'light'}
                onChange={handleThemeChange}
              />
              <span className="ml-2 text-gray-700">Light</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-green-600"
                name="theme"
                value="dark"
                checked={theme === 'dark'}
                onChange={handleThemeChange}
              />
              <span className="ml-2 text-gray-700">Dark</span>
            </label>
          </div>
          {/* Language selection can be added here later */}
        </div>

        {/* Data Export */}
        <div className="mt-6 border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Data Export</h2>
          <p className="text-gray-700 mb-4">
            Export your AgriYield data for offline analysis or record-keeping.
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => {
              // In a real application, this would trigger the data export process
              alert('Data export functionality will be implemented here.');
            }}
          >
            Export Data (CSV)
          </button>
          {/* You could add options for different export formats later */}
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;