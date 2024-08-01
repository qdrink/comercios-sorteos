const express = require("express");
const router = express.Router();
const { registerCommerce, validationCommerce, deleteCommerce, listCommerce } = require('../controllers/commerceController')

router.get('/list', listCommerce);
router.post('/register', registerCommerce);
router.put('/validation', validationCommerce);
router.delete('/delete', deleteCommerce);

module.exports = router;