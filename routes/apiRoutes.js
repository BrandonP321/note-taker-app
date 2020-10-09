const { json } = require('express');
const fs = require('fs')
const path = require('path')

let data = require('../db/db.json')

module.exports = function(app) {
    app.get('/api/notes', function(req, res) {
        res.json(data)
    });

    app.post('/api/notes', function(req, res) {
        const newNotes = req.body

        data.push(req.body)

        fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(data, null, 4), function(err) {
            if (err) {
                throw err
            }
        })

        res.json(newNotes)
    });
}