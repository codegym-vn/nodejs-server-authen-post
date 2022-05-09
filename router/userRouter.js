const express = require('express');
const route = express.Router();
const multer = require('multer');
const upload = multer();
const userController = require('../controller/userController');
route.get('/register', (req, res) => 
{ 
  res.render('register');
});
route.post('/register', upload.none(), userController.userRegister);
route.get('/login', (req, res) => 
{ 
  res.render('login');
});

route.get('/success', (req, res) => 
{ 
  res.render('loginSuccess');
});
route.post('/login', upload.none(), userController.userLogin);
module.exports = route;
