import {Chart, CategoryScale, LinearScale, LineController, PointElement, LineElement} from 'chart.js';
import {useEffect, useRef, useState} from "react";
import { Line } from 'react-chartjs-2';

Chart.register(
    CategoryScale,
    LinearScale,
    LineController,
    PointElement,
    LineElement);

export default function Graph({type, data}) {
    const {title, unit, color} = type;

    const options = useRef({
        scales: {
            x: {
                display: false
            },
            y: {
                ticks: {
                    callback: function(value, index, ticks) {
                        return value + " " + unit;
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        },
        responsive: true,
    });

    const getValues = () => {
        if(data && data.length != 0) return Object.values(data);
        return [];
    }

    const getKeys = () => {
        if(data && data.length != 0) return Object.keys(data);
        return [];
    }

    return (
        <Line options={options.current} data={{
            labels: getKeys(),
            datasets: [{
                label: title,
                data: getValues(),
                borderColor: color,
                backgroundColor: color + " 50%",
            }]
        }}/>
    )
}