const express = require('express')
const router = express.Router();

/* USERS */
const usersRouter = require('./users');
router.use('/users', usersRouter)

/* BOWEL MOVEMENTS */
const bowelMovementsRouter = require('./bowelMovements');
router.use('/bowelmovements', bowelMovementsRouter)

/* STOOL TYPES */
const stoolTypesRouter = require('./stooltypes');
router.use('/stooltypes', stoolTypesRouter)

/* COLORS */
const colorsRouter = require('./colors');
router.use('/colors', colorsRouter)

/* ROLES */
const rolesRouter = require('./roles');
router.use('/roles', rolesRouter)

/* SYMPTOMS */
const symptomsRouter = require('./symptoms');
router.use('/symptoms', symptomsRouter)

/* FACTS */
const factsRouter = require('./facts');
router.use('/facts', factsRouter)

/* POSTS */
// const postsRouter = require('./posts');
// router.use('/posts', postsRouter)

/* COMMENTS */
// const commentsRouter = require('./comments');
// router.use('/comments', commentsRouter)

module.exports = router