const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const fetch = require('node-fetch');
const cors = require('cors')

app.use(cors())

const BASE_URL = 'https://tw.stock.yahoo.com/_td-stock/api/resource/StockServices.rank;exchange=TAI;limit=100;offset=0;period=1D;sortBy=-volume'
const OTC_URL = 'https://tw.stock.yahoo.com/_td-stock/api/resource/StockServices.rank;exchange=TWO;limit=100;offset=0;period=1D;sortBy=-volume'


// get volume100 stocks
app.get('/api/volumestocks', async (req, res) => {
  let stockList = []
  const response = await fetch(`${BASE_URL}`)
  const data = await response.json()
  stockList = await data.list

  res.send(stockList)
})

app.get('/', (req, res) => {
  res.send('HELLLLOOOO')
})

// get volume100 otc stocks
app.get('/api/volumeotcstocks', async (req, res) => {
  let otcStockList = []
  const response = await fetch(`${OTC_URL
    }`)
  const data = await response.json()
  otcStockList = await data.list

  res.send(otcStockList)
})

app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}`)
})