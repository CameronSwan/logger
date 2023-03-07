const express = require('express')
const router = express.Router()
const BowelMovement = require('../../models/bowelMovement')

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
 * @param {ObjectId} _id - User ID.
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

/**
 * @param {ObjectId} _id - BowelMovement ID.
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

/**
 * @param {ObjectId} _id - BowelMovement ID.
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