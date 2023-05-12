import {React,useState} from 'react';
import { Bar } from 'react-chartjs-2';



function useSelectValue(initialValue) {
    const [value, setValue] = useState(initialValue);
    const handleChange = (event) => setValue(event.target.value);
    const hasValue = value !== '';
    return [value, handleChange, hasValue];
  }

function BarGraph({disease_data, theme}) {
const [selectedValue, handleSelectChange, hasValue] = useSelectValue('');

const labelColor = theme === "light" ? "#000" : "#fff";

const chartData = Object.keys(disease_data).map((label) => ({
    label,
    value: disease_data[label],
  }));
  
  console.log(chartData.map((slice) => slice.value));
const data = {
    labels: chartData.map((slice) => slice.label),
    datasets: [
      {
        label: 'Number of people infected',
        data: chartData.map((slice) => slice.value),
        backgroundColor: '#00b0ff',
        borderWidth: 2,
        borderRadius: 10,
        borderSkipped: false,
        
      },
    ],
  };

return (
    <div className="relative h-80 my-10">
        <div className="absolute inset-0  blur opacity-50 rounded-lg"></div>
        <Bar
            data={data}
            options={{
                    maintainAspectRatio: false,
                    responsive: true,
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                  beginAtZero: true,
                                  stepSize: 20
                                }
                              },
                        ],
                        x: {
                            grid: {
                                display: false,
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
                    plugins: {
                        legend: {
                            color:labelColor,
                            display: true,
                            labels:{
                                boxHeight:10,
                                boxWidth:10,
                                fontColor:labelColor,
                            },
                        },
                        cornerRadius: 10,
                        // tooltips: {
                        //     enabled: true,
                        // },
                        // hover: {
                        //     mode: 'nearest',
                        //     intersect: true,
                        // },
                        // animation: {
                        //     duration: 1500,
                        //     easing: 'easeOutQuart',

                        // },
                    },
                    
                    color:labelColor,
            }}
        />
        {hasValue && (
            <div className="absolute top-2 left-2 text-gray-100">
            Selected value: {selectedValue}
            </div>
        )}
    </div>
);
}

  export default BarGraph;
