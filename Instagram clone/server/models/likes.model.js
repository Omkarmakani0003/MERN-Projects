const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({

    post_id : {
      type : mongoose.Schema.Types.ObjectId,
      ref: 'posts'
    },
    
    auther_id : {
      type : mongoose.Schema.Types.ObjectId,
      ref: 'users'
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

module.exports.likes = mongoose.model('likes',likeSchema)