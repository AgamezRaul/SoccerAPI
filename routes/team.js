const express = require('express')
const { read } = require('fs')
const app = express()
const teamRoutes = express.Router()

teamRoutes.get('/', (req, res) => {
    var query = require('url').parse(req.url,true).query;
    var league = query.league;
    var country = query.country;
    if (country == undefined && league == undefined){
        req.getConnection((err, conn) =>{
            if(err) return res.send(err)

            conn.query('SELECT * FROM teams', (err, rows)=>{
                if(err) return res.send(err)

                if(!rows.length > 0) return res.send("Not Result")

                res.json(rows)
            })
        })
    } else if (country != undefined && league == undefined){
        req.getConnection((err, conn) =>{
        if(err) return res.send(err)

            conn.query('SELECT * FROM teams WHERE country = ?',[country], (err, rows)=>{
                if(err) return res.send(err)

                if(!rows.length > 0) return res.send("Not Result")

                res.json(rows)
            })
        })
    } else if (country == undefined && league != undefined){
        req.getConnection((err, conn) =>{
        if(err) return res.send(err)

            conn.query('SELECT * FROM teams WHERE league = ?',[league], (err, rows)=>{
                if(err) return res.send(err)

                if(!rows.length > 0) return res.send("Not Result")

                res.json(rows)
            })
        })
    } else if (country != undefined && league != undefined){
        req.getConnection((err, conn) =>{
        if(err) return res.send(err)

            conn.query('SELECT * FROM teams WHERE league = ? AND country = ?',[league, country], (err, rows)=>{
                if(err) return res.send(err)

                if(!rows.length > 0) return res.send("Not Result")

                res.json(rows)
            })
        })
    }
})

teamRoutes.post('/add', (req, res) => {
    req.getConnection((err, conn) =>{
        if(err) return res.send(err)

        conn.query('INSERT INTO teams set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Equipo agregado!')
        })
    })
})

teamRoutes.put('/update/:id', (req, res) => {
    req.getConnection((err, conn) =>{
        if(err) return res.send(err)

        conn.query('UPDATE teams set ? WHERE id = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Equipo actualizado!')
        })
    })
})

teamRoutes.delete('/delete/:id', (req, res) => {
    req.getConnection((err, conn) =>{
        if(err) return res.send(err)

        conn.query('DELETE FROM teams WHERE id = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Equipo eliminado!')
        })
    })
})


module.exports = teamRoutes