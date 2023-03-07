const express = require('express')
const router = express.Router()
const Symptom = require('../../models/symptom')

// Return All Symptoms
router.get('/', (req, res) => {
    Symptom.find({}, (e, symptoms) => {
        if (e) res.status(400).send()
        else if (symptoms) res.status(200).json(symptoms)
        else res.status(404).send()
    })
})

// Return Symptom With Provided _id
router.get('/:id', (req, res) => {
    Symptom.findById(req.params.id, (e, symptom) => {
        if (e) res.status(400).send()
        else if (symptom) res.status(200).json(symptom)
        else res.status(404).send()
    })
})

module.exports = router