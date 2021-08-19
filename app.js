const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
const methodOverride = require('method-override')
const app = express()
const port = 3000






app.use(methodOverride('_method'))
app.use(routes)


mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

//set mongodb
const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb error!')
})

db.once('open', () => {
    console.log('mongodb connected!')
})

// template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))


//start and listen on the Express listener
app.listen(port, () => {
    console.log(`express is listening on localhost:${port}`)
})