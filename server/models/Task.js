const {Schema, model} = require('mongoose')

const schema = new Schema({
  text: String,
  listId: {
    type: Schema.Types.ObjectId, ref: 'List'
  },
  userId: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  status: {
    type: String, enum: ['plan_tasks', 'process_tasks', 'ready_tasks']
  },
}, {
  timestamps: true
})

module.exports = model('Task', schema)
