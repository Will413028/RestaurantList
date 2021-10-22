const express = require('express')

const router = express.Router()

const Restaurant = require('../../models/restaurant')
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// search function
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const keywordRegex = new RegExp(keyword, 'i')
  Restaurant.find({ $or: [{ category: { $regex: keywordRegex } }, { name: { $regex: keywordRegex } }] })
    .lean()
    .then(restaurants => {
      res.render('index', { restaurants, keyword })
    })
})

// sort function
router.get('/asc', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ name_en: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

router.get('/desc', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ name_en: 'desc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

router.get('/category', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ category: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

router.get('/location', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ location: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

module.exports = router
