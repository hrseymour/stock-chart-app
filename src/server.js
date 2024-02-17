const express = require('express');
const yahooFinance = require('yahoo-finance2').default; 
const cors = require('cors'); // Allows requests from the React frontend

const app = express();
app.use(cors());
const port = 5000; 

app.get('/api/stocks/:symbol', async (req, res) => {
  const { symbol } = req.params;
  const queryOptions = { period1: '2023-03-01', interval: '1d' };
  try {
     const result = await yahooFinance.historical(symbol, queryOptions); 
     res.json({ prices: result }); 
  } catch(error) {
     res.status(500).send('Error fetching data');
  }
});

app.listen(port, () => console.log(`Backend listening on ${port}`));
