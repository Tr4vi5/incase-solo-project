const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */

// get all bookcases route
router.get('/all', (req, res) => {
    if (req.isAuthenticated()) {
        queryText = 'SELECT * FROM "bookcases" JOIN "users" ON "bookcases"."users_id" = "users"."id";';
        pool.query(queryText).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});// end get all bookcases

//get current user bookcase
router.get('/user', (req, res) => {
    if (req.isAuthenticated()) {
        queryText = 'SELECT * FROM "bookcases" JOIN "books" ON "bookcases"."id" = "books"."bookcases_id" WHERE "users_id" = $1;';
        pool.query(queryText, [req.user.id]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});// end get current user bookcase

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;