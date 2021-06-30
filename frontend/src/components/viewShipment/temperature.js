import React, { useState, useEffect } from 'react';
import { LineChart } from 'react-chartkick';
import 'chart.js';
import { getTemperature } from '../../actions/shipmentActions';
//import './style.scss'

const mockTemperatureData = { data: [
  { "temp": { "temp": "45", "UnixTimeStamp": "1625010812" }, "humidity": { "humidity": "34", "UnixTimeStamp": "12345678z" }, "battery": { "battery": "67%", "UnixTimeStamp": "123456z" } }, 
  { "temp": { "temp": "56", "UnixTimeStamp": "1625020813" }, "humidity": { "humidity": "34", "UnixTimeStamp": "12345678z" }, "battery": { "battery": "67%", "UnixTimeStamp": "123456z" } }, 
  { "temp": { "temp": "47", "UnixTimeStamp": "1625050814" }, "humidity": { "humidity": "34", "UnixTimeStamp": "12345678z" }, "battery": { "battery": "67%", "UnixTimeStamp": "123456z" } }, 
  { "temp": { "temp": "58", "UnixTimeStamp": "1625020815" }, "humidity": { "humidity": "34", "UnixTimeStamp": "12345678z" }, "battery": { "battery": "67%", "UnixTimeStamp": "123456z" } }, 
  { "temp": { "temp": "49", "UnixTimeStamp": "1625060816" }, "humidity": { "humidity": "34", "UnixTimeStamp": "12345678z" }, "battery": { "battery": "67%", "UnixTimeStamp": "123456z" } }, 
  { "temp": { "temp": "60", "UnixTimeStamp": "1625020817" }, "humidity": { "humidity": "34", "UnixTimeStamp": "12345678z" }, "battery": { "battery": "67%", "UnixTimeStamp": "123456z" } }, 
  { "temp": { "temp": "51", "UnixTimeStamp": "1625050819" }, "humidity": { "humidity": "34", "UnixTimeStamp": "12345678z" }, "battery": { "battery": "67%", "UnixTimeStamp": "123456z" } }, 
  { "temp": { "temp": "42", "UnixTimeStamp": "1625020820" }, "humidity": { "humidity": "34", "UnixTimeStamp": "12345678z" }, "battery": { "battery": "67%", "UnixTimeStamp": "123456z" } }, 
  { "temp": { "temp": "63", "UnixTimeStamp": "1625050821" }, "humidity": { "humidity": "34", "UnixTimeStamp": "12345678z" }, "battery": { "battery": "67%", "UnixTimeStamp": "123456z" } }, 
  { "temp": { "temp": "24", "UnixTimeStamp": "1625020822" }, "humidity": { "humidity": "34", "UnixTimeStamp": "12345678z" }, "battery": { "battery": "67%", "UnixTimeStamp": "123456z" } }] };

const Chart = () => {
  const [temp, setTemp] = useState({})

  const formatUnixTimeStamp = (timeStamp) => {
    return new Date(timeStamp * 1e3).toISOString().slice(-13, -5);
  }

  const prepareTemperatureData = (temperatureData) => {
    return temperatureData.reduce((obj, item) => (obj[item.temp.temp] = formatUnixTimeStamp(item.temp['UnixTimeStamp']), obj), {});
  }


  useEffect(() => {
    const interval = setInterval(() => {
      async function fetchData() {
        // const result = await getTemperature();
        const result = mockTemperatureData;
        console.log("data: ", prepareTemperatureData(result.data));
        // setTemp(result.data)
        setTemp(result.data.length > 0 ? prepareTemperatureData(result.data) : {});
      }
      fetchData();
    }, 5000);
    return () => {
      window.clearInterval(interval); // clear the interval in the cleanup function
    };
  }, []);



  return (
    <div>
      <LineChart
        ymin="-5" ymax="10" min={-5} max={10}
        colors={["#FA7923", "#666"]}
        id="users-chart" height="220px"
        data={temp}
      />

    </div>

  );

};
export default Chart;
