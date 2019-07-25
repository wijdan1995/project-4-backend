const express = require('express')

const passport = require('passport')

const Comment = require('../models/comment')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404;

const requireOwnership = customErrors.requireOwnership;

const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router();

//INDEX - get /comments
router.get('/videos/:id/comments', (req, res, next) => {

    Comment.find()
        .then((comments) => {
            res.status(200).json({ comments: comments })
        })
        .catch(next);
})


// CREATE -post /comments
router.post('/videos/:id/comments', requireToken, (req, res, next) => {
    const id = req.user.id
    // const video = req.video._id
    const newComment = req.body.comment
    newComment.userId = id
    newComment.userEmail = req.user.email
    // newComment.videoId = video
    console.log(req._id)

    // how to get the video id

    Comment.create(newComment)
        .then(comment => {
            res.status(201).json({ comment: comment })
        })
        .catch(next);
})


// //SHOW - get /comments/:id
// router.get('/videos/:id/comments', (req, res, next) => {
//     const videoId = req.params.id
//     Comment.findById(videoId)
//         .then(handle404)
//         .then((comment) => {
//             res.status(200).json({ comment: comment })
//         })
//         .catch(next)
// })


//Update -put/patch /comments/:id
router.put('/videos/:id/comments/:id', requireToken, removeBlanks, (req, res, next) => {
    const idComment = req.params.id;
    const updateComment = req.body.comment;
    // delete req.body.Comment.owner


    Comment.findById(idComment)
        .then(handle404)
        .then((comment) => {
            requireOwnership(req, comment)
            return Comment.update(updateComment)
        })
        .then((comment) => {
            res.status(201).json({ comment: comment })
        })
        .catch(next)
})


//Destroy - delete /comments/:id
router.delete('/videos/:id/comments/:id', requireToken, (req, res, next) => {
    const idcomment = req.params.id
    Comment.findById(idcomment)
        .then(handle404)
        .then((comment) => {
            requireOwnership(req, comment)
            Comment.remove()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})



module.exports = router