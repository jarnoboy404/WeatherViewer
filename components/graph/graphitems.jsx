import graphTypes from './types';
import {useEffect, useState} from "react";
import Graph from "./graph";
import {FaTemperatureHigh, FaWind} from "react-icons/fa";
import {IoWater} from "react-icons/io5";

export default function GraphItems() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/api/weather')
            .then(res => res.json())
            .then(data => {
                setData(data);
            });
    }, []);

    const getLastItemValue = (typeName) => {
        if(data && data.length != 0) {
            const values = Object.values(data[typeName]);

            return values[values.length - 1];
        }
    }

    const getIcon = (typeName, color) => {
        const size = 20;
        switch (typeName) {
            case 'temperature':
                return <FaTemperatureHigh color={color} size={size}/>;
            case 'humidity':
                return <IoWater color={color} size={size}/>;
            case 'wind':
                return <FaWind color={color} size={size}/>;
            default:
        }
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    {Object.keys(graphTypes).map((typeName) => {
                        const type = graphTypes[typeName];
                        return (
                            <div className="col-12 col-md-6 col-lg-4" key={typeName}>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="card-title d-flex justify-content-between align-items-center">
                                            <h3>{getIcon(typeName, type.color)} {type.title}</h3>
                                            <h6>{getLastItemValue(typeName)} {type.unit}</h6>
                                        </div>
                                        <Graph type={type} data={data[typeName]}/>
                                        <small className="d-flex justify-content-center"></small>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}