const mongoose = require('mongoose')
const pagination = require('mongoose-paginate-v2')
const aggregationPagination = require('mongoose-aggregate-paginate-v2')

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

postSchema.plugin(aggregationPagination)

module.exports.post = mongoose.model('posts',postSchema)