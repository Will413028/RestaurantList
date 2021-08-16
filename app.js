
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000

// template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//routes setting
app.get('/', (req,res) =>{
    res.render('index')
})

//start and listen on the Express listener
app.listen(port,()=>{
    console.log(`express is listening on localhost:${port}`)
})