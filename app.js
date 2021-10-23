const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')
const usePassport = require('./config/passport')
const Restaurant = require('./models/restaurant')
const app = express()
const port = 3000


app.use(methodOverride('_method'))
app.use(session({
  secret: 'Secret',
  resave: false,
  saveUninitialized: true
}))
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

// set mongodb
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
usePassport(app)

// routes setting
// index page
app.use(routes)

// start and listen on the Express listener
app.listen(port, () => {
  console.log(`express is listening on localhost:${port}`)
})
