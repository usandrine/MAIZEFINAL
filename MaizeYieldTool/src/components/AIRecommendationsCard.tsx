import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';

const maizeRecommendations = [
    'Consider applying a top dressing of nitrogen fertilizer within the next week based on the current growth stage and soil analysis (if available).',
    'Monitor fields closely for signs of Fall Armyworm, especially during the early vegetative stages.',
    'Ensure adequate irrigation, particularly if the weather forecast predicts dry conditions for the next few days.',
    'Based on the yield prediction model, consider scouting specific areas of the field that show lower growth vigor.',
];

function AIRecommendationsCard() {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
            <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
                <FontAwesomeIcon icon={faLightbulb} className="mr-2 text-green-500" /> AI Recommendations for Maize
            </h2>
            <ul className="list-disc list-inside text-gray-600 flex-1">
                {maizeRecommendations.map((recommendation, index) => (
                    <li key={index}>{recommendation}</li>
                ))}
            </ul>
            {maizeRecommendations.length > 0 && (
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">
                    View All Recommendations
                </button>
            )}
        </div>
    );
}

export default AIRecommendationsCard;