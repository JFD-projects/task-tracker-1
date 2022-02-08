const {Schema, model} = require('mongoose')

const schema = new Schema({
  name: String,
  color: String,
  userId: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
}, {
  timestamps: true
})

module.exports = model('List', schema)
