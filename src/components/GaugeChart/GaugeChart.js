import React, { useState } from "react";
import { CategoryScale, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";

export const GaugeChart = () => {
  const testData = [{ accuracy: 60, remaining: 40 }];
  // setup

  const data = {
    //labels: ["Yes", "No"],
    datasets: [
      {
        //label: "Accuracy",
        data: [testData[0].accuracy, testData[0].remaining],
        backgroundColor: (context) => {
          console.log(context);
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }

          if (context.dataIndex === 0) {
            return getGradient(chart);
          } else {
            return "rgba(225,225,225, 0.8)";
          }
        },
        borderWidth: 0,
        cutout: "70%",
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  function getGradient(chart) {
    const {
      ctx,
      testData,
      chartArea: { top, bottom, left, right },
    } = chart;
    const gradientSegment = ctx.createLinearGradient(left, 0, right, 0);
    gradientSegment.addColorStop(0, "rgb(148, 8, 8)");
    gradientSegment.addColorStop(0.5, "	rgb(255, 191, 0)");
    gradientSegment.addColorStop(1, "rgb(26, 134, 55)");

    return gradientSegment;
  }

  const options = {
    aspectRatio: "2",
    plugins: {
      legend: {
        position: "top",
        test: "Test",
      },
      title: {
        display: true,
        text: "Model Accuracy Score",
      },
    },
  };

  const gaugeText = {
    id: "guageText",
    beforeDatasetDraw(chart, args, pluginOptions) {
      const {
        ctx,
        chartArea: { top, bottom, left, right, width, height },
      } = chart;

      //built-in function
      const xCenter = chart.getDatasetMeta(0).data[0].x;
      const yCenter = chart.getDatasetMeta(0).data[0].y;
      ctx.save();
      ctx.fillStyle = "grey";
      ctx.font = "bold 48px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText(`${data.datasets[0].data[0]}%`, xCenter, yCenter - 48);
    },
  };

  return (
    <div>
      <Doughnut data={data} options={options} plugins={[gaugeText]} />
    </div>
  );
};
