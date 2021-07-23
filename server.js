const express = require('express')
const mysql = require('mysql')
const myconn = require('express-myconnection')

const user = require('./routes/user')
const player = require('./routes/player')
const team = require('./routes/team')

const app = express()
app.set('port', process.env.PORT || 9000)
const dbOptions = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '12345',
    database: 'soccer'
}

// middlewares
app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json())

// routes 
app.get('/', (req, res) => {
    res.send('Welcome to my API')
})
app.use('/api/user', user)
app.use('/api/player', player)
app.use('/api/team', team)

// server running
app.listen(app.get('port'), ()=>{
    console.log('sever running on port', app.get('port'))
})

