import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

interface MonthlyPlantingCounts {
    [month: string]: number;
}

interface PlantingDateTrendData {
    [year: number]: MonthlyPlantingCounts;
}

interface PlantingDateTrendChartProps {
    trendData: PlantingDateTrendData;
}

function PlantingDateTrendChart({ trendData }: PlantingDateTrendChartProps) {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);
    const years = Object.keys(trendData).map(Number).sort();
    const allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                const datasets = years.map(year => ({
                    label: year.toString(),
                    data: allMonths.map(month => trendData[year]?.[month] || 0),
                    backgroundColor: getRandomColor(0.6),
                    borderColor: getRandomColor(1),
                    borderWidth: 1,
                }));

                chartInstance.current = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: allMonths,
                        datasets: datasets,
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Number of Plantings',
                                }
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: 'Month',
                                }
                            }
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Planting Date Trends by Month',
                                font: {
                                    size: 16
                                }
                            }
                        }
                    },
                });
            }
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [trendData]);

    // Simple helper function to generate random colors
    const getRandomColor = (alpha: number) => {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    return <canvas ref={chartRef} />;
}

export default PlantingDateTrendChart;