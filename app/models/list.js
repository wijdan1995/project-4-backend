const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    videos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        required: true,
    }],
}, {
        timestamps: true,
        usePushEach: true,
        toJSON: {
            virtuals: true
        }
    });
// listSchema.virtual('listsTitle', {
//     ref: 'Video',
//     localField: 'videoTitle',
//     foreignField: 'title'
// });
listSchema.virtual('listsId', {
    ref: 'User',
    localField: '_id',
    foreignField: 'listId'
});


module.exports = mongoose.model('List', listSchema)
