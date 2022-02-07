const {Schema, model} = require('mongoose')

const schema = new Schema({
  listId: Number,
  text: String,
  status: {
    type: String, enum: ['plan_tasks', 'process_tasks', 'ready_tasks']
  },
}, {
  timestamps: true
})

module.exports = model('Task', schema)
