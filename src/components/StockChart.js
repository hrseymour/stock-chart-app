import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const API_BASE_URL = process.env.REACT_APP_HISTORY_API_BASE_URL;

async function fetchStockData(symbol) {
    const result = await axios.get(`${API_BASE_URL}/stocks/${symbol}`);
    const labels = result.data.prices.map((p) => new Date(p.date).toLocaleDateString());
    const prices = result.data.prices.map((p) => p.close);
    return { labels, prices };
}

function StockInput({ symbol, handleSymbolChange, handleChartUpdate }) {
    return (
        <div className="input-group">
            <input
                type="text"
                value={symbol}
                onChange={handleSymbolChange}
                maxLength="4"
                className="stock-input"
            />
            <button onClick={handleChartUpdate} className="chart-button">Chart</button>
        </div>
    );
}

function StockChart({ initialSymbol, chartColor }) {
    const [symbol, setSymbol] = useState(initialSymbol || '');
    const [chartData, setChartData] = useState(null);

    const handleSymbolChange = (e) => {
        setSymbol(e.target.value.toUpperCase());
    };

    const handleChartUpdate = async () => {
        if (!symbol) return;

        try {
            const { labels, prices } = await fetchStockData(symbol);

            setChartData({
                labels,
                datasets: [
                    {
                        // label: `Price (${symbol})`,
                        data: prices,
                        borderColor: chartColor,
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                    },
                ],
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="chart-container">
            <StockInput
                symbol={symbol}
                handleSymbolChange={handleSymbolChange}
                handleChartUpdate={handleChartUpdate}
            />
            {chartData && <Line data={chartData} />}
        </div>
    );
}

export default StockChart;
