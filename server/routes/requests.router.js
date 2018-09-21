const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        let queryText = ``;
    }
});

router.post('/', (req, res) => {
    if (req.isAuthenticated()) {
        let queryTextOne = `SELECT "users"."id" FROM "users" JOIN "bookcases" ON "users"."id" = "bookcases"."users_id" WHERE "bookcases"."id" = $1;`;
        let queryTextTwo = `INSERT INTO "requests" ("to_users_id", "from_users_id", "books_id") VALUES ($1, $2, $3);`;
        pool.query(queryTextOne, [req.body.bookcases_id]).then((results) => { // get to_users_id
            pool.query(queryTextTwo, [results.rows[0].id, req.user.id, req.body.id])
                .then((results) => {
                    res.sendStatus(201);
                }).catch((error) => {
                    console.log('Error inserting new request', error);
                    res.sendStatus(500);
                });
        }).catch((error) => {
            console.log('Error selecting user id in request post', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;