import React from 'react';
import { Link } from 'react-router-dom';
import { mockHarvestingRecords } from '../pages/PlantingHarvestingRecordsPage';
import { mockInputRecords } from '../pages/InputManagementPage';
import { mockPlantingRecords } from '../pages/PlantingHarvestingRecordsPage';
import YieldChart from '../components/YieldChart';
import InputUsageChart from '../components/InputUsageChart';
import PlantingDateTrendChart from '../components/PlantingDateTrendChart';

function ReportsAnalyticsPage() {
    const currentYear = new Date().getFullYear();
    const lastThreeYears = [currentYear - 1, currentYear - 2, currentYear - 3];

    const yieldSummary = lastThreeYears.map(year => {
        const recordsForYear = mockHarvestingRecords.filter(record => new Date(record.harvestingDate).getFullYear() === year);
        const totalYield = recordsForYear.reduce((sum, record) => parseFloat(record.yield.split(' ')[0]), 0);
        return { year, totalYield: totalYield.toFixed(2) };
    });

    const currentYearInputs = mockInputRecords.filter(record => new Date(record.date).getFullYear() === currentYear);
    const inputUsageSummary = currentYearInputs.reduce((summary, record) => {
        const { inputType, quantity, quantityUnit } = record;
        const existingInput = summary.find(item => item.inputType === inputType);
        if (existingInput) {
            existingInput.totalQuantity += parseFloat(quantity);
        } else {
            summary.push({ inputType, totalQuantity: parseFloat(quantity), unit: quantityUnit });
        }
        return summary;
    }, []);

    const totalInputCost = currentYearInputs.reduce((total, record) => {
        const quantity = parseFloat(record.quantity);
        const unitCost = parseFloat(record.unitCost);
        return total + (quantity * unitCost);
    }, 0).toFixed(2);

    const plantingDateTrends = lastThreeYears.reduce((trends, year) => {
        const plantingsInYear = mockPlantingRecords.filter(record => new Date(record.plantingDate).getFullYear() === year);
        const monthlyCounts: { [month: string]: number } = {};
        plantingsInYear.forEach(record => {
            const month = new Date(record.plantingDate).toLocaleString('default', { month: 'long' });
            monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
        });
        trends[year] = monthlyCounts;
        return trends;
    }, {});

    // Calculate average yield per field
    const yieldsByField = mockHarvestingRecords.reduce((acc, record) => {
        const field = record.field;
        const yieldValue = parseFloat(record.yield.split(' ')[0]);
        if (acc[field]) {
            acc[field].push(yieldValue);
        } else {
            acc[field] = [yieldValue];
        }
        return acc;
    }, {});

    const averageYieldsByField = Object.keys(yieldsByField).map(field => {
        const yields = yieldsByField[field];
        const average = yields.reduce((sum, yieldValue) => sum + yieldValue, 0) / yields.length;
        return { field, averageYield: average.toFixed(2) };
    });

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <Link to="/dashboard" className="text-green-600 hover:underline mb-4 block">
                ← Back to Dashboard
            </Link>
            <h1 className="text-2xl font-semibold text-gray-700 mb-6">Reports & Analytics</h1>

            {/* Yield Summary Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Yield Summary (Last 3 Years)</h2>
                {yieldSummary.length > 0 ? (
                    <>
                        <div className="mb-4">
                            <YieldChart yieldData={yieldSummary} />
                        </div>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2 text-left">Year</th>
                                    <th className="py-2 text-left">Total Yield (tons/hectare)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {yieldSummary.map(item => (
                                    <tr key={item.year} className="border-b last:border-b-0">
                                        <td className="py-2">{item.year}</td>
                                        <td className="py-2">{item.totalYield}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <p className="text-gray-500">No yield data available for the last 3 years.</p>
                )}
            </div>

            {/* Input Usage Report Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Input Usage Report ({currentYear})</h2>
                {inputUsageSummary.length > 0 ? (
                    <>
                        <div className="mb-4">
                            <InputUsageChart usageData={inputUsageSummary} />
                        </div>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2 text-left">Input Type</th>
                                    <th className="py-2 text-left">Total Quantity Used</th>
                                    <th className="py-2 text-left">Unit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inputUsageSummary.map((item, index) => (
                                    <tr key={index} className="border-b last:border-b-0">
                                        <td className="py-2">{item.inputType}</td>
                                        <td className="py-2">{item.totalQuantity}</td>
                                        <td className="py-2">{item.unit}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <p className="text-gray-500">No input usage data available for {currentYear}.</p>
                )}
            </div>

            {/* Planting Date Trends Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Planting Date Trends (Last 3 Years)</h2>
                {Object.keys(plantingDateTrends).length > 0 ? (
                    <div className="mb-4">
                        <PlantingDateTrendChart trendData={plantingDateTrends} />
                    </div>
                ) : (
                    <p className="text-gray-500">No planting data available for the last 3 years.</p>
                )}
            </div>

            {/* Total Input Cost Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Total Input Cost ({currentYear})</h2>
                <p className="text-xl text-green-600 font-semibold">
                    ${totalInputCost}
                </p>
                {currentYearInputs.length === 0 && (
                    <p className="text-gray-500 mt-2">No input records found for {currentYear} to calculate the cost.</p>
                )}
            </div>

            {/* Average Yield per Field Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Average Yield per Field</h2>
                {averageYieldsByField.length > 0 ? (
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2 text-left">Field</th>
                                <th className="py-2 text-left">Average Yield (tons/hectare)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {averageYieldsByField.map(item => (
                                <tr key={item.field} className="border-b last:border-b-0">
                                    <td className="py-2">{item.field}</td>
                                    <td className="py-2">{item.averageYield}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">No harvesting data available to calculate average yield per field.</p>
                )}
            </div>

            {/* Add more report sections as needed */}
        </div>
    );
}

export default ReportsAnalyticsPage;