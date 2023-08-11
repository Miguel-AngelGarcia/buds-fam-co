import React, { useState } from "react";
import { CategoryScale, Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
export const BarChart = () => {
  const data = [{ going_up: 42, going_down: 39 }];

  const option = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Projected Market Directions",
      },
    },
  };
  const [trendData, setTrendData] = useState({
    labels: ["Markets Going Up", "Markets Going Down"],
    datasets: [
      {
        //label: "Projected Market Directions",
        data: [data[0].going_up, data[0].going_down],
        backgroundColor: ["rgb(26, 134, 55)", "rgb(148, 8, 8)"],
        borderWidth: 1,
        barPercentage: 0.5,
      },
    ],
  });

  console.log(data[0].going_up);
  //above is just test data. make sure this component takes data
  return (
    <div>
      <Bar data={trendData} options={option} />
    </div>
  );
};
