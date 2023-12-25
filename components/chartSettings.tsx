import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";

import React from "react";

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const buildData = ({ chartData }: { chartData: any }) => ({
  labels: chartData.labels,
  datasets: [
    {
      label: "",
      data: chartData.data,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      borderColor: "rgba(255, 255, 255, 1)",
      pointBackgroundColor: "rgba(255, 255, 255, 1)",
      fill: "start",
      tension: 0.4,
    },
  ],
});

const options = {
  plugins: {
    legend: {
      display: true,
    },
  },
  scales: {
    yAxes: {
      ticks: {
        color: "rgba(255, 255, 255, 1)",
      },
      grid: {
        display: false,
        drawBorder: false,
      },
    },

    xAxes: {
      ticks: {
        color: "rgba(255, 255, 255, 1)",
      },
      grid: {
        circular: true,
        borderColor: "rgba(255, 255, 255, .2)",
        color: "rgba(255, 255, 255, .2)",
        borderDash: [5, 5],
      },
    },
  },
  layout: {
    padding: {
      right: 15,
      left: 15,
      top: 20,
      bottom: 10,
    },
  },
};

const StockChart = ({ info, color }: { info: any; color: string }) => {
  const data = buildData(info);

  return (
    <>
      <div
        className={`flex rounded min-h-max min-w-full md:w-1/2 ${color} text-white items-center`}
      >
        <Line data={data} options={options} />
      </div>
    </>
  );
};

export default StockChart;
