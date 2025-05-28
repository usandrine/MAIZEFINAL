import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faCheckCircle, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

interface Alert {
    id: number;
    type: 'error' | 'warning' | 'info' | 'success';
    message: string;
    timestamp: string;
    isDismissed: boolean;
}

function AdminAlertsPage() {
    const [alerts, setAlerts] = useState<Alert[]>([
        { id: 1, type: 'error', message: 'Database connection failed.', timestamp: '2025-04-29 10:00', isDismissed: false },
        { id: 2, type: 'warning', message: 'High server load detected.', timestamp: '2025-04-29 10:15', isDismissed: false },
        { id: 3, type: 'info', message: 'New software update available.', timestamp: '2025-04-29 10:30', isDismissed: false },
        { id: 4, type: 'success', message: 'System backup completed successfully.', timestamp: '2025-04-29 11:00', isDismissed: false },
        { id: 5, type: 'warning', message: 'Potential security vulnerability reported.', timestamp: '2025-04-29 11:30', isDismissed: true },
    ]);

    const dismissAlert = (id: number) => {
        setAlerts(prevAlerts =>
            prevAlerts.map(alert =>
                alert.id === id ? { ...alert, isDismissed: true } : alert
            )
        );
    };

    const getAlertIcon = (type: Alert['type']) => {
        switch (type) {
            case 'error':
                return faExclamationTriangle;
            case 'warning':
                return faExclamationTriangle;
            case 'info':
                return faInfoCircle;
            case 'success':
                return faCheckCircle;
            default:
                return faInfoCircle;
        }
    };

    const getAlertClassName = (type: Alert['type']) => {
        switch (type) {
            case 'error':
                return 'bg-red-100 border-red-400 text-red-700';
            case 'warning':
                return 'bg-yellow-100 border-yellow-400 text-yellow-700';
            case 'info':
                return 'bg-blue-100 border-blue-400 text-blue-700';
            case 'success':
                return 'bg-green-100 border-green-400 text-green-700';
            default:
                return 'bg-gray-100 border-gray-400 text-gray-700';
        }
    };

    const activeAlerts = alerts.filter(alert => !alert.isDismissed);
    const dismissedAlerts = alerts.filter(alert => alert.isDismissed);

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="bg-white rounded-md shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">System Alerts</h2>

                {activeAlerts.length > 0 && (
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Active Alerts</h3>
                        <ul>
                            {activeAlerts.map(alert => (
                                <li key={alert.id} className={`border-l-4 p-4 mb-2 rounded-md flex items-center justify-between ${getAlertClassName(alert.type)}`}>
                                    <div className="flex items-center">
                                        <FontAwesomeIcon icon={getAlertIcon(alert.type)} className="mr-3" />
                                        <div>
                                            <p className="font-semibold">{alert.message}</p>
                                            <p className="text-sm text-gray-500">{alert.timestamp}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => dismissAlert(alert.id)} className="text-gray-500 hover:text-gray-700">
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {dismissedAlerts.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Dismissed Alerts</h3>
                        <ul>
                            {dismissedAlerts.map(alert => (
                                <li key={alert.id} className={`border-l-4 p-4 mb-2 rounded-md bg-gray-200 text-gray-600 line-through`}>
                                    <div className="flex items-center">
                                        <FontAwesomeIcon icon={getAlertIcon(alert.type)} className="mr-3" />
                                        <div>
                                            <p className="font-semibold">{alert.message}</p>
                                            <p className="text-sm text-gray-500">{alert.timestamp}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {activeAlerts.length === 0 && dismissedAlerts.length === 0 && (
                    <p className="text-gray-600">No system alerts at this time.</p>
                )}
            </div>
        </div>
    );
}

export default AdminAlertsPage;