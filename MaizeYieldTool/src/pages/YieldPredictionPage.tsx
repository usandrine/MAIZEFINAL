import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Sample historical yield data (replace with your actual data)
const historicalYieldData = [
  { year: 2020, yield: 4.5 },
  { year: 2021, yield: 4.8 },
  { year: 2022, yield: 5.1 },
  { year: 2023, yield: 4.9 },
  { year: 2024, yield: 5.3 },
];

function YieldPredictionPage() {
  const currentYear = new Date().getFullYear();
  const predictedYield = 5.5; // Example predicted yield for the current season
  const predictionUnit = 'tons/hectare';
  const predictionDate = 'April 20, ' + currentYear;
  const targetYield = 5.8; // Example target yield
  const lastYearYield = 5.0; // Example last year's yield
  const averageYieldLast5Years = 4.9; // Example 5-year average

  const influencingFactors = [
    { factor: 'Rainfall', impact: 'Favorable rainfall in early growth stages (+8% compared to average)' },
    { factor: 'Soil Nutrients', impact: 'Optimal soil nutrient levels observed' },
    { factor: 'Pest & Disease', impact: 'Low pest and disease incidence reported' },
    { factor: 'Temperature', impact: 'Average temperature within optimal range' },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <a href="/dashboard" className="text-green-600 hover:underline mb-4 block">
          ← Back to Dashboard
        </a>
        <h1 className="text-2xl font-semibold text-green-700 mb-6">Yield Prediction</h1>

        {/* Current Yield Prediction Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Current Season Prediction ({currentYear})</h2>
          <p className="text-3xl font-bold text-green-600">{predictedYield} <span className="text-lg text-gray-600">{predictionUnit}</span></p>
          <p className="text-sm text-gray-500">Predicted on: {predictionDate}</p>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
            <div>
              <p><span className="font-semibold">Target Yield:</span> {targetYield} {predictionUnit}</p>
            </div>
            <div>
              <p><span className="font-semibold">Last Year's Yield ({currentYear - 1}):</span> {lastYearYield} {predictionUnit}</p>
            </div>
            <div>
              <p><span className="font-semibold">5-Year Average Yield:</span> {averageYieldLast5Years} {predictionUnit}</p>
            </div>
            <div>
              <p><span className="font-semibold">Projection vs. Target:</span> <span className={predictedYield >= targetYield ? 'text-green-500' : 'text-orange-500'}>{predictedYield >= targetYield ? 'Above Target' : 'Below Target'}</span></p>
            </div>
          </div>
        </div>

        {/* Historical Yield Trend Chart */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Historical Yield Trend (Last 5 Years)</h2>
          <LineChart width={600} height={300} data={historicalYieldData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis unit={predictionUnit} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="yield" stroke="#82ca9d" strokeWidth={2} />
          </LineChart>
        </div>

        {/* Key Influencing Factors */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Key Factors Influencing Current Prediction</h2>
          <ul className="list-disc list-inside text-gray-600">
            {influencingFactors.map((item, index) => (
              <li key={index}>
                <span className="font-semibold">{item.factor}:</span> {item.impact}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default YieldPredictionPage;