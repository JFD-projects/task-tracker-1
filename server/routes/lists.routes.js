const express = require('express')
const auth = require('../middleware/auth.middleware')
const List = require('../models/List')
const Task = require('../models/Task')
const router = express.Router({mergeParams: true})

router
  .route('/')
  .get(auth, async (req, res) => {
  try {
    const list = await List.find({userId: req.user._id})
    res.status(200).send(list)
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже"
    })
  }})
  .post(auth, async (req, res) => {
      try {
        const newList = await List.create({
          ...req.body,
        })
        res.status(201).send(newList)
      } catch (e) {
        res.status(500).json({
          message: "На сервере произошла ошибка. Попробуйте позже"
        })
      }
    })

router.delete('/:id',auth, async (req, res) => {
  try {
    const {id} = req.params
    const removedList = await List.findById(id)
    if (removedList.userId.toString() === req.user._id) {
      await removedList.remove()
      await Task.remove({listId: id})
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

router.patch('/:listId',auth, async (req, res) => {
  try {
    const {listId} = req.params
    const editedList = await List.findById(listId)

    if (editedList.userId.toString() === req.user._id) {
      const updatedList = await List.findByIdAndUpdate(listId, req.body, {new: true})
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

module.exports = router
