const express = require('express')
const router = express.Router()
const questionController = require('../controllers/controller-question')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource')
})

router
  .post('/post', questionController.postQuestion)

//   .post('/login', userController.logIn)

//   .post('/update', userController.updateUser)

//   .get('/findUser/:userId', userController.findOne)

//   .get('/findall', userController.findAll)

module.exports = router