var express = require("express");
var fs = require('fs');
var router = express.Router();
var app = express();
var url = require('url');
var http = require('http');

const axios = require('axios');
app.set('view engine','ejs')
async function getCoin(){
    try {
      const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=58', {
        headers: {
          'X-CMC_PRO_API_KEY': 'f6967460-75b3-4f91-a30e-8d13962b2b67',
        },
      });
      const coin = response.data;
      const result = coin.data.map(a => ({ name: a.name, sy:a.symbol,id:a.id ,price: a.quote['USD'].price.toFixed(2)}));
      return result;
    } catch(ex) {
      console.log(ex);
      throw ex;
    }
  }
router.get('/', async (req, res) => {
    
    
var coins = await getCoin();
res.render("tst", {coin: coins});
});
router.get('/coin/:coin', async (req, res) => {
    res.send(req.params.coin);
});




module.exports = router;