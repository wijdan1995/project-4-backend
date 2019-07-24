const express = require('express')

const bcrypt = require('bcrypt')

const bcryptSaltRounds = 10

const errors = require('../../lib/custom_errors')

const BadParamsError = errors.BadParamsError

const User = require('../models/user')

const router = express.Router()

// SIGN UP
// POST /sign-up-admin
router.post('/sign-up-admin', (req, res, next) => {
    // start a promise chain, so that any errors will pass to `handle`
    Promise.resolve(req.body.credentials)
        // reject any requests where `credentials.password` is not present, or where
        // the password is an empty string
        .then(credentials => {
            if (!credentials ||
                !credentials.password ||
                credentials.password !== credentials.password_confirmation) {
                throw new BadParamsError()
            }
        })
        // generate a hash from the provided password, returning a promise
        .then(() => bcrypt.hash(req.body.credentials.password, bcryptSaltRounds))
        .then(hash => {
            // return necessary params to create a user
            return {
                email: req.body.credentials.email,
                hashedPassword: hash,
                // to create it as admin
                admin: true
            }
        })
        // create user with provided email and hashed password
        .then(user => User.create(user))
        // send the new user object back with status 201, but `hashedPassword`
        // won't be send because of the `transform` in the User model
        .then(user => res.status(201).json({ user: user.toObject() }))
        // pass any errors along to the error handler
        .catch(next)
})


module.exports = router
