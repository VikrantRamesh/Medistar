import React, { useState, useEffect } from "react";
import { Doughnut} from 'react-chartjs-2';
import { useColorMode } from "@chakra-ui/react";

const DoughnutChart = ({data, theme}) => {

    const { colorMode } = useColorMode();

      const chartData = Object.keys(data).map((label) => ({
        label,
        value: data[label],
      }));
      console.log(theme);
    const labelColor = theme === "light" ? "#000" : "#fff";
    const graphColor = theme === "light" ? "rgba(54, 162, 235, 0.2)" : "rgba(54, 162, 235, 0.8)";

    const [pieChartData, setPieChartData] = useState(
        {
            labels: chartData.map((slice) => slice.label),
            datasets: [
            {
                label: "Number of Appointments",
                data: chartData.map((slice) => slice.value),
                borderWidth: 0,
                backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#FF5733",
                "#C70039",
                "#c23a9a",
                "#006266",
                "#f1c40f",
                ],
                hoverBackgroundColor: [
                "#fab4c3",
                "#82c2ed",
                "#e0ca92",
                "#fa9b87",
                "#f0937f",
                "#d184ba",
                "#50afb3",
                "#ebd47a",
                ],
            },
            ],
        }
    );
   
   
    return( 
        <Doughnut data={pieChartData}
                    width={400} 
                    options={{
                        plugins: {
                            
                            legend: {
                                fullSize:true,
                                position:"left",
                                labels:{
                                    borderWidth: 0,
                                    boxHeight:10,
                                    boxWidth:10,
                                    borderRadius: 10,
                                    color: labelColor,

                                },
                                title:{
                                    color:"#fff",
                                },
                                display: true,
                            },
                        },
                        maintainAspectRatio: false,
                        responsive: true,
                    }}
                    />
   );
}

export default DoughnutChart;