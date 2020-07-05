const express = require('express');
const router = express.Router();
const uController = require('../controllers/userController');
const { celebrate, Segments, Joi } = require('celebrate')

router.post('/users', celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8)
    })  
  }),
  uController.registerUser);

router.post('/login', uController.login);

router.post('/logout', uController.logout);


module.exports = router;