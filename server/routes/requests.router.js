const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// get all requests for specific book
router.get('/:id', (req, res) => {
    if (req.isAuthenticated()) {
        let queryText = `SELECT * FROM "requests" WHERE "books_id" = $1 AND "active" = TRUE;`;
        pool.query(queryText, [req.params.id]).then((results) => {
            res.send(results.rows)
        }).catch((error) => {
            console.log('Error getting requests', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(401);
    }
})

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
        res.sendStatus(401);
    }
});

// update viewed messages to be seen
router.put('/user/incoming/read', (req, res) => {
    if (req.isAuthenticated()) {
        let queryText = `UPDATE "requests" SET "seen" = true WHERE "to_users_id" = $1;`;
        pool.query(queryText, [req.user.id]).then((results)=>{
            res.sendStatus(200);
        }).catch((error)=>{
            console.log('Error setting requests to seen', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(401);
    }
})

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
});

// get all messages for current request
router.get('/messages/:id', (req, res) => {
    if (req.isAuthenticated()) {
        console.log(req.params.id);
        let queryText = `SELECT "messages".*, "users"."username", "users"."profile_img_src" FROM "messages" JOIN "users" ON "messages"."from_users_id" = "users"."id" WHERE "requests_id" = $1;`;
        pool.query(queryText, [req.params.id]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('Error getting messages from db', error);
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

// post new message to request
router.post('/messages', (req, res) => {
    console.log('Success', req.body);
    if (req.isAuthenticated()) {
        if (req.user.id === req.body.request.to_users_id) {
            let queryText = `INSERT INTO "messages" ("to_users_id", "from_users_id", "requests_id", "body") VALUES ($1, $2, $3, $4);`;
            pool.query(queryText, [req.body.request.from_users_id, req.user.id, req.body.request.id, req.body.message]).then((results) => {
                console.log('Succes in posting new message', results.rows);
                res.sendStatus(201);
            }).catch((error) => {
                console.log('Error in posting new message', error);
                res.sendStatus(500);
            });
        } else if (req.user.id === req.body.request.from_users_id) {
            let queryText = `INSERT INTO "messages" ("to_users_id", "from_users_id", "requests_id", "body") VALUES ($1, $2, $3, $4);`;
            pool.query(queryText, [req.body.request.to_users_id, req.user.id, req.body.request.id, req.body.message]).then((results) => {
                console.log('Succes in posting new message', results.rows);
                res.sendStatus(201);
            }).catch((error) => {
                console.log('Error in posting new message', error);
                res.sendStatus(500);
            });
        }
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
        let queryTextThree = `UPDATE "requests" SET "active" = FALSE WHERE "requests"."books_id" = $1;`;
        pool.query(queryTextOne, [req.body.from_users_id]).then((results) => {
            pool.query(queryTextTwo, [results.rows[0].id, req.body.books_id]).then((results) => {
                pool.query(queryTextThree, [req.body.books_id]).then((results) => {
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
});

// Count all active and unseen requests for currently logged in user
router.get('/user/unread', (req, res) => {
    if (req.isAuthenticated()) {
        let queryText = `SELECT COUNT(*) FROM "requests" WHERE "active" = true AND "seen" = false AND "to_users_id" = $1;`;
        pool.query(queryText, [req.user.id]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('Error getting messages from db', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
})

module.exports = router;