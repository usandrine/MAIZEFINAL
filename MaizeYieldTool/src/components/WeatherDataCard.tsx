import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCloudSunRain,
    faThermometerHalf,
    faCloud,
    faSun,
    faCloudSun,
    faTint,
    faWind,
    faUmbrella,
} from '@fortawesome/free-solid-svg-icons';

const getWeatherConditionIcon = (condition: string) => {
    const lowerCaseCondition = condition.toLowerCase();
    if (lowerCaseCondition.includes('cloud')) {
        if (lowerCaseCondition.includes('sun')) {
            return faCloudSun;
        }
        return faCloud;
    } else if (lowerCaseCondition.includes('sun')) {
        return faSun;
    } else if (lowerCaseCondition.includes('rain')) {
        return faUmbrella;
    }
    return faSun; // Default to sun if no match
};

const maizeWeatherData = {
    current: { temperature: '29°C', conditions: 'Partly Cloudy', humidity: '75%', wind: '12 km/h' },
    forecast: [
        { day: 'Tue', high: '32°C', low: '20°C', conditions: 'Sunny', rain: '0 mm' },
        { day: 'Wed', high: '33°C', low: '21°C', conditions: 'Partly Cloudy', rain: '1 mm' },
        { day: 'Thu', high: '31°C', low: '19°C', conditions: 'Mostly Sunny', rain: '0 mm' },
    ],
    maizeSpecificAdvice: 'Consider irrigating in the next 2-3 days if no significant rainfall occurs to support maize growth during the current vegetative stage.',
};

function WeatherDataCard() {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
            <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
                <FontAwesomeIcon icon={faCloudSunRain} className="mr-2 text-green-500" /> Maize Weather Data
            </h2>
            <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Current Conditions</h3>
                <p className="text-gray-600 mb-1 flex items-center">
                    <FontAwesomeIcon icon={faThermometerHalf} className="mr-2 text-red-500" />
                    <span className="font-semibold">Temperature:</span> {maizeWeatherData.current.temperature}
                </p>
                <p className="text-gray-600 mb-1 flex items-center">
                    <FontAwesomeIcon icon={getWeatherConditionIcon(maizeWeatherData.current.conditions)} className="mr-2 text-blue-500" />
                    <span className="font-semibold">Conditions:</span> {maizeWeatherData.current.conditions}
                </p>
                <p className="text-gray-600 mb-1 flex items-center">
                    <FontAwesomeIcon icon={faTint} className="mr-2 text-blue-300" />
                    <span className="font-semibold">Humidity:</span> {maizeWeatherData.current.humidity}
                </p>
                <p className="text-gray-600 flex items-center">
                    <FontAwesomeIcon icon={faWind} className="mr-2 text-gray-400" />
                    <span className="font-semibold">Wind:</span> {maizeWeatherData.current.wind}
                </p>
            </div>
            <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Forecast</h3>
                <ul>
                    {maizeWeatherData.forecast.map((day, index) => (
                        <li key={index} className="text-gray-600 flex items-center">
                            <span className="font-semibold">{day.day}:</span>
                            <FontAwesomeIcon icon={getWeatherConditionIcon(day.conditions)} className="ml-2 mr-1 text-blue-500" />
                            High {day.high}°C, Low {day.low}°C,
                            {day.rain > 0 && (
                                <span className="ml-1 flex items-center">
                                    <FontAwesomeIcon icon={faUmbrella} className="mr-1 text-blue-500" />
                                    Rain: {day.rain} mm
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            {maizeWeatherData.maizeSpecificAdvice && (
                <div className="mt-4 p-3 bg-yellow-100 rounded-md text-sm text-yellow-700">
                    <span className="font-semibold">Maize Advice:</span> {maizeWeatherData.maizeSpecificAdvice}
                </div>
            )}
        </div>
    );
}

export default WeatherDataCard;