// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()



//  Restaurant model
const Restaurant = require('../../models/restaurant')

//index page
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

// 匯出路由模組
module.exports = router