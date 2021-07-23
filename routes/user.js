const express = require('express')
const { read } = require('fs')
const app = express()
const userRoutes = express.Router()

userRoutes.post('/add', (req, res) => {
    req.getConnection((err, conn) =>{
        if(err) return res.send(err)

        conn.query('INSERT INTO users set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Usuario agregado!')
        })
    })
})

module.exports = userRoutes