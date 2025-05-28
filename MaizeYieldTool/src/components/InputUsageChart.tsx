import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

interface InputUsageData {
    inputType: string;
    totalQuantity: number;
    unit: string;
}

interface InputUsageChartProps {
    usageData: InputUsageData[];
}

function InputUsageChart({ usageData }: InputUsageChartProps) {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                chartInstance.current = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: usageData.map(data => data.inputType),
                        datasets: [{
                            label: 'Total Quantity Used',
                            data: usageData.map(data => data.totalQuantity),
                            backgroundColor: 'rgba(255, 99, 132, 0.6)', // Different color
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                        }],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Total Quantity',
                                }
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: 'Input Type',
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
    }, [usageData]);

    return <canvas ref={chartRef} />;
}

export default InputUsageChart;