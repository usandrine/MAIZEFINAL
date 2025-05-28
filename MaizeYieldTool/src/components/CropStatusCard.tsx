import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';

function CropStatusCard() {
    const currentGrowthStage = 'Vegetative Stage (V8)';
    const plantingDate = '2025-03-20';
    const estimatedHarvestDate = '2025-08-05';
    const daysSincePlanting = Math.floor((Date.now() - new Date(plantingDate).getTime()) / (1000 * 60 * 60 * 24));

    return (
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
                <FontAwesomeIcon icon={faSeedling} className="mr-2 text-green-500" /> Maize Crop Status
            </h2>
            <div className="mb-2 flex items-center">
                <FontAwesomeIcon icon={faSeedling} className="mr-2 text-yellow-500" />
                <span className="font-semibold text-gray-700">Growth Stage:</span>
                <span className="ml-2 text-gray-600">{currentGrowthStage}</span>
            </div>
            <div className="mb-2 flex items-center">
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-blue-500" />
                <span className="font-semibold text-gray-700">Planting Date:</span>
                <span className="ml-2 text-gray-600">{plantingDate}</span>
            </div>
            <div className="mb-2 flex items-center">
                <FontAwesomeIcon icon={faClock} className="mr-2 text-orange-500" />
                <span className="font-semibold text-gray-700">Days Since Planting:</span>
                <span className="ml-2 text-gray-600">{daysSincePlanting}</span>
            </div>
            <div className="flex items-center">
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-blue-500" />
                <span className="font-semibold text-gray-700">Estimated Harvest:</span>
                <span className="ml-2 text-gray-600">{estimatedHarvestDate}</span>
            </div>
        </div>
    );
}

export default CropStatusCard;