import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  TimeScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js/auto";
import { timedata } from "./timedata";
import { useEffect } from "react";

export const TimeGraph = ({ regionId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [timeGraphData, setTimeGraphData] = useState([{}]);

  const [form, setForm] = useState({
    regionId: regionId,
  });

  useEffect(() => {
    const fetchMetroInfo = async () => {
      console.log("IN GRAPH:", form.regionId);

      const form_data = new FormData();
      form_data.append("regionId", form.regionId);
      console.log("FORM", form_data.entries(0));

      const timegraphLink =
        //"https://budsfamco-0d4d5b3cb466.herokuapp.com/timegraph";
        "https://budsfamco-0d4d5b3cb466.herokuapp.com/timegraph";
      const timegraphResponse = await fetch(timegraphLink, {
        method: "POST",
        body: form_data,
      });

      console.log("REPONSE", timegraphResponse);

      if (!timegraphResponse.ok) {
        throw new Error("something went wrong!");
      }
      const timegraphJSON = await timegraphResponse.json();
      console.log("JSON", timegraphJSON);
      const loadedData = [];

      for (const key in timegraphJSON) {
        loadedData.push({
          date: timegraphJSON[key].date,
          price: timegraphJSON[key].price,
        });
      }

      setTimeGraphData(loadedData);

      setGraphData({
        labels: loadedData.map((loadedData) => loadedData.date),
        datasets: [
          {
            //label: "Projected Market Directions",
            data: loadedData.map((loadedData) => loadedData.price),
            backgroundColor: ["blue"],
          },
        ],
      });
    };
    fetchMetroInfo().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [form]);

  useEffect(() => {
    setForm((form) => ({ ...form, regionId: regionId }));
  }, [regionId]);
  //const data = ;

  const option = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 2,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "House Prices Over Time",
      },
    },
  };
  const [graphData, setGraphData] = useState({
    labels: timeGraphData.map((timeGraphData) => timeGraphData.date),
    datasets: [
      {
        //label: "Projected Market Directions",
        data: timeGraphData.map((timeGraphData) => timeGraphData.price),
        backgroundColor: ["blue"],
      },
    ],
  });
  //console.log(graphData);

  //above is just test data. make sure this component takes data
  return (
    <div>
      <Line data={graphData} options={option} />
    </div>
  );
};
