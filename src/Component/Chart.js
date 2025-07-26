import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HistoricalChart } from '../Api'; // Assuming this is your API helper
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

// Import necessary components from Chart.js and register them
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

// Register required components for Chart.js (added Filler for area fill)
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Chart = () => {
  const currency = useSelector((store) => store.currency.currency);
  const [arr, setArr] = useState([]); // Renamed for consistency
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(true); // Added for better UX
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(HistoricalChart(id, days, currency));
        setArr(response.data.prices);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [days, currency, id]);

  const currencySymbol = currency === 'usd' ? '$' : '₹';

  return (
    <div className="w-[97vw] lg:w-[73vw] flex flex-col gap-[2vh] pb-9 lg:pb-0 p-3 lg:pt-[5vh] text-[#FAF0E6] bg-gray-800/50 rounded-lg shadow-lg">
      {loading ? (
        <div className="flex justify-center items-center h-[50vh] text-white">
          Loading chart...
        </div>
      ) : (
        <div className="h-[50vh] lg:h-[60vh]"> {/* Constrained height for better layout */}
          <Line
            data={{
              labels: arr?.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: arr?.map((coin) => coin[1]),
                  label: `Price (Past ${days} ${days === 1 ? 'Day' : 'Days'}) in ${currencySymbol}`,
                  borderColor: '#87CEEB', // Skyblue border
                  backgroundColor: (context) => {
                    // Gradient fill for beauty
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, 'rgba(135, 206, 235, 0.4)'); // Semi-transparent skyblue
                    gradient.addColorStop(1, 'rgba(135, 206, 235, 0)'); // Fade to transparent
                    return gradient;
                  },
                  fill: true, // Enable area fill
                  tension: 0.4, // Smoother curves
                  pointRadius: 3, // Slightly larger points for visibility
                  pointBackgroundColor: '#fff', // White points for contrast
                  pointBorderColor: '#87CEEB',
                  pointHoverRadius: 5, // Grow on hover
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              interaction: {
                mode: 'index',
                intersect: false,
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Time',
                    color: '#FAF0E6',
                    font: { size: 14, weight: 'bold' },
                  },
                  grid: {
                    color: 'rgba(255, 255, 255, 0.1)', // Light grid lines
                  },
                  ticks: {
                    color: '#FAF0E6',
                    autoSkip: true,
                    maxTicksLimit: 10,
                    font: { size: 12 },
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: `Price in ${currencySymbol}`,
                    color: '#FAF0E6',
                    font: { size: 14, weight: 'bold' },
                  },
                  grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                  },
                  ticks: {
                    color: '#FAF0E6',
                    beginAtZero: false,
                    callback: (value) => `${currencySymbol}${value.toLocaleString()}`, // Format with currency and commas
                    font: { size: 12 },
                  },
                },
              },
              plugins: {
                legend: {
                  display: true,
                  position: 'top',
                  labels: {
                    color: '#FAF0E6',
                    font: { size: 12 },
                    boxWidth: 20,
                  },
                },
                tooltip: {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  cornerRadius: 8,
                  borderColor: '#87CEEB',
                  borderWidth: 1,
                  titleColor: '#FAF0E6',
                  bodyColor: '#FAF0E6',
                  callbacks: {
                    label: (context) => `${currencySymbol}${context.parsed.y.toLocaleString()}`, // Formatted tooltip
                  },
                },
              },
              animation: {
                duration: 1500, // Smooth animation duration
                easing: 'easeInOutQuart', // Easing function for elegance
              },
              elements: {
                line: {
                  borderWidth: 2, // Thicker line for visibility
                },
              },
            }}
          />
        </div>
      )}
      <div className="flex gap-[4vw] justify-evenly text-xs md:text-base mt-4">
        {[1, 30, 90, 365].map((day) => (
          <button
            key={day}
            className={`h-[35px] w-[15vw] rounded-md transition-all duration-300 ${
              days === day
                ? 'bg-[#87CEEB] text-black shadow-md'
                : 'bg-gray-700 text-white hover:bg-[#87CEEB] hover:text-black hover:shadow-md'
            }`}
            onClick={() => setDays(day)}
          >
            {day === 1 ? '24 Hours' : day === 30 ? '30 Days' : day === 90 ? '3 Months' : '1 Year'}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Chart;
