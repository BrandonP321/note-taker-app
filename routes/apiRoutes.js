const { json } = require('express');
const fs = require('fs')
const path = require('path')

let data = require('../db/db.json')

module.exports = function(app) {
    app.get('/api/notes', function(req, res) {
        console.log(data)
        res.json(data)
    });

    app.post('/api/notes', function(req, res) {
        console.log(data)

        const newNotes = req.body
        console.log(newNotes)

        data.push(req.body)
        data = JSON.stringify(data, null, 4)

        fs.writeFileSync(path.join(__dirname, '../db/db.json'), data, function(err) {
            if (err) {
                throw err
            }
        })

        res.json(newNotes)
    });
}