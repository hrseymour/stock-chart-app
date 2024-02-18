import React from 'react';
import StockChart from './components/StockChart';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1>Compare Stocks</h1>
      <div className="chart-container">
        <StockChart initialSymbol="MSFT" chartColor="rgb(0, 0, 100)" />
      </div>
      <div className="chart-container">
        <StockChart initialSymbol="AMZN" chartColor="rgb(0, 100, 0)" />
      </div>
    </div>
  );
}

export default App;
