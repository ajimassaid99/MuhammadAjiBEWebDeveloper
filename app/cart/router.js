const router = require('express').Router();
const CartController = require('./controller');

router.get('/Cart',CartController.getCart);

router.put('/Cart',CartController.updateCart);

module.exports = router;