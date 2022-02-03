const express = require('express')
const List = require('../models/List')
const router = express.Router({mergeParams: true})

router.get('/', async (req, res) => {
  try {
    const list = await List.find()
    res.status(200).send(list)
  } catch (e) {
    res.stats(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже"
    })
  }
})

module.exports = router
