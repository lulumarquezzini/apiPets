const express = require('express');
const router = express.Router();
const pController = require('../controllers/productController');
const { celebrate, Segments, Joi } = require('celebrate');

router.get('/products', pController.list);

router.post('/products', celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string(),
      category: Joi.string().required(),
      price: Joi.string().regex(/^(\d{1,3}(\.\d{3})*|\d+)(\,\d{2})?$/),
      stock: Joi.number().required()
    })
  }),
  pController.create);

router.put('/products/:id', celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string(),
      category: Joi.string().required(),
      price: Joi.string().regex(/^(\d{1,3}(\.\d{3})*|\d+)(\,\d{2})?$/),
      stock: Joi.number().required()
    })
  }),
  pController.update);

router.delete('/products/:id', pController.destroy);




module.exports = router;