const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// get all incoming requests for logged in user
router.get('/user/incoming', (req, res) => {
    if (req.isAuthenticated()) {
        let queryText = `SELECT "requests".*, "books"."title", "books"."bookcases_id", "users"."username", "users"."profile_img_src" FROM "requests" JOIN "books" ON "requests"."books_id" = "books"."id" JOIN "users" ON "users"."id" = "requests"."from_users_id" WHERE "to_users_id" = $1 AND "active" = TRUE;`;
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
        let queryText = `SELECT "requests".*, "books"."title", "books"."bookcases_id", "users"."username", "users"."profile_img_src" FROM "requests" JOIN "books" ON "requests"."books_id" = "books"."id" JOIN "users" ON "users"."id" = "requests"."from_users_id" WHERE "from_users_id" = $1 AND "active" = TRUE;`;
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

// deny book transfer request
router.put('/deny', (req, res) => {
    if (req.isAuthenticated()) {
        let queryText = `UPDATE "requests" SET "active" = FALSE WHERE "requests"."id" = $1;`;
        pool.query(queryText, [req.body.id]).then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error updating request in deny', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

// confirm transfer request
router.put('/confirm', (req, res) => {
    console.log(req.body);
    if (req.isAuthenticated()) {
        // get bookcase ID of user who requested book
        let queryTextOne = `SELECT "bookcases"."id" FROM "users" JOIN "bookcases" ON "users"."id" = "bookcases"."users_id" WHERE "users"."id" = $1;`;
        // set book's bookcases_id to new value 
        let queryTextTwo = `UPDATE "books" SET "bookcases_id" = $1 WHERE "books"."id" = $2;`;
        // set request active to false
        let queryTextThree = `UPDATE "requests" SET "active" = FALSE WHERE "requests"."id" = $1;`;
        pool.query(queryTextOne, [req.body.from_users_id]).then((results) => {
            pool.query(queryTextTwo, [results.rows[0].id, req.body.books_id]).then((results) => {
                pool.query(queryTextThree, [req.body.id]).then((results) => {
                    res.sendStatus(200);
                }).catch((error) => {
                    console.log('Error updating request in deny', error);
                    res.sendStatus(500);
                })
            }).catch((error) => {
                console.log('Error updating request in deny', error);
                res.sendStatus(500);
            });
        }).catch((error) => {
            console.log('Error updating request in deny', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
})

module.exports = router;