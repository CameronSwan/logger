const express = require('express')
const router = express.Router()
const body = require('express-validator')
const BowelMovement = require('../../models/bowelMovement')

/**
 * Retrieve All BowelMovements.
 */
router.get('/', (req, res) => {
    BowelMovement.find({}, (e, bowelMovements) => {
        if (e) res.status(500).send({ serverMessage: e.message })
        else res.json(bowelMovements)
    })
})

/**
 * @param {ObjectId} req.params.id - User ID.
 * 
 * Retrieve All BowelMovements Created By User With Provided _id.
 */
router.get('/:id', (req, res) => {
    BowelMovement.findById(req.params.id, (e, bowelMovement) => {
        if (e) res.status(500).send({ serverMessage: e.message })
        else if (bowelMovement) res.send(bowelMovement)
        else res.status(404).send()
    })
})

/**
 * @param {Object} req.body.data - Data For The BowelMovement Object.
 * @param {String} [req.body.data.notes] - Notes Provided By User About The BowelMovement.
 * @param {String} req.body.data.date - Date BowelMovement Was Created. YYYY-MM-DD.
 * @param {String} req.body.data.time - Time BowelMovement Was Created. HH:MM.
 * @param {Array} req.body.data.stooltypes - StoolTypes Related To BowelMovement.
 * @param {Array} req.body.data.colors - Colors Related To BowelMovement.
 * @param {Array} req.body.data.symptoms - Symptoms Related To BowelMovement.
 * 
 * Create New BowelMovement.
 */
router.post('/', [
    body('data.notes').trim().escape(),
    body('data.date').trim().escape(),
    body('data.time').trim().escape()
], (req, res) => {
    /**
     * Create New BowelMovement
     * 
     * @TODO Change Hardcoded User To Variable
     */
    const bowelMovementData = {
        notes: req.body.data.notes || "", // Check If Notes Exists, Otherwise Add EMPTY Value.
        date: req.body.data.date,
        time: req.body.data.time,
        stoolTypes: req.body.data.stooltypes,
        colors: req.body.data.colors,
        symptoms: req.body.data.symptoms,
        userId: "6404e3ddf3eb44e1bc6c8b30" // Add Current Authenticated User ID.
    }
    const bowelMovementValidator = new BowelMovement(bowelMovementData)
    const e = bowelMovementValidator.validateSync()
    if (e) res.status(422).send(e.errors)
    else {
        BowelMovement.create(bowelMovementData, (e, bowelMovement) => {
            if (e) res.status(500).send({ serverMessage: e.message})
            else res.status(201).send()
        })
    }
})

/**
 * @param {ObjectId} req.params.id - BowelMovement ID.
 * @param {Object} req.body.data - Data For The BowelMovement Object.
 * @param {String} [req.body.data.notes] - Notes Provided By User About The BowelMovement.
 * @param {String} req.body.data.date - Date BowelMovement Was Created. YYYY-MM-DD.
 * @param {String} req.body.data.time - Time BowelMovement Was Created. HH:MM.
 * @param {Array} req.body.data.stooltypes - StoolTypes Related To BowelMovement.
 * @param {Array} req.body.data.colors - Colors Related To BowelMovement.
 * @param {Array} req.body.data.symptoms - Symptoms Related To BowelMovement.
 * 
 * Update BowelMovement With Provided _id.
 */
router.put('/:id', (req, res) => {
    
})

/**
 * @param {ObjectId} req.params.id - BowelMovement ID.
 * 
 * Delete BowelMovement With Provided _id.
 */
router.delete('/:id', (req, res) => {
    BowelMovement.findByIdAndDelete(req.params.id, (e, bowelMovement) => {
        if (e) res.status(500).send({ serverMessage: e.message })
        else if (bowelMovement) res.status(200).send()
        else res.status(404).send()
    })
})

module.exports = router