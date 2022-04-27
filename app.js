const express = require('express')
const app = express()
const port = 3000
const fetch = require('node-fetch');



const BASE_URL = 'https://tw.stock.yahoo.com/_td-stock/api/resource/StockServices.rank;exchange=TAI;limit=100;offset=0;period=1D;sortBy=-volume'
const OTC_URL = 'https://tw.stock.yahoo.com/_td-stock/api/resource/StockServices.rank;exchange=TWO;limit=100;offset=0;period=1D;sortBy=-volume'



app.get('/volumestocks', async (req, res) => {
  let stockList = []
  const response = await fetch(`${BASE_URL}`)
  const data = await response.json()
  stockList = await data.list

  res.send(stockList)
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})