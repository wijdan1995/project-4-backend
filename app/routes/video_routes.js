const express = require('express')

const passport = require('passport')

//import the model of video
const video = require('../models/video')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404;

const requireOwnership = customErrors.requireOwnership;


const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router();

//INDEX - get /videos
router.get('/videos', (req, res, next) => {

    video.find()
        .then((videos) => {
            res.status(200).json({ videos: videos })
        })
        .catch(next);
})


// CREATE -post /videos
router.post('/videos', requireToken, (req, res, next) => {
    const id = req.user.id
    const newvideo = req.body.video
    newvideo.owner = id

    video.create(newvideo)
        .then(video => {
            res.status(201).json({ video: video })
        })
        .catch(next);
})


//SHOW - get /videos/:id
router.get('/videos/:id', (req, res, next) => {
    const videoId = req.params.id
    video.findById(videoId)
        .then(handle404)
        .then((video) => {
            res.status(200).json({ video: video })
        })
        .catch(next)
})


//Update -put/patch /videos/:id
router.put('/videos/:id', requireToken, (req, res, next) => {
    const idVideo = req.params.id;
    const updateVideo = req.body.video;
    delete req.body.video.owner


    video.findById(idVideo)
        .then(handle404)
        .then((video) => {
            requireOwnership(req, video)
            return video.update(updateVideo)
        })
        .then((video) => {
            res.status(201).json({ video: video })
        })
        .catch(next)
})


//Destroy - delete /videos/:id
router.delete('/videos/:id', requireToken, (req, res, next) => {
    const idVideo = req.params.id
    video.findById(idVideo)
        .then(handle404)
        .then((video) => {
            requireOwnership(req, video)
            video.remove()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})



module.exports = router