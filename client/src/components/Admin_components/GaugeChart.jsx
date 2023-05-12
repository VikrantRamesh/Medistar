import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";

const GaugeChart = ({ malePercent, femalePercent, otherPercent, theme }) => {

  const [data, setData] = useState({
    datasets: [
      {
        data: [75, 25,0],
        backgroundColor: ["#06b6d4", "#ec4899", "#4338ca"],
        borderWidth: 0,
      },
    ],
  });
  
  const [options, setOptions] = useState({
    cutout: '70%',
    rotation: 270,
    circumference: 180,
    plugins: {
      tooltip: {
        enabled: false,
      }
    },
    legend: {
      display: false,
    },
    maintainAspectRatio:false,
  });



  return (
    <div>
        <div  className="mx-auto h-40 w-48">
            <Doughnut
            data={data}
            options={options}
            width={10} 
            height={10} 
            
            />
            
        </div>
        <div className="flex justify-center">
                <div className="bg-cyan-500 w-4 h-4 rounded-full mx-2"></div>
                <div className="text-cyan-500 font-semibold text-sm mr-5">{Math.round(malePercent * 100)}% Male</div>
                <div className="bg-pink-500 w-4 h-4 rounded-full mx-1"></div>
                <div className="text-pink-500 font-semibold text-sm mr-5">{Math.round(femalePercent * 100)}% Female</div>
                <div className="bg-indigo-500 w-4 h-4 rounded-full mx-1"></div>
                <div className="text-indigo-500 font-semibold text-sm">{Math.round(otherPercent * 100)}% Others</div>
        </div>
    </div>
  );
};

export default GaugeChart;