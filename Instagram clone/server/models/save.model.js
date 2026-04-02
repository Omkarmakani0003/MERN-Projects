const mongoose = require('mongoose')
const paginate = require('mongoose-paginate-v2')

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
saveSchema.plugin(paginate)
module.exports.save = mongoose.model('saves',saveSchema)