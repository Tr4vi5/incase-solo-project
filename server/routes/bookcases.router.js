const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// get all bookcases route for Discover view
router.get('/all', (req, res) => {
    if (req.isAuthenticated()) {
        let queryText = 'SELECT "bookcases".*, "users"."username", "users"."profile_img_src" FROM "bookcases" JOIN "users" ON "bookcases"."users_id" = "users"."id" AND "users"."id" != $1;';
        pool.query(queryText, [req.user.id]).then((results) => {
            console.log('all bookcases results', results.rows);
            
            res.send(results.rows);
        }).catch((error) => {
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(401);
    }
});// end get all bookcases

// get current user bookcase location
router.get('/user/location', (req, res) => {
    if (req.isAuthenticated()) {
        let queryTextOne = `SELECT "bookcases"."id" FROM "users" JOIN "bookcases" ON "users"."id" = "bookcases"."users_id" WHERE "users"."id" = $1;`;
        let queryTextTwo = `SELECT "latitude", "longitude" FROM "bookcases" WHERE "bookcases"."id" = $1;`;
        pool.query(queryTextOne, [req.user.id]).then((results) => {
            pool.query(queryTextTwo, [results.rows[0].id]).then((results) => {
                res.send(results.rows);
            }).catch((error) => {
                console.log('Error getting bookcase location', error);
                res.sendStatus(500);
            })
        }).catch((error) => {
            console.log('Error in bookcase ID get', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(401);
    }
});// end get current user bookcase location

//get current user bookcase and books for Manage Bookcase view
router.get('/user', (req, res) => {
    if (req.isAuthenticated()) {
        let queryText = 'SELECT * FROM "bookcases" JOIN "books" ON "bookcases"."id" = "books"."bookcases_id" WHERE "users_id" = $1;';
        pool.query(queryText, [req.user.id]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(401);
    }
});// end get current user bookcase


// check if currently logged in user has a bookcase
router.get('/check', (req,res) => {
    if (req.isAuthenticated()) {
        let queryText = 'SELECT * FROM "bookcases" WHERE "users_id" = $1;';
        pool.query(queryText, [req.user.id]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(401);
    }
}) // end check current user's bookcase

// update currently logged in user's bookcase location
router.put('/user/location', (req, res) => {
    if (req.isAuthenticated()) {
        let queryTextOne = `SELECT "bookcases"."id" FROM "users" JOIN "bookcases" ON "users"."id" = "bookcases"."users_id" WHERE "users"."id" = $1;`;
        let queryTextTwo = `UPDATE "bookcases" SET "latitude" = $1, "longitude" = $2 WHERE "id" = $3;`;
        pool.query(queryTextOne, [req.user.id]).then((results) => {
            pool.query(queryTextTwo, [req.body.lat, req.body.lng, results.rows[0].id])
                .then((results)=>{
                    res.send(results.rows)
                }).catch((error)=>{
                    console.log('Error updating bookcase location', error);
                    res.sendStatus(500);
                });
        }).catch((error)=>{
            console.log('Error getting bookcase ID in PUT route', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(401);
    }
}); // end update currently logged in user's bookcase location

// add user bookcase
router.post('/', (req, res) => {
    if (req.isAuthenticated()){
        let queryText = `INSERT INTO "bookcases" ("users_id", "latitude", "longitude") VALUES ($1, $2, $3);`;
        pool.query(queryText, [req.user.id, req.body.lat, req.body.lng]).then((results)=>{
            res.send(results.rows);
        }).catch((error)=>{
            console.log('Error in post', error);
            res.sendStatus(500);
        })
    } else { 
        res.sendStatus(401);
    }
});

module.exports = router;