const express = require('express')
const User = require("../models/User")
const auth = require('../middleware/auth.middleware')
const router = express.Router({mergeParams: true})

router.get('/:id', auth,  async (req, res) => {
  try {
    const {id} = req.params
    const {name, email} = await User.findById(id)
    res.send({name, email})
  } catch (e) {
    await res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже"
    })
  }
})

module.exports = router
