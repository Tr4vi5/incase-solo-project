const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/user/:id', (req, res) => {
    queryText = 'SELECT * FROM "books" WHERE "bookcases_id" = $1;';
    pool.query(queryText, [req.params.id]).then((results)=>{
        res.send(results.rows);
    }).catch((error)=>{
        console.log('Could not retrieve books', error);
        res.sendStatus(500)
    });
    
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;