const express = require('express')

const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const restaurant = new Restaurant({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image || 'https://www.ristobartwentyfive.com/wp-content/uploads/2019/07/restaurant-food-salat-2.jpg',
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
router.get('/:restaurantId', (req, res) => {
  const id = req.params.restaurantId
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

// edit data
router.get('/:restaurantId/edit', (req, res) => {
  const id = req.params.restaurantId
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
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

// delete a restaurant
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
