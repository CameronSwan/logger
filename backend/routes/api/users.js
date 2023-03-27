const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { body } = require('express-validator')
const User = require('../../models/user')

/**
 * Retrieve All Users.
 */
router.get('/', (req, res) => {
    User.find({}, (e, users) => {
        if (e) res.status(500).send({ serverMessage: "An Error Occured" })
        else res.json(users)
    })
})

/**
 * @param {ObjectId} req.params.id - User ID.
 * 
 * Retrieve User With Provided ID.
 */
router.get('/:id', (req, res) => {
    User.findById(req.params.id, (e, user) => {
        if (e) res.status(500).send({ serverMessage: "An Error Occured" })
        else if (user) res.send(user)
        else res.status(404).send({ serverMessage: "User Not Found." })
    })
})

/**
 * @param {String} req.body.email - User Email.
 * @param {String} req.body.password - User Password, Encrypted.
 * 
 * Login User.
 */
router.post('/login', [
    body('email').trim().escape(),
    body('password').trim().escape()
], (req, res) => {
    const userData = {
        username: "aaaaa",
        password: req.body.password,
        phoneNumber: "902-123-4567",
        roleId: "6404db71f3eb44e1bc50b361", // User Role
        email: req.body.email,
        isVerified: false,
        userSymptoms: [],
        verifiedBy: "aaaaa",
        verifiedAt: "aaaaa",
        createdBy: "aaaaa",
        createdAt: "aaaaa"
    }
    const userValidator = new User(userData)
    const e = userValidator.validateSync()
    if (e) res.status(422).send(e.errors)
    else {
        User.find({email: userData.email}, (e, users) => {
            if (e) res.status(500).send({ serverMessage: "An Error Occured." })
            else if (users.length === 0) res.status(404).send({ serverMessage: "User Not Found."})
            else {
                bcrypt.compare(userData.password, users[0].password, (e, result) => {
                    if (e) res.status(500).send({ serverMessage: "An Error Occured." })
                    else if (!result) res.status(401).send({ serverMessage: "Invalid Login." })
                    else res.status(200).send()
                })
            }
        })
    }
})

/**
 * @param {String} [req.body.username] - User Username.
 * @param {String} req.body.password - User Password, Encrypted.
 * @param {int} [req.body.phoneNumber] - User Phone Number.
 * @param {String} req.body.email - User Email.
 * @param {int} req.body.createdAt - Date User Was Created.
 * 
 * Register A User Account Through The App (Public Accessible).
 */
router.post('/register', [
    body('username').trim().escape(),
    body('password').trim().escape(),
    body('phoneNumber').trim().escape(),
    body('email').trim().escape()
], (req, res) => {
    const userData = {
        username: req.body.username,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        roleId: "6404db71f3eb44e1bc50b361", // User Role
        email: req.body.email,
        isVerified: false,
        userSymptoms: [],
        verifiedBy: null,
        verifiedAt: null,
        createdBy: null,
        createdAt: Date.now()
    }
    const userValidator = new User(userData)
    const e = userValidator.validateSync()
    if (e) res.status(422).send(e.errors)
    else {
        User.find({email: userData.email}, (e, user) => {
            if (e) res.status(500).send({ serverMessage: "An Error Occured." })
            else if (user.length > 0) res.status(400).send({ serverMessage: "Cannot Create User." })
            else {
                bcrypt.hash(userData.password, 10, (e, hash) => {
                    if (e) res.status(500).send({ serverMessage: "An Error Occured." })
                    userData.password = hash
                    User.create(userData, (e, user) => {
                        if (e) res.status(500).send({ serverMessage: "An Error Occured." })
                        else if (!user) res.status(422).send(e.errors)
                        else res.status(201).send()
                    })
                })
            }
        })
    }
})

/**
 * @param {String} [req.body.username] - User Username.
 * @param {String} req.body.password - User Password, Encrypted.
 * @param {int} [req.body.phoneNumber] - User Phone Number.
 * @param {int} req.body.roleId - User Role ID.
 * @param {String} req.body.email - User Email.
 * @param {boolean} req.body.isVerified - Represents User Being Verified As A Doctor.
 * @param {int} [req.body.verifiedBy] - User ID Of User Who Verified This User.
 * @param {Date} [req.body.verifiedAt] - Date User Was Verified.
 * @param {int} [req.body.createdBy] - User ID Of User Who Created This User.
 * @param {int} req.body.createdAt - Date User Was Created.
 * 
 * Create New User Manually (Admin Only).
 */
router.post('/create', [
    body('username').trim().escape(),
    body('password').trim().escape(),
    body('phoneNumber').trim().escape(),
    body('email').trim().escape(),
    body('roleId').trim().escape(),
    body('isVerified').trim().escape()
], (req, res) => {
    const userData = {
        username: req.body.username,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        roleId: req.body.roleId,
        email: req.body.email,
        isVerified: req.body.isVerified,
        userSymptoms: [],
        verifiedBy: req.body.verifiedBy || null,
        verifiedAt: req.body.verifiedAt || null,
        createdBy: req.body.createdBy || null,
        createdAt: Date.now()
    }
    const userValidator = new User(userData)
    const e = userValidator.validateSync()
    if (e) res.status(422).send(e.errors)
    else {
        User.find({email: userData.email}, (e, user) => {
            if (e) res.status(500).send({ serverMessage: "An Error Occured." })
            else if (user.length > 0) res.status(400).send({ serverMessage: "Cannot Create User." })
            else {
                bcrypt.hash(userData.password, 10, (e, hash) => {
                    if (e) res.status(500).send({ serverMessage: "An Error Occured." })
                    userData.password = hash
                    User.create(userData, (e, user) => {
                        if (e) res.status(500).send({ serverMessage: "An Error Occured." })
                        else if (!user) res.status(422).send(e.errors)
                        else res.status(201).send()
                    })
                })
            }
        })
    }
})

/**
 * @param {ObjectId} req.params.id - User ID.
 * @param {String} [req.body.username] - User Username.
 * @param {String} req.body.password - User Password, Encrypted.
 * @param {int} [req.body.phoneNumber] - User Phone Number.
 * @param {int} req.body.roleId - User Role ID.
 * @param {String} req.body.email - User Email.
 * @param {boolean} req.body.isVerified - Represents User Being Verified As A Doctor.
 * @param {Array[String]} req.body.userSymptoms - List Of Symptoms Created By This User.
 * @param {int} [req.body.verifiedBy] - User ID Of User Who Verified This User.
 * @param {int} [req.body.createdBy] - If User Was Created By An Admin, User ID Of User Who Created This User.
 * @param {int} req.body.createdAt - Date User Was Created.
 * 
 * Update User With Provided ID.
 */
router.put('/:id', [
    body('username').trim().escape(),
    body('password').trim().escape(),
    body('phoneNumber').trim().escape(),
    body('roleId').trim().escape(),
    body('email').trim().escape(),
    body('isVerified').trim().escape(),
    // body('userSymptoms').trim().escape()
], (req, res) => {
    const userValidator = new User(req.body)
    const e = userValidator.validateSync()
    if (e) res.status(422).send(e.errors)
    else {
        User.findByIdAndUpdate(req.params.id, req.body, (e, user) => {
            if (e) res.status(500).send({ serverMessage: "An Error Ocurred." })
            else if (!user) res.status(404).send({ serverMessage: "User Not Found." })
            else res.status(200).send()
        })
    }
})

/**
 * @param {ObjectId} req.params.id - User ID.
 * 
 * Delete User With Provided ID.
 */
router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id, (e, user) => {
        if (e) res.status(500).send({ serverMessage: "An Error Occured" })
        else if (user) res.status(200).send()
        else res.status(404).send({ serverMessage: "User Not Found." })
    })
})

module.exports = router