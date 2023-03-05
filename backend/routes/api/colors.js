const express = require('express')
const router = express.Router()
const Color = require('../../models/color')

// Return All Colors
router.get('/', (req, res) => {
    Color.find({}, (e, colors) => {
        if (e) res.status(400).send()
        if (colors) res.status(200).json(colors)
        else res.status(404).send()
    })
})

// Return Color With Provided _id
router.get('/:id', (req, res) => {
    Color.findById(req.params.id, (e, color) => {
        if (e) res.status(400).send()
        if (color) res.status(200).json(color)
        else res.status(404).send()
    })
})

module.exports = router