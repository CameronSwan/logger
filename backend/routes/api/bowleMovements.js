const express = require('express')
const router = express.Router()
const BowelMovement = require('../../models/bowelMovement')
const bowelMovement_StoolType = require('../../models/bowelMovement_StoolTypes')
const bowelMovement_Color = require('../../models/bowelMovement_Colors')
const bowelMovement_Symptom = require('../../models/bowelMovement_Symptoms')

/**
 * Retrieve All BowelMovements.
 */
router.get('/', (req, res) => {
    BowelMovement.find({}, (e, bowelMovements) => {
        if (e) res.status(500).send()
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
        if (e) res.status(400).send()
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
    check('req.body.bmdata.notes').trim().escape(),
    check('req.body.bmdata.date').trim().escape(),
    check('req.body.bmdata.time').trim().escape()
], (req, res) => {
    /**
     * Create New BowelMovement
     * 
     * @TODO Change Hardcoded User To Variable
     */
    const bowelMovementData = {
        notes: req.body.bmdata.notes || null, // Check If Notes Exists, Otherwise Add NULL Value.
        date: new Date(req.body.bmdata.date), // Convert Date Data To Date.
        time: new Date(req.body.bmdata.time), // Convert Time Data To Date.
        userId: {"$oid": "6404e3ddf3eb44e1bc6c8b30"} // Add Current Authenticated User ID.
    }
    const bowelMovementValidator = new BowelMovement(bowelMovementData)
    bowelMovementValidator.validate(e => {
        if (e) res.status(422).send()
        else {
            BowelMovement.create(bowelMovementData, (e, bowelMovement) => {
                if (e) res.status(500).send()
                else res.status(201).send()
            })
        }
    })

    /**
     * Create Pivot Table Entries
     * 
     * @TODO Change Hardcoded User To Variable
     */

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
        if (e) res.status(500).send()
        else if (bowelMovement) res.status(200).send()
        else res.status(404).send()
    })
})

module.exports = router