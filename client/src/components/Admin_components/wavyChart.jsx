import React from "react";
import { Line } from "react-chartjs-2";

function AgeChart({ageData, theme}) {
  const chartData =  Object.keys(ageData).map((label) => ({
    label,
    value: ageData[label],
  }));

  const labelColor = theme === "light" ? "#000" : "#fff";
  const graphColor = theme === "light" ? "#122d5c" : "#33F6CF";
  const graphBg = theme === "light" ? "rgba(191, 208, 243, 0.8)" : "rgba(51, 246, 207, 0.23)";

  const data = {
    labels: ["0-10", "10-20", "20-30", "30-40", "40-50" ,"50-60","60-70", "70-80", "80-90", "90-100", "100+"],
    datasets: [
      {
        label: "Number of People",
        data: chartData.map((slice) => slice.value),
        borderColor: graphColor,
        backgroundColor: graphBg,
        fill: true,
      },
    ],
  };


  

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins:{
        legend:{
            display:false,
        },
    },
    scales: {
        x: {
            grid:{
              display:true
            },
            ticks:{
                color: labelColor,
            },
        },
        y: {
            grid:{
              display:false
            },
            ticks: {
                beginAtZero: true,
                stepSize: 1,
                color: labelColor,
            },
        },
    },
    
    elements: {
        line: {
          cubicInterpolationMode: "monotone",
        },
      },
  };

  return (
    <div>
      <div className="h-48 w-96 mx-auto mb-16 mt-12">
      <h1 className="text-white font-medium text-center text-sm mt-3">AGE GROUPS</h1>
        <Line data={data} options={options} height={300} width={400}/>
        
      </div>
    </div>
  );
}

export default AgeChart;