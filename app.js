const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
const app = express()
const port = 3000


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



//routes setting
//index page
app.get('/', (req, res) => {
    Restaurant.find()
        .lean()
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.log(error))
})

// create a new restaurant
app.get('/restaurants/new', (req, res) => {
    res.render('new')
})

app.post('/restaurants', (req, res) => {
    const restaurant = new Restaurant({
        name: req.body.name,
        name_en: req.body.name_en,
        category: req.body.category,
        image: req.body.image || "https://www.ristobartwentyfive.com/wp-content/uploads/2019/07/restaurant-food-salat-2.jpg",
        location: req.body.location || null,
        google_map: req.body.google_map,
        rating: req.body.rating,
        phone: req.body.phone,
        description: req.body.description
    })

    restaurant.save()
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
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