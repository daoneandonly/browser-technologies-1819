const pug = require('pug')
const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const axios = require('axios')

data = {}

app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'public')))

axios
  .get('https://api.pokemontcg.io/v1/cards?pageSize=250&setCode=sm7')
  .then((res, req) => {
    data = res.data
    routeCards()
  })
  .catch(err => {
    console.log(err)
  })

app.get('/', (req, res) => {
  res.render('index', data)
})

app.get('/nojs', (req, res) => {
  res.render('nojs', data)
})

function routeCards() {
  for (let i = 0; i < data.cards.length; i++) {
    app.get('/cards/' + data.cards[i].id, (req, res) => {
      let singlecard = data.cards[i]
      res.render('singlecard', { data: singlecard })
    })
  }
}

app.listen(port, () => {
  console.log('listing on port: ' + port)
})
