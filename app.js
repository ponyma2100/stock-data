const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const fetch = require('node-fetch');
const cors = require('cors')

app.use(cors())

const BASE_URL = 'https://tw.stock.yahoo.com/_td-stock/api/resource/StockServices.rank;exchange=TAI;limit=100;offset=0;period=1D;sortBy=-volume'
const OTC_URL = 'https://tw.stock.yahoo.com/_td-stock/api/resource/StockServices.rank;exchange=TWO;limit=100;offset=0;period=1D;sortBy=-volume'

app.get('/', (req, res) => {
  res.send('HELLLLOOOO')
})


// get volume100 stocks
app.get('/api/volumestocks', async (req, res) => {
  let stockList = []
  const response = await fetch(`${BASE_URL}`)
  const data = await response.json()
  stockList = await data.list

  res.send(stockList)
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

// get stock info
app.get('/api/stockinfo/:symbol', async (req, res) => {
  let symbol = req.params.symbol
  let stockInfo = []
  let STOCK_URL = `https://tw.stock.yahoo.com/_td-stock/api/resource/StockServices.stockList;fields=avgPrice%2Corderbook;symbols=${symbol}`

  try {
    const response = await fetch(STOCK_URL)
    const data = await response.json()
    stockInfo = data[0]
  } catch (error) {
    console.log(error)
  }

  res.send(stockInfo)
})

// get otc stock info
app.get('/api/otcinfo/:symbol', async (req, res) => {
  let symbol = req.params.symbol
  let otcStockInfo = []
  let OTCSTOCK_URL = `https://tw.stock.yahoo.com/_td-stock/api/resource/StockServices.stockList;fields=avgPrice%2Corderbook;symbols=${symbol}`

  try {
    const response = await fetch(OTCSTOCK_URL)
    const data = await response.json()
    otcStockInfo = data[0]
  } catch (error) {
    console.log(error)
  }

  res.send(otcStockInfo)
})

// get quote data
app.get('/api/quote/:symbol', async (req, res) => {
  let symbol = req.params.symbol
  let QUOTE_URL = `https://tw.quote.finance.yahoo.net/quote/q?type=tick&perd=1m&sym=${symbol}`
  let quote = []

  try {
    const response = await fetch(QUOTE_URL)
    const str = await response.text()
    const newStr = str.slice(5, -2)

    quote = JSON.parse(newStr)

  } catch (error) {
    console.log(error)
  }

  res.send(quote.tick)
})



app.get('/api/symbollist', async (req, res) => {
  let symbolList = []
  try {
    // 上市
    const res_twse = await fetch('https://openapi.twse.com.tw/v1/exchangeReport/STOCK_DAY_ALL')
    // 上櫃
    const res_tpex = await fetch('https://www.tpex.org.tw/openapi/v1/tpex_mainboard_daily_close_quotes')

    const data_twse = await res_twse.json()
    const data_tpex = await res_tpex.json()

    let arr_twse = data_twse.map(stock => {
      let obj_twse = {
        id: stock.Code,
        symbol: stock.Code + '.TW',
        name: stock.Name,
      }
      return obj_twse
    })

    let arr_tpex = data_tpex.map(stock => {
      let obj_tpex = {
        id: stock.SecuritiesCompanyCode,
        symbol: stock.SecuritiesCompanyCode + '.TWO',
        name: stock.CompanyName,
      }

      return obj_tpex
    })

    symbolList = arr_twse.concat(arr_tpex)

  } catch (error) {
    console.log(error)
  }

  res.send(symbolList)
})




app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}`)
})