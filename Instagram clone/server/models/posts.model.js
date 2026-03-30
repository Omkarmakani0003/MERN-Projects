const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({

    post : {
      type : String,
      default: null
    },

    text : {
      type : String,
      default: null
    },

    likes_count : {
      type : Number,
      default: 0
    },

    comments_count : {
      type : Number,
      default: 0
    },

    duration : {
      type : Number,
      default: null
    },

    user_id : {
      type : mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },    

},
{
  timestamps: true 
}
)

module.exports.post = mongoose.model('posts',postSchema)