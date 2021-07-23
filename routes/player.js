const express = require('express')
const { read } = require('fs')
const app = express()
const playerRoutes = express.Router()

playerRoutes.get('/', (req, res) => {
    var query = require('url').parse(req.url,true).query;
    var team = query.team;
    var position = query.position;
    var nationality = query.nationality;
    if (team == undefined && position == undefined && nationality == undefined){
        req.getConnection((err, conn) =>{
            if(err) return res.send(err)

            conn.query('SELECT * FROM players', (err, rows)=>{
                if(err) return res.send(err)

                if(!rows.length > 0) return res.send("Not Result")

                res.json(rows)
            })
        })
    } else if (team != undefined && position == undefined && nationality == undefined){
        req.getConnection((err, conn) =>{
        if(err) return res.send(err)

            conn.query('SELECT * FROM players WHERE team_id = ?',[team], (err, rows)=>{
                if(err) return res.send(err)

                if(!rows.length > 0) return res.send("Not Result")

                res.json(rows)
            })
        })
    } else if (team == undefined && position != undefined && nationality == undefined){
        req.getConnection((err, conn) =>{
        if(err) return res.send(err)

            conn.query('SELECT * FROM players WHERE position = ?',[position], (err, rows)=>{
                if(err) return res.send(err)

                if(!rows.length > 0) return res.send("Not Result")

                res.json(rows)
            })
        })
    } else if (team == undefined && position == undefined && nationality != undefined){
        req.getConnection((err, conn) =>{
        if(err) return res.send(err)

            conn.query('SELECT * FROM players WHERE nationality = ?',[nationality, nationality], (err, rows)=>{
                if(err) return res.send(err)

                if(!rows.length > 0) return res.send("Not Result")

                res.json(rows)
            })
        })
    } else if (team != undefined && position != undefined && nationality != undefined){
        req.getConnection((err, conn) =>{
        if(err) return res.send(err)

            conn.query('SELECT * FROM players WHERE team_id = ? AND position = ? AND nationality = ?',[team, position, nationality], (err, rows)=>{
                if(err) return res.send(err)

                if(!rows.length > 0) return res.send("Not Result")

                res.json(rows)
            })
        })
    }
})

playerRoutes.post('/add', (req, res) => {
    req.getConnection((err, conn) =>{
        if(err) return res.send(err)

        conn.query('INSERT INTO players set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Jugador agregado!')
        })
    })
})

playerRoutes.put('/update/:id', (req, res) => {
    req.getConnection((err, conn) =>{
        if(err) return res.send(err)

        conn.query('UPDATE players set ? WHERE id = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Jugador actualizado!')
        })
    })
})

playerRoutes.delete('/delete/:id', (req, res) => {
    req.getConnection((err, conn) =>{
        if(err) return res.send(err)

        conn.query('DELETE FROM players WHERE id = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Jugador eliminado!')
        })
    })
})

module.exports = playerRoutes