import React, { useState, useEffect } from "react";
import Axios from "axios";
import './App.css';
import { Table } from "antd";


import currencies from './data/data'

function App() {
  const [data, setData] = useState({});
  const [loading, setloading] = useState(true);


  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { data } = await Axios.get("https://api.currencyfreaks.com/v2.0/rates/latest?apikey=fd05fbb6730f419a9506a9d2d7f15aa0")
      setloading(false);
      console.log(data.rates)
      setData(data.rates)
    }
    catch(error){
      console.log(error);
    }
  };


  const tableData =
    currencies.map(({ currency, buy }) => ({
    rate:  currency,
    ExchangeRate: parseFloat(data[currency]),
    WeBuy: parseFloat(data[currency]) + ((Math.floor(Math.random() * 4) + 1 ) / 100 *  parseFloat(data[currency])),
    WeSell :  parseFloat(data[currency]) - ((Math.floor(Math.random() * 4) + 1 ) /100 *  parseFloat(data[currency]))
  }))
  


  const columns = [
    {
      title: "",
      dataIndex: "rate",
      width: 150
    },
    {
      title: "We Buy",
      dataIndex: "WeBuy",
      width: 150
    },
    {
      title: "Exchange Rate",
      dataIndex: "ExchangeRate",
      width: 150
    },
    {
      title: "We Sell",
      dataIndex: "WeSell",
      width: 150
    }
  ];
  

  return (
    <div className="App">
      <h1>Display Rate Currency</h1>
      {loading ? (
        "Loading"
      ) : (
        <Table
          columns={columns}
          dataSource={tableData}
          style={{borderRadius:"20"}}
        />
      )}
    </div>
  );
}

export default App;