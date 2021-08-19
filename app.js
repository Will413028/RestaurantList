const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
const methodOverride = require('method-override')
const app = express()
const port = 3000

app.use(methodOverride('_method'))



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


// show details
app.get('/restaurants/:restaurantId', (req, res) => {
    const id = req.params.restaurantId
    Restaurant.findById(id)
        .lean()
        .then((restaurant) => res.render('detail', { restaurant }))
        .catch(error => console.log(error))
})

// edit data
app.get('/restaurants/:restaurantId/edit', (req, res) => {
    const id = req.params.restaurantId
    Restaurant.findById(id)
        .lean()
        .then((restaurant) => res.render('edit', { restaurant }))
        .catch(error => console.log(error))
})

app.put('/restaurants/:restaurantId', (req, res) => {
    const id = req.params.restaurantId
    const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body

    Restaurant.findById(id)
        .then(restaurant => {
            restaurant.name = req.body.name,
                restaurant.name_en = req.body.name_en,
                restaurant.category = req.body.category,
                restaurant.image = req.body.image,
                restaurant.location = req.body.location,
                restaurant.phone = req.body.phone,
                restaurant.google_map = req.body.google_map,
                restaurant.rating = req.body.rating,
                restaurant.description = req.body.description,
                restaurant.save()
        })
        .then(() => res.redirect(`/restaurants/${id}`))
        .catch(error => console.log(error))
})

//delete a restaurant
app.delete('/restaurants/:restaurantId', (req, res) =>{
    const id = req.params.restaurantId
    Restaurant.findById(id)
        .then(restaurant => restaurant.remove())
        .then(() =>res.redirect('/'))
        .catch(error => console.log(error))
})

// search function
app.get('/search', (req, res) => {
    const keyword = req.query.keyword.trim().toLowerCase()
    const keywordRegex = new RegExp(keyword, 'i')
    Restaurant.find({ $or: [{ category: { $regex: keywordRegex } }, { name: { $regex: keywordRegex } }] })
        .lean()
        .then(restaurants => {
            res.render('index', { restaurants, keyword })
        })
})


//start and listen on the Express listener
app.listen(port, () => {
    console.log(`express is listening on localhost:${port}`)
})