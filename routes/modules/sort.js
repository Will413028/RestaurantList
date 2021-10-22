const express = require('express')

const router = express.Router()

const Restaurant = require('../../models/restaurant')


router.get('/sort/asc', (req,res) =>{
    Restaurant.find()
        .lean()
        .sort({name:'asc'})
        .then(restaurants => res.render('index', {restaurants}))
        .catch(error => console.log(error))
})


router.get('/sort/desc', (req,res) =>{
    Restaurant.find()
        .lean()
        .sort({name:'desc'})
        .then(restaurants => res.render('index', {restaurants}))
        .catch(error => console.log(error))
})


router.get('/sort/category', (req,res) =>{
    Restaurant.find()
        .lean()
        .sort({name:'category'})
        .then(restaurants => res.render('index', {restaurants}))
        .catch(error => console.log(error))
})


router.get('/sort/location', (req,res) =>{
    Restaurant.find()
        .lean()
        .sort({name:'location'})
        .then(restaurants => res.render('index', {restaurants}))
        .catch(error => console.log(error))
})


module.exports = router