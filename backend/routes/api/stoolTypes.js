const express = require('express')
const router = express.Router()
const StoolType = require('../../models/stoolType')

// Return All StoolTypes
router.get('/', (req, res) => {
    StoolType.find({}, (e, stoolTypes) => {
        if (e) res.status(400).send()
        if (stoolTypes) res.status(200).json(stoolTypes)
        else res.status(404).send()
    })
})

// Return StoolType With Provided _id
router.get('/:id', (req, res) => {
    StoolType.findById(req.params.id, (e, stoolType) => {
        if (e) res.status(400).send()
        if (stoolType) res.status(200).json(stoolType)
        else res.status(404).send()
    })
})

module.exports = router