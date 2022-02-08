const express = require('express')
const auth = require('../middleware/auth.middleware')
const Task = require('../models/Task')
const router = express.Router({mergeParams: true})

router
  .route('/')
  .get(auth, async (req, res) => {
    try {
      const task = await Task.find({userId: req.user._id})
      res.status(200).send(task)
    } catch (e) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже"
      })
    }})
  .post(auth, async (req, res) => {
    try {
      const newTask = await Task.create({
        ...req.body,
      })
      res.status(201).send(newTask)
    } catch (e) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже"
      })
    }
  })

router.patch('/:taskId',auth, async (req, res) => {
  try {
    const {taskId} = req.params
    const editedList = await Task.findById(taskId)

    if (editedList.userId.toString() === req.user._id) {
      const updatedList = await Task.findByIdAndUpdate(taskId, req.body, {new: true})
      res.send(updatedList)
    } else {
      res.status(401).json({message: "Unauthorized"})
    }
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже"
    })
  }
})

router.delete('/:id',auth, async (req, res) => {
  try {
    const {id} = req.params
    const removedTask = await Task.findById(id)
    if (removedTask.userId.toString() === req.user._id) {
      await removedTask.remove()
      return res.send(null)
    } else {
      res.status(401).json({message: "Unauthorized"})
    }
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже"
    })
  }
})
module.exports = router
