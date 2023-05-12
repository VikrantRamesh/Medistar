import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({Linedata, theme}) =>{
    const chartData = Object.keys(Linedata).map((label) => ({
        label,
        value: Linedata[label],
      }));

    const labelColor = theme === "light" ? "#000" : "#fff";
    const graphColor = theme === "light" ? "#122d5c" : "#33F6CF";
    const graphBg = theme === "light" ? "rgba(191, 208, 243, 0.8)" : "rgba(51, 246, 207, 0.23)";

  const [lineChartData, setLineChartData]  = useState({labels: chartData.map((lbl) => lbl.label.slice(0,-3)),
                                                        datasets: [
                                                            {
                                                            label: "Number of Appointments",
                                                            data: chartData.map((slice) => slice.value),
                                                            backgroundColor: graphBg,
                                                            borderColor: graphColor,
                                                            borderWidth: "2",
                                                            fill: true,
                                                                
                                                            },
                                                            ],
                                                    });

    useEffect(()=>{
        setLineChartData({labels: chartData.map((lbl) => lbl.label.slice(0,-3)),
            datasets: [
                {
                label: "Number of Appointments",
                data: chartData.map((slice) => slice.value),
                backgroundColor: graphBg,
                borderColor:graphColor,
                borderWidth: "2",
                fill: true,
                    
                },
                ],
        })
    },[graphBg,graphColor]);                                                
    
    return(
        <Line
                data={lineChartData}
                options={{
                    plugins: {
                        legend: {
                            labels:{
                                boxHeight:0,
                                boxWidth:0,
                            },
                            display: false,
                        },
                    },
                    scales: {
                        x: {
                            grid: {
                                display: true,
                            },
                            ticks:{
                                color: labelColor,
                            }
                        },  
                        y: {
                            grid: {
                            display: false,
                            },
                            ticks: {
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
                    
                    maintainAspectRatio: false,
                    responsive: true,
                    color: "#fff",
                }}
                />
    )
}

export default LineChart;