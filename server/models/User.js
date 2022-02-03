const {Schema, model} = require('mongoose')

const schema = new Schema({
  name: String,
  email: {
    type: String, required: true, unique: true
  },
  password: String,
  image: String,
  lists: [{
    type: Schema.Types.ObjectId, ref: 'List'
  }]
}, {
  timestamps: true
})

module.exports = model('User', schema)
