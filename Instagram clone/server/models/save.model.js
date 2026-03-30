const mongoose = require('mongoose')

const saveSchema = new mongoose.Schema({

    post_id : {
      type : mongoose.Schema.Types.ObjectId,
      ref: 'posts'
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

module.exports.save = mongoose.model('saves',saveSchema)