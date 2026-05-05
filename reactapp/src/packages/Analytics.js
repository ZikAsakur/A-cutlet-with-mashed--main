import React from 'react';
import './Analytics.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';
import { API_URL } from '..';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Analytics() {
  const [data, setData] = React.useState({ popularOrg: {}, popularPerson: {} });

  React.useEffect(() => {
    axios.get(API_URL + "getMostPopularOrganizationsEvents")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const orgLabels = Object.keys(data.popularOrg || {});
  const orgValues = Object.values(data.popularOrg || {});

  const colors = ['#7168d7', '#948de1', '#aea9e8', '#8078db', '#d1cef2'];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const orgBackgroundColors = orgValues.map(() => getRandomColor());

  const orgChartData = {
    labels: orgLabels.length > 0 ? orgLabels : [], 
    datasets: [
      {
        data: orgValues,
        backgroundColor: orgBackgroundColors,
        borderWidth: 1,
      },
    ],
  };
 
  const personLabels = Object.keys(data.popularPerson || {});
  const personValues = Object.values(data.popularPerson || {});

  const personBackgroundColors = personValues.map(() => getRandomColor());

  const personChartData = {
    labels: personLabels.length > 0 ? personLabels : [],
    datasets: [
      {
        data: personValues,
        backgroundColor: personBackgroundColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, 
      },
      title: {
        display: true,
      },
    },
  };

  return (
    <div className="wrapper">
      <Header />
      <div className="main-analytics">
        {orgLabels.length > 0 || personLabels.length > 0 ? (
          <>
            {orgLabels.length > 0 && (
              <div className="block-analytics-1">
                <h2 className='h2-analytics'>города с самым большим количеством зафиксированных ивентов</h2>
                <Bar data={orgChartData} options={options} />
              </div>
            )}
            {personLabels.length > 0 && (
              <div className="block-analytics-2">
                <h2 className='h2-analytics'>города с самым большим количеством участников</h2>
                <Bar data={personChartData} options={options} />
              </div>
            )}
          </>
        ) : (
          <p>Загрузка данных...</p>
        )}
      </div>
      <Footer />
    </div>
  );
}