const express = require('express')
const router = express.Router()
const body = require('express-validator')
const BowelMovement = require('../../models/bowelMovement')
const BowelMovement_StoolType = require('../../models/bowelMovement_StoolTypes')
const BowelMovement_Color = require('../../models/bowelMovement_Colors')
const BowelMovement_Symptom = require('../../models/bowelMovement_Symptoms')

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
 * @param {Object} req.body.bmdata - Data For The BowelMovement Object.
 * @param {String} [req.body.bmdata.notes] - Notes Provided By User About The BowelMovement.
 * @param {String} req.body.bmdata.date - Date BowelMovement Was Created. YYYY-MM-DD.
 * @param {String} req.body.bmdata.time - Time BowelMovement Was Created. HH:MM.
 * @param {Object} req.body.pivotdata - Data For The Pivot Table Relationships With The BowelMovement.
 * @param {Array} req.body.pivotdata.stooltypes - StoolTypes Related To BowelMovement.
 * @param {Array} req.body.pivotdata.colors - Colors Related To BowelMovement.
 * @param {Array} req.body.pivotdata.symptoms - Symptoms Related To BowelMovement.
 * 
 * Create New BowelMovement And Related Pivot Table Entries.
 */
router.post('/', [
    body('bmdata.notes').trim().escape(),
    body('bmdata.date').trim().escape(),
    body('bmdata.time').trim().escape()
], (req, res) => {
    /**
     * Create New BowelMovement
     * 
     * @TODO Change Hardcoded User To Variable
     */
    const bowelMovementData = {
        notes: req.body.bmdata.notes || null, // Check If Notes Exists, Otherwise Add NULL Value.
        date: req.body.bmdata.date,
        time: req.body.bmdata.time,
        userId: "6404e3ddf3eb44e1bc6c8b30" // Add Current Authenticated User ID.
    }
    const bowelMovementValidator = new BowelMovement(bowelMovementData)
    const e = bowelMovementValidator.validateSync()
    if (e) res.status(422).send({ serverMessage: e.message})
    else if (req.body.pivotdata.stooltypes.length < 1) res.status(422).send({ serverMessage: "Must Have Atleast 1 Stool Type."}) // Check If StoolTypes Array Has Atleast 1 Item
    else if (req.body.pivotdata.colors.length < 1) res.status(422).send({ serverMessage: "Must Have Atleast 1 Color."}) // Check If Colors Array Has Atleast 1 Item
    else {
        BowelMovement.create(bowelMovementData, (e, bowelMovement) => {
            if (e) res.status(500).send({ serverMessage: e.message})
            else {
                /**
                 * Create Pivot Table Entries
                 */
                const bowelMovementId = bowelMovement.id
                stooltypes.forEach(stoolTypeId => {
                    BowelMovement_StoolType.create({bowelMovementId: bowelMovementId, stoolTypeId: stoolTypeId}, e => {
                        if (e) res.status(500).send({serverMessage: e.message})
                        else res.status(201).send({ serverMessage: "Stool Types Pivot Table Entry Created."})
                    })
                })
                colors.forEach(colorId => {
                    BowelMovement_Color.create({bowelMovementId: bowelMovementId, colorId: colorId}, e => {
                        if (e) res.status(500).send({serverMessage: e.message})
                        else res.status(201).send({ serverMessage: "Colors Pivot Table Entry Created."})
                    })
                })
                symptoms.forEach(symptomId => {
                    BowelMovement_Symptom.create({bowelMovementId: bowelMovementId, symptomId: symptomId}, e => {
                        if (e) res.status(500).send({serverMessage: e.message})
                        else res.status(201).send({ serverMessage: "Symptoms Pivot Table Entry Created."})
                    })
                })
                res.status(201).send({ serverMessage: "Bowel Movement Created."})
            }
        })
    }
})

/**
 * @param {ObjectId} req.params.id - BowelMovement ID.
 * @param {Object} req.body.bmdata - Data For The BowelMovement Object.
 * @param {String} [req.body.bmdata.notes] - Notes Provided By User About The BowelMovement.
 * @param {String} req.body.bmdata.date - Date BowelMovement Was Created. YYYY-MM-DD.
 * @param {String} req.body.bmdata.time - Time BowelMovement Was Created. HH:MM.
 * @param {Object} req.body.pivotdata - Data For The Pivot Table Relationships With The BowelMovement.
 * @param {Array} req.body.pivotdata.stooltypes - StoolTypes Related To BowelMovement.
 * @param {Array} req.body.pivotdata.colors - Colors Related To BowelMovement.
 * @param {Array} req.body.pivotdata.symptoms - Symptoms Related To BowelMovement.
 * 
 * Update BowelMovement With Provided _id And Related Pivot Table Entries.
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