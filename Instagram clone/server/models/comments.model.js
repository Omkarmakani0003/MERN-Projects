const mongoose = require('mongoose')

const CommetSchema = new mongoose.Schema({

    comment : {
        type: String, 
        required: true 
    },

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

module.exports.comments = mongoose.model('comments',CommetSchema)