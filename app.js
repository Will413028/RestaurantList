const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')


const app = express()
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb error!')
})

db.once('open', () => {
    console.log('mongodb connected!')
})

// require restaurant data used in the project
const restaurantList = require('./restaurants.json')
const port = 3000

// template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))


//routes setting
//index page
app.get('/', (req, res) => {
    res.render('index', {restaurants: restaurantList.results})
})

//show page
app.get('/restaurants/:restaurant_id', (req, res) => {
    const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
    res.render('show', {restaurant: restaurant})
})

// search function
app.get('/search', (req, res) => {
    const keyword = req.query.keyword
    const restaurants = restaurantList.results.filter(restaurants => {
        return restaurants.name.toLowerCase().includes(keyword.toLowerCase())||restaurants.category.includes(keyword)
    })
    res.render('index', {restaurants: restaurants, keyword: keyword})
})

//start and listen on the Express listener
app.listen(port, () => {
    console.log(`express is listening on localhost:${port}`)
})