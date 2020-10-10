const { json } = require('express');
const fs = require('fs')
const path = require('path')

const dbPath = path.join(__dirname, '../db/db.json')
let data = require('../db/db.json')

module.exports = function(app) {
    app.get('/api/notes', function(req, res) {
        res.json(data)
    });

    app.post('/api/notes', function(req, res) {
        const newNotes = req.body
        newNotes.id = data.length

        data.push(req.body)

        fs.writeFileSync(dbPath, JSON.stringify(data, null, 4), function(err) {
            if (err) {
                throw err
            }
        })

        res.json(newNotes)
    });

    app.delete('/api/notes/:id', function(req, res) {
        // change below code to delete the object with the given id
        const notesId = req.params.id
        console.log(notesId)
        data.splice(notesId, 1)
        console.log(data)

        for (let identification in data) {
            console.log(identification)
            data[identification].id = identification
        }

        fs.writeFileSync(dbPath, JSON.stringify(data, null, 4), function(err){
            if (err) throw err
        })

        res.send('DELETE Request Called')
    })
}