const express = require('express')
const app = express()
// require packages used in the project
const exphbs = require('express-handlebars')
// require restaurant data used in the project
const restaurantList = require('./restaurants.json')
const port = 3000

// template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))


//routes setting
app.get('/', (req, res) => {
    res.render('index',{restaurants:restaurantList.results})
})

//start and listen on the Express listener
app.listen(port, () => {
    console.log(`express is listening on localhost:${port}`)
})

