// https://www.youtube.com/watch?v= + videoId
const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    videoId: {
        type: String,
        required: true,
        unique: true
    },
    source: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
        timestamps: true
    })

videoSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'videoId'
});


module.exports = mongoose.model('Video', videoSchema)
