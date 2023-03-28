const express = require('express')
const router = express.Router()
const Fact = require('../../models/fact')

/**
 * Retrieve All Facts.
 */
router.get('/', (req, res) => {
    Fact.find({}, (e, facts) => {
        if (e) res.status(500).send({ serverMessage: "An Error Occured."})
        else res.json(facts)
    })
})

/**
 * @param {ObjeectId} req.params.id - Fact ID.
 * 
 * Retrive Fact With Provided ID.
 */
router.get('/:id', (req, res) => {
    Fact.findById(req.params.id, (e, user) => {
        if (e) res.status(500).send({ serverMessage: "An Error Occured."})
        else if (!user) res.status(404).send({ serverMessage: "Fact Not Found."})
        else res.send(user)
    })
})

module.exports = router