import React from 'react';
import StockChart from './StockChart';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:symbol" element={<StockChartWithSymbol />} /> 
        <Route path="/" element={<div>Please enter a stock symbol in the URL</div>} /> 
      </Routes>
    </BrowserRouter>
  );
}

function StockChartWithSymbol() {
  const { symbol } = useParams(); // Extract the symbol from the URL parameters

  return (
    <div>
      <StockChart symbol={symbol} /> 
    </div>
  );
}

export default App;
