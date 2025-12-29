import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenerationData = async () => {
      try {
        // Use your Vercel backend URL or local proxy
        const response = await axios.get('https://localhost:3002/api/reports/generation-stats', {
          withCredentials: true 
        });

        const rawData = response.data; // Expecting an array of { month: 'Jan', value: 100 }

        setChartData({
          labels: rawData.map(item => item.month),
          datasets: [
            {
              label: 'Energy Generation (kWh)',
              data: rawData.map(item => item.value),
              fill: true,
              backgroundColor: 'rgba(59, 130, 246, 0.1)', // Light blue fill
              borderColor: 'rgba(255, 77, 0, 1)', // Solid blue line
              tension: 0.4, // Makes the line curved and "neater"
              pointRadius: 4,
              pointBackgroundColor: 'rgb(59, 130, 246)',
            },
          ],
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chart data:", error);
        setLoading(false);
      }
    };

    fetchGenerationData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Cleaner look without the legend
      },
      title: {
        display: true,
        text: 'Live Monthly Energy Generation',
        color: '#2cf519ff', // Slate-900
        font: { size: 16, weight: 'bold' }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#f1f5f9' }, // Slate-100 grid lines
      },
      x: {
        grid: { display: false } // Remove vertical grid lines for neatness
      }
    }
  };

  if (loading) {
    return <div className="h-64 flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest text-xs">Loading Live Data...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-80">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;