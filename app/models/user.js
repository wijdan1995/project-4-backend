const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    required: true,
    default: false
  },
  name: {
    type: String,
    required: true,
    unique: true,
    // uppercase: true
  },
  // list: {
  //   type: String
  // },
  token: String
}, {
    timestamps: true,
    toObject: {
      // remove `hashedPassword` field when we call `.toObject`
      transform: (_doc, user) => {
        delete user.hashedPassword
        return user
      },
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  })

userSchema.virtual('examples', {
  ref: 'Example',
  localField: '_id',
  foreignField: 'owner'
});

userSchema.virtual('videos', {
  ref: 'Video',
  localField: '_id',
  foreignField: 'owner'
});

userSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'owner'
});
userSchema.virtual('lists', {
  ref: 'List',
  localField: '_id',
  foreignField: 'owner'
});

module.exports = mongoose.model('User', userSchema)
