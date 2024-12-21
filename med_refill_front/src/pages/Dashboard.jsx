import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Pie, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  PointElement,
  ArcElement,
} from 'chart.js';
import './Dashboard.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  ChartTooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [lineData, setLineData] = useState({});
  const [pieData, setPieData] = useState({});
  const [barData, setBarData] = useState({});
  const [totals, setTotals] = useState({ totalRequests: 0, totalUsers: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/refill-stats/');
        const { medication_stats, date_stats, total_requests, total_users } = response.data;

        // Set totals
        setTotals({ totalRequests: total_requests, totalUsers: total_users });

        // Pie Chart Data
        setPieData({
          labels: medication_stats.map(item => item.medication__name),
          datasets: [
            {
              data: medication_stats.map(item => item.total),
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCD56', '#4BC0C0', '#FF9F40'],
              hoverBackgroundColor: ['#FF4D6D', '#359FEF', '#FFBF3A', '#49AFB2', '#FF8B36'],
            },
          ],
        });

        // Bar Chart Data
        setBarData({
          labels: medication_stats.map(item => item.medication__name),
          datasets: [
            {
              label: 'Total Refill Requests',
              data: medication_stats.map(item => item.total),
              backgroundColor: 'rgba(136, 132, 216, 0.7)',
              borderColor: '#8884d8',
              borderWidth: 1,
            },
          ],
        });

        // Line Chart Data
        setLineData({
          labels: date_stats.map(item => item.request_date),
          datasets: [
            {
              label: 'Requests by Date',
              data: date_stats.map(item => item.total),
              borderColor: '#36A2EB',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              tension: 0.2,
              pointBorderColor: '#36A2EB',
              pointBackgroundColor: '#FFF',
              pointBorderWidth: 2,
              pointRadius: 4,
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        console.error('Failed to load statistics:', error);
        alert('Failed to load statistics!');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Refill Request Statistics</h2>
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="summary-cards">
            <div className="summary-card">
              <h3>Total Requests</h3>
              <p>{totals.totalRequests}</p>
            </div>
            <div className="summary-card">
              <h3>Total Users</h3>
              <p>{totals.totalUsers}</p>
            </div>
          </div>

          {/* Charts */}
          <div className="charts-container">
            {/* Line Chart */}
            {lineData && lineData.labels && lineData.labels.length > 0 && (
              <div className="chart-card">
                <h3 className="chart-title">Requests by Date</h3>
                <Line
                  data={lineData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: 'top' },
                      title: { display: true, text: 'Total Requests Over Time' },
                    },
                    scales: {
                      x: { title: { display: true, text: 'Date' } },
                      y: { title: { display: true, text: 'Requests' } },
                    },
                  }}
                />
              </div>
            )}

            {/* Bar Chart */}
            {barData && barData.labels && barData.labels.length > 0 && (
              <div className="chart-card">
                <h3 className="chart-title">Refill Request by Medication</h3>
                <Bar
                  data={barData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: 'top' },
                      title: { display: true, text: 'Total Refill Requests per Medication' },
                    },
                  }}
                />
              </div>
            )}

            {/* Pie Chart */}
            {pieData && pieData.labels && pieData.labels.length > 0 && (
              <div className="chart-card">
                <h3 className="chart-title">Medication Distribution</h3>
                <Pie
                  data={pieData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: 'top' },
                      title: { display: true, text: 'Distribution of Medications by Refill Requests' },
                    },
                  }}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;