const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const BowelMovement = require('../../models/bowelMovement')

/**
 * Retrieve All BowelMovements.
 */
router.get('/', (req, res) => {
    BowelMovement.find({})
        .populate('colors')
        .populate('stoolTypes')
        .populate('symptoms')
        .sort({ "date": 1, "time": 1 })
        .exec((e, bowelMovements) => {
            if (e) res.status(500).send({ serverMessage: "An Error Occured." })
            else res.json(bowelMovements)
        })
})

/**
 * @param {ObjectId} req.params.id - BowelMovement ID.
 * 
 * Retrieve BowelMovement With Provided ID.
 */
router.get('/:id', (req, res) => {
    BowelMovement.findById(req.params.id)
        .populate('colors')
        .populate('stoolTypes')
        .populate('symptoms')
        .exec((e, bowelMovement) => {
            if (e) res.status(500).send({ serverMessage: "An Error Occured." })
            else if (bowelMovement) res.send(bowelMovement)
            else res.status(404).send({ serverMessage: "Bowel Movement Not Found." })
        })
})


/**
 * @param {String} [req.body.notes] - Notes Provided By User About The BowelMovement.
 * @param {String} req.body.date - Date BowelMovement Was Created. YYYY-MM-DD.
 * @param {String} req.body.time - Time BowelMovement Was Created. HH:MM.
 * @param {Array[StoolType]} req.body.stooltypes - StoolTypes Related To BowelMovement.
 * @param {Array[Color]} req.body.colors - Colors Related To BowelMovement.
 * @param {Array[Symptom]} req.body.symptoms - Symptoms Related To BowelMovement.
 * 
 * Create New BowelMovement.
 */
router.post('/', [
    body('notes').trim().escape(),
    body('date').trim().escape(),
    body('time').trim().escape()
], (req, res) => {
    /**
     * Create New BowelMovement
     * 
     * @TODO Change Hardcoded User To Variable
     */
    const bowelMovementData = {
        notes: req.body.notes || null,
        date: req.body.date,
        time: req.body.time,
        stoolTypes: req.body.stoolTypes,
        colors: req.body.colors,
        symptoms: req.body.symptoms,
        userId: "6404e3ddf3eb44e1bc6c8b30" // Add Current Authenticated User ID.
    }
    const bowelMovementValidator = new BowelMovement(bowelMovementData)
    const e = bowelMovementValidator.validateSync()
    if (e) res.status(422).send(e.errors)
    else {
        BowelMovement.create(bowelMovementData, (e, bowelMovement) => {
            if (e) res.status(500).send({ serverMessage: "An Error Occured." })
            else res.status(201).send()
        })
    }
})

/**
 * @param {ObjectId} req.params.id - BowelMovement ID.
 * @param {String} [req.body.notes] - Notes Provided By User About The BowelMovement.
 * @param {String} req.body.date - Date BowelMovement Was Created. YYYY-MM-DD.
 * @param {String} req.body.time - Time BowelMovement Was Created. HH:MM.
 * @param {Array[StoolType]} req.body.stooltypes - StoolTypes Related To BowelMovement.
 * @param {Array[Color]} req.body.colors - Colors Related To BowelMovement.
 * @param {Array[Symptom]} req.body.symptoms - Symptoms Related To BowelMovement.
 * 
 * Update BowelMovement With Provided ID.
 */
router.put('/:id', [
    body('notes').trim().escape(),
    body('date').trim().escape(),
    body('time').trim().escape()
], (req, res) => {
    const bowelMovementData = {
        notes: req.body.notes || "", // Check If Notes Exists, Otherwise Add EMPTY Value.
        date: req.body.date,
        time: req.body.time,
        stoolTypes: req.body.stoolTypes,
        colors: req.body.colors,
        symptoms: req.body.symptoms,
        userId: "6404e3ddf3eb44e1bc6c8b30" // Add Current Authenticated User ID.
    }
    const bowelMovementValidator = new BowelMovement(bowelMovementData)
    const e = bowelMovementValidator.validateSync()
    if (e) res.status(422).send(e.errors)
    else {
        BowelMovement.findByIdAndUpdate(req.params.id, req.body, (e, bowelMovement) => {
            if (e) res.status(500).send({ serverMessage: "An Error Occured." })
            else if (bowelMovement) res.status(200).send()
            else res.status(404).send({ serverMessage: "Bowel Movement Not Found." })
        })
    }
})

/**
 * @param {ObjectId} req.params.id - BowelMovement ID.
 * 
 * Delete BowelMovement With Provided ID.
 */
router.delete('/:id', (req, res) => {
    BowelMovement.findByIdAndDelete(req.params.id, (e, bowelMovement) => {
        if (e) res.status(500).send({ serverMessage: "An Error Occured." })
        else if (bowelMovement) res.status(200).send()
        else res.status(404).send({ serverMessage: "Bowel Movement Not Found." })
    })
})

module.exports = router