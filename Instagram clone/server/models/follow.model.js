const mongoose = require('mongoose')
const aggregationPagination = require('mongoose-aggregate-paginate-v2')

const followSchema = new mongoose.Schema({

    following_id : {
      type : mongoose.Schema.Types.ObjectId,
      ref: 'users',
      index: true
    },

    follower_id : {
      type : mongoose.Schema.Types.ObjectId,
      ref: 'users',
      index: true
    },    

},
{
  timestamps: true 
}
)

followSchema.index({follower_id: 1, following_id: 1},{unique:1})
followSchema.index({following_id: 1, follower_id: 1})

followSchema.plugin(aggregationPagination)

module.exports.follow = mongoose.model('follows',followSchema)