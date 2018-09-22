const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// get all incoming requests for logged in user
router.get('/user/incoming', (req, res) => {
    if (req.isAuthenticated()) {
        let queryText = `SELECT "requests".*, "books"."title", "books"."bookcases_id", "users"."username", "users"."profile_img_src" FROM "requests" JOIN "books" ON "requests"."books_id" = "books"."id" JOIN "users" ON "users"."id" = "requests"."from_users_id" WHERE "to_users_id" = $1;`;
        pool.query(queryText, [req.user.id]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('Error getting requests from database', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

// get all outgoing requests for logged in user
router.get('/user/outgoing', (req, res) => {
    if (req.isAuthenticated()) {
        let queryText = `SELECT "requests".*, "books"."title", "books"."bookcases_id", "users"."username", "users"."profile_img_src" FROM "requests" JOIN "books" ON "requests"."books_id" = "books"."id" JOIN "users" ON "users"."id" = "requests"."from_users_id" WHERE "from_users_id" = $1;`;
        pool.query(queryText, [req.user.id]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('Error getting requests from database', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
})

// post new request from discover view
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