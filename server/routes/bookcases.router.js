const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/all', (req, res) => {
    queryText = 'SELECT * FROM "bookcases" JOIN "users" ON "bookcases"."users_id" = "users"."id";';
    pool.query(queryText).then((results)=>{
        res.send(results.rows);
    }).catch((error)=>{
        res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;