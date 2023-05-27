import React, { useEffect, useRef, useState } from 'react';
import {Line} from 'react-chartjs-2';


const currentDate = new Date().toISOString().slice(0, 10);
function HealthGraph({theme, selectedDate}) {
  const [dates, setDates] = useState({[currentDate]:14});
  const [labels, setLabels] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  const [selectedPoint, SetSelectedPoint] = useState(17);
  

  useEffect(()=>{
    const currentDate = new Date();
    const oneWeekAgo = new Date(currentDate.getTime() - 2 * 7 * 24 * 60 * 60 * 1000);

    const label = [];

    const tomorrow = new Date(currentDate);
    tomorrow.setDate(tomorrow.getDate() + 1);


    for (let date = oneWeekAgo; date <= tomorrow; date.setDate(date.getDate() + 1)) {
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'short' });
      label.push(`${day} ${month}`);
    }  

    setLabels(label);
  }, []);

  useEffect(()=>{
    const currentDate1 = new Date();
    const oneWeekAgo1 = new Date(currentDate1.getTime() - 2 * 7 * 24 * 60 * 60 * 1000);
    const date = {};
    let i = 0;

    for (let d = oneWeekAgo1; d <= currentDate1; d.setDate(d.getDate() + 1)) {
      date[d.toISOString().slice(0, 10)] = (i); 
      i=i+1;
    }
    setDates(date);
    console.log(date);
  }, []);



  useEffect(()=>{
      SetSelectedPoint(dates[selectedDate]);
  }, [selectedDate]);

  const labelColor = theme === "light" ? "#000" : "#fff";
  const graphColor = theme === "light" ? "#122d5c" : "#33F6CF";
  const graphBg = theme === "light" ? "rgba(191, 208, 243, 0.8)" : "rgba(51, 246, 207, 0.23)";
  const lineclr = theme === "light" ? "#122d5c" : "#33F6CF";

  const data = {
      labels: labels,
      datasets: [
        {
          tension:0.4,
          label: 'Physical Health',
          data: [70, 75, 90 , 85, 50, 95, 56, 78, 60, 86, 43, 53, 30, 43, 82,, 20],
          backgroundColor: graphBg,
          borderColor: graphColor,
          borderWidth: 1,
          pointRadius: (context) => {
            // Set the point radius to 0 for all terms except the selected one
            return context.dataIndex === selectedPoint ? 5 : 0;
          },
          pointBackgroundColor: graphColor,
          pointBorderColor: graphColor,
          fill: 'origin',
          z: 20,
          
        },
      ],
  }

  const options = { 
      responsive: true,
      animation: {
        duration: 500,
        easing: 'easeOutQuart'
      },
      maintainAspectRatio: false,
      plugins:{
        legend: {
          labels:{
              boxHeight:0,
              boxWidth:0,
              color: labelColor
          },
          display: true,
        },
      },
      scales: {
        x: {
            grid: {
              z: 10,
              drawTicks: false,
              color: (context) =>
                context.tick.value === selectedPoint ? lineclr : 'rgba(0, 0, 0, 0)', // Customize the color based on the tick value
              drawBorder: false,
              borderDash: (context) =>
                context.tick.value === selectedPoint ? [4, 4] : [4, 4], // Customize the border dash pattern
            },
            ticks:{
                color: labelColor,
            },
        },
        y: {
          
            grid:{
              display:true,
            },
            ticks: {
                beginAtZero: true,
                stepSize: 20,
                color: labelColor,
                display:false,
            },
        },
    },
  };

  return (
    <div className="h-56 w-full mx-auto mb-16 mt-12">
      <Line data={data} options={options}/>
    </div>  
  );
}

export default HealthGraph;