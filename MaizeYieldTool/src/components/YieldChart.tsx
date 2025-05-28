import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

interface YieldData {
    year: number;
    totalYield: string;
}

interface YieldChartProps {
    yieldData: YieldData[];
}

function YieldChart({ yieldData }: YieldChartProps) {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy(); // Destroy the previous chart instance if it exists
            }

            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                chartInstance.current = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: yieldData.map(data => data.year.toString()),
                        datasets: [{
                            label: 'Total Yield (tons/hectare)',
                            data: yieldData.map(data => parseFloat(data.totalYield)),
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        }],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Total Yield (tons/hectare)',
                                }
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: 'Year',
                                }
                            }
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                    },
                });
            }
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [yieldData]);

    return <canvas ref={chartRef} />;
}

export default YieldChart;