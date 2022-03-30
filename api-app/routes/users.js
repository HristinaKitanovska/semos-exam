var express = require('express');
var router = express.Router();
const controller = require('../controllers/users');
const jwt = require('express-jwt') 
const response = require('../lib/response_handler')

require('dotenv').config();


router.get('/', controller.getAllUsers)
      .get('/:id', controller.getIDUser)
      .post('/', controller.register)
      .post('/login', controller.login)
      .patch('/:id', controller.patch)
      .delete('/:id', controller.delete)

module.exports = router;
