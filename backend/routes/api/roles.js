const express = require('express')
const router = express.Router()
const Role = require('../../models/role')

// Return All Roles
router.get('/', (req, res) => {
    Role.find({}, (e, roles) => {
        if (e) res.status(400).send()
        else if (roles) res.status(200).json(roles)
        else res.status(404).send()
    })
})

// Return Role With Provided _id
router.get('/:id', (req, res) => {
    Role.findById(req.params.id, (e, role) => {
        if (e) res.status(400).send()
        else if (role) res.status(200).json(role)
        else res.status(404).send()
    })
})

module.exports = router