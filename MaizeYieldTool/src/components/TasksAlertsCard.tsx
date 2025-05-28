import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faBell, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const maizeTasksAlerts = [
    { type: 'Task', description: 'Apply second dose of nitrogen fertilizer', dueDate: '2025-04-28' },
    { type: 'Alert', description: 'High risk of Fall Armyworm infestation detected', severity: 'High' },
    { type: 'Task', description: 'Check irrigation system', dueDate: '2025-05-02' },
];

function TasksAlertsCard() {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
            <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
                <FontAwesomeIcon icon={faBell} className="mr-2 text-green-500" /> Maize Tasks & Alerts
            </h2>
            <ul className="flex-1">
                {maizeTasksAlerts.length > 0 ? (
                    maizeTasksAlerts.map((item, index) => (
                        <li key={index} className={`py-2 border-b last:border-b-0 flex items-center ${item.type === 'Alert' ? 'bg-red-50 bg-opacity-50' : ''}`}>
                            <FontAwesomeIcon
                                icon={item.type === 'Task' ? faTasks : faExclamationTriangle}
                                className={`mr-3 text-${item.type === 'Task' ? 'blue-500' : 'red-500'}`}
                            />
                            <div>
                                <span className="font-semibold text-gray-700">{item.type}:</span> {item.description}
                                {item.dueDate && <span className="ml-2 text-gray-500">Due: {item.dueDate}</span>}
                                {item.severity && <span className={`ml-2 font-semibold text-${item.severity === 'High' ? 'red-500' : 'orange-500'}`}>({item.severity} Severity)</span>}
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500">No current maize tasks or alerts.</p>
                )}
            </ul>
            <Link to="/tasks-alerts" className="text-green-600 hover:underline mt-4 block text-sm">View All Maize Tasks & Alerts  {/* Placeholder link */}</Link>
        </div>
    );
}

export default TasksAlertsCard;