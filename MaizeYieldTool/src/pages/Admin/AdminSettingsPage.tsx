import React, { useState } from 'react';

function AdminSettingsPage() {
    const [appName, setAppName] = useState('AgriYield Tool');
    const [defaultLanguage, setDefaultLanguage] = useState('en');
    const [registrationEnabled, setRegistrationEnabled] = useState(true);
    const [defaultNotificationMethod, setDefaultNotificationMethod] = useState('email');
    const [aiModel, setAiModel] = useState('default');
    const [iotIntegrationEnabled, setIotIntegrationEnabled] = useState(false);
    const [weatherApiKey, setWeatherApiKey] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = event.target;
        switch (name) {
            case 'appName':
                setAppName(value);
                break;
            case 'defaultLanguage':
                setDefaultLanguage(value);
                break;
            case 'registrationEnabled':
                setRegistrationEnabled(checked);
                break;
            case 'defaultNotificationMethod':
                setDefaultNotificationMethod(value);
                break;
            case 'aiModel':
                setAiModel(value);
                break;
            case 'iotIntegrationEnabled':
                setIotIntegrationEnabled(checked);
                break;
            case 'weatherApiKey':
                setWeatherApiKey(value);
                break;
            default:
                break;
        }
    };

    const handleSaveSettings = (section: string) => {
        console.log(`Saving ${section} settings...`);
        // In a real application, you would send the relevant state to your backend
        if (section === 'general') {
            console.log('App Name:', appName, 'Language:', defaultLanguage);
        } else if (section === 'user') {
            console.log('Registration Enabled:', registrationEnabled);
        } else if (section === 'notifications') {
            console.log('Default Notification:', defaultNotificationMethod);
        } else if (section === 'ai') {
            console.log('AI Model:', aiModel);
        } else if (section === 'iot') {
            console.log('IoT Enabled:', iotIntegrationEnabled, 'API Key:', weatherApiKey);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="bg-white rounded-md shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">System Settings</h2>

                <div className="space-y-6">
                    {/* General Settings Section */}
                    <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">General Settings</h3>
                        <p className="text-gray-600 mb-4">Configure basic application settings.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="appName" className="block text-gray-700 text-sm font-bold mb-2">Application Name:</label>
                                <input type="text" id="appName" name="appName" value={appName} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div>
                                <label htmlFor="defaultLanguage" className="block text-gray-700 text-sm font-bold mb-2">Default Language:</label>
                                <select id="defaultLanguage" name="defaultLanguage" value={defaultLanguage} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    <option value="en">English</option>
                                    <option value="fr">French</option>
                                    <option value="rw">Kinyarwanda</option>
                                    {/* Add more language options */}
                                </select>
                            </div>
                            {/* Add more general settings fields if needed */}
                        </div>
                        <button onClick={() => handleSaveSettings('general')} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-4">
                            Save General Settings
                        </button>
                    </div>

                    {/* User Management Settings Section */}
                    <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">User Management Settings</h3>
                        <p className="text-gray-600 mb-4">Configure settings related to user accounts and permissions.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="registrationEnabled" className="inline-flex items-center">
                                    <input type="checkbox" id="registrationEnabled" name="registrationEnabled" checked={registrationEnabled} onChange={handleInputChange} className="form-checkbox h-5 w-5 text-green-600 rounded focus:ring-indigo-500" />
                                    <span className="ml-2 text-gray-700 text-sm">Enable User Registration</span>
                                </label>
                            </div>
                            {/* Add more user management settings fields */}
                        </div>
                        <button onClick={() => handleSaveSettings('user')} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-4">
                            Save User Settings
                        </button>
                    </div>

                    {/* Notification Settings Section */}
                    <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Notification Settings</h3>
                        <p className="text-gray-600 mb-4">Configure how system notifications are handled.</p>
                        <div>
                            <label htmlFor="defaultNotificationMethod" className="block text-gray-700 text-sm font-bold mb-2">Default Notification Method:</label>
                            <select id="defaultNotificationMethod" name="defaultNotificationMethod" value={defaultNotificationMethod} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option value="email">Email</option>
                                <option value="sms">SMS</option>
                                <option value="in-app">In-App</option>
                            </select>
                        </div>
                        <button onClick={() => handleSaveSettings('notifications')} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-4">
                            Save Notification Settings
                        </button>
                    </div>

                    {/* AI Configurations Section */}
                    <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">AI Configurations</h3>
                        <p className="text-gray-600 mb-4">Configure settings related to AI integration.</p>
                        <div>
                            <label htmlFor="aiModel" className="block text-gray-700 text-sm font-bold mb-2">Default AI Model:</label>
                            <select id="aiModel" name="aiModel" value={aiModel} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option value="default">Default Model</option>
                                <option value="advanced">Advanced Model</option>
                                <option value="custom">Custom Model</option>
                                {/* Add more AI model options */}
                            </select>
                        </div>
                        <button onClick={() => handleSaveSettings('ai')} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-4">
                            Save AI Settings
                        </button>
                    </div>

                    {/* IoT Configurations Section */}
                    <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">IoT Configurations</h3>
                        <p className="text-gray-600 mb-4">Configure settings for IoT device integration.</p>
                        <div>
                            <label htmlFor="iotIntegrationEnabled" className="inline-flex items-center">
                                <input type="checkbox" id="iotIntegrationEnabled" name="iotIntegrationEnabled" checked={iotIntegrationEnabled} onChange={handleInputChange} className="form-checkbox h-5 w-5 text-green-600 rounded focus:ring-indigo-500" />
                                <span className="ml-2 text-gray-700 text-sm">Enable IoT Integration</span>
                            </label>
                        </div>
                        <div>
                            <label htmlFor="weatherApiKey" className="block text-gray-700 text-sm font-bold mb-2">Weather API Key:</label>
                            <input type="text" id="weatherApiKey" name="weatherApiKey" value={weatherApiKey} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter API Key" />
                        </div>
                        <button onClick={() => handleSaveSettings('iot')} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-4">
                            Save IoT Settings
                        </button>
                    </div>

                    {/* Add more settings sections as needed */}

                </div>
            </div>
        </div>
    );
}

export default AdminSettingsPage;