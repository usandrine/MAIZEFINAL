import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

const historicalMaizeYieldData = [
    { year: 2021, yield: 4.3 },
    { year: 2022, yield: 4.7 },
    { year: 2023, yield: 4.5 },
    { year: 2024, yield: 5.1 },
    { year: 2025, yield: 5.0 },
];
const yieldUnit = 'tons/hectare';

function YieldTrendChartCard() {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
            <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
                <FontAwesomeIcon icon={faChartLine} className="mr-2 text-green-500" /> Maize Yield Trend
            </h2>
            <div className="flex-1">
                <LineChart width={500} height={250} data={historicalMaizeYieldData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis unit={yieldUnit} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="yield" stroke="#a7f3d0" strokeWidth={2} name="Yield" />
                </LineChart>
            </div>
        </div>
    );
}

export default YieldTrendChartCard;