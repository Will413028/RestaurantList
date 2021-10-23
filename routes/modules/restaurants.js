const express = require('express')

const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const {name, name_en, category, image, location, phone, google_map, rating, description } = req.body //解構賦值
  return Restaurant.create({
    name,
    name_en,
    category,
    image: image || "https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5635/01.jpg",
    location,
    phone,
    google_map,
    rating,
    description,
    userId
  })
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
})

// show details
router.get('/:restaurantId', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurantId
  Restaurant.findOne({ _id, userId})
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

// edit data
router.get('/:restaurantId/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurantId
  Restaurant.findOne({ _id, userId})
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:restaurantsId', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurantsId
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body //解構賦值
  return Restaurant.findOne({ _id, userId })
      .then(restaurant => {
        restaurant.name = name
        restaurant.name_en = name_en
        restaurant.category = category
        restaurant.image = image
        restaurant.location = location
        restaurant.phone = phone
        restaurant.google_map = google_map
        restaurant.rating = rating
        restaurant.description = description
        return restaurant.save()
      })
      .then(() => res.redirect(`/restaurants/${_id}`))
      .catch(error => console.log(error))
})


// delete a restaurant
router.delete('/:restaurantsId', (req, res) => {
  const _id = req.params.restaurantsId
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
      .then(restaurant => restaurant.remove())
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
})

module.exports = router
