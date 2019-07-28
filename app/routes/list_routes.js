const express = require('express')

const passport = require('passport')

const List = require('../models/list')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404;

const requireOwnership = customErrors.requireOwnership;

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router();

//INDEX - get /lists
router.get('/mylist/', requireToken, (req, res, next) => {
    const id = req.user.id;
    List.find({ 'owner': id })
        .populate('videos')
        .then((lists) => {
            console.log(lists)
            res.status(200).json({ lists: lists })
        })
        .catch(next);
})


// CREATE -post /mylist
router.post('/mylist/', requireToken, (req, res, next) => {
    const id = req.user.id
    const newList = req.body.list
    newList.owner = id
    const user = req.user
    List.create(user)
        .then(list => {
            res.status(201).json({ list: list })
        })
        .catch(next);
})

// add to list -put /mylist
router.put('/mylist/:id', requireToken, (req, res, next) => {
    const listId = req.params.id
    const videoId = req.body.videoId
    // newList.owner = id

    List.findById(listId)
        .then(list => {
            list.videos.push(videoId)
            console.log("list  with video", list)
            return list.save()
        })
        .then(list => res.status(201).json({ list: list }))
        .catch(next);
})

// //Destroy - delete /mylist/:id
// router.delete('/mylist/:id', requireToken, (req, res, next) => {
//     const idList = req.params.id
//     List.findById(idList)
//         .then(handle404)
//         .then((list) => {
//             requireOwnership(req, list)
//             list.remove()
//         })
//         .then(() => res.sendStatus(204))
//         .catch(next)
// })

module.exports = router