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
  })
  .catch(err => {
    console.log(err)
  })

app.get('/', (req, res) => {
  res.render('index', data)
})

app.listen(port, () => {
  console.log('listing on port: ' + port)
})
