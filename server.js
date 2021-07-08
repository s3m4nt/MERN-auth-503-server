require('dotenv').config()
const express = require('express')
const cors = require('cors')
const rowdy = require('rowdy-logger')
// connect to db
const db = require('./models')
db.connect()

// config express app
const app = express()
const PORT = process.env.PORT || 3001
const rowdyResults = rowdy.begin(app)

// middleware
app.use(cors())
// body parser middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json()) // for request body
// custom middleware
app.use((req, res, next) => {
    console.log(`incoming request: ${req.method} ${req.url}`)
    res.locals.anything = '🚀'
    next()
})
// controllers
app.use('/api-v1/users', require('./controllers/api-v1/users.js'))

const middleWare = (req, res, next) => {
    console.log('I am a route specific middleware 🌎')
    next()
}

app.get('/', middleWare, (req, res) => {
    res.json({msg: 'hello from the backend! 👋'})
    console.log(res.locals)
    // res.send('Sending res.send')
})

// listen on a port
app.listen(PORT, () => {
    console.log(`🏴󠁧󠁢󠁥󠁮󠁧󠁿 -------🔥--------------------🔥----------------------🔥------- 🏴󠁧󠁢󠁥󠁮󠁧󠁿`);
    rowdyResults.print()
    console.log(`🎧 Listening on PORT:${PORT} 🎧`);
})