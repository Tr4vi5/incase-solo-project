const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// get all books for specific bookcase on Discover view
router.get('/user/:id', (req, res) => {
    if (req.isAuthenticated()) {
        queryText = 'SELECT * FROM "books" WHERE "bookcases_id" = $1;';
        pool.query(queryText, [req.params.id]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('Could not retrieve books', error);
            res.sendStatus(500)
        });
    } else {
        res.sendStatus(403);
    }
});

// add new book to current user's bookcase
router.post('/', (req, res) => {
    if (req.isAuthenticated()) {
        console.log(req.body);
        let queryTextOne = `SELECT "bookcases"."id" FROM "bookcases" JOIN "users" ON "users"."id" = "bookcases"."users_id" WHERE "users"."id" = $1 LIMIT 1;`;
        let queryTextTwo = `INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
        pool.query(queryTextOne, [req.user.id]).then((results) => { // Get bookcase ID of currently logged in user
            // using the bookcase ID result of the currently logged in user, post new book to database
            pool.query(queryTextTwo, [req.body.title, req.body.author, req.body.release_year, req.body.genre, req.body.cover_src, req.body.isbn, req.body.synopsis, results.rows[0].id])
                .then((results) => {
                    res.sendStatus(201);
                }).catch((error) => {
                    console.log('Error in new book post INSERT', error);
                    res.sendStatus(500);
                });
        }).catch((error) => {
            console.log('Error in new book post SELECT', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;