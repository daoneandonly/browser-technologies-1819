const pug = require('pug')
const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const axios = require('axios')
const fs = require('fs')

data = {}
query = {}

app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'public')))

function filterData(data, key, filterWord) {
  if (filterWord == '') {
    return data
  }
  let filterData = data.cards.filter(x => {
    if (x[key] === undefined) {
      return false
    }
    if (
      x[key]
        .toString()
        .toLowerCase()
        .includes(filterWord.toLowerCase())
    ) {
      return true
    }
  })
  return { cards: filterData }
}

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
  if (req.query.value) {
    query = req.query
    res.redirect('/search/' + req.query.search + '/' + req.query.value)
  } else {
    res.render('nojs', data)
  }
})

app.get('/search/:search/:value', (req, res) => {
  res.render('search', filterData(data, req.params.search, req.params.value))
})

function routeCards() {
  for (let i = 0; i < data.cards.length; i++) {
    app.get('/cards/' + data.cards[i].id, (req, res) => {
      let singlecard = data.cards[i]
      res.render('singlecard', { data: singlecard })
    })
  }
}

app.listen(process.env.PORT || port, () => {
  console.log('listing on port: ' + port)
})
