const mongoose = require('mongoose')

const storySchema = new mongoose.Schema({

    stories : [{
        story_url: { 
            type: String, 
            required: true 
        },
        view: { 
            type: Array, 
            default: []
        },
    }],

    user_id : {
      type : mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },  
  
},
{
  timestamps: true 
}
)

module.exports.stories = mongoose.model('stories',storySchema)