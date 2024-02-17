import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
// import { Chart as ChartJS } from 'chart.js/auto';  // Import this for v3 of Chart.js
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

function StockChart({ symbol }) {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:5000/api/stocks/${symbol}`);

      const labels = result.data.prices.map((p) => new Date(p.date).toLocaleDateString()); 
      const prices = result.data.prices.map((p) => p.close);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: `Price (${symbol})`,
            data: prices,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      });
    };

    fetchData();
  }, [symbol]);

  return (
    <div>
      <h2>... {symbol}</h2> 
      <Line data={chartData} />
    </div>
  );
}

export default StockChart;
