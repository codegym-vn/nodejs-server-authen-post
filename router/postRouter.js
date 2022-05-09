const express = require('express');
const route = express.Router();
const multer = require('multer');
const upload = multer();
const authen = require('../middlewares/authen')
const postController = require('../controller/postController');
route.use(authen);
route.post('/add', upload.none(), postController.postRegister);

route.get('/list', upload.none(), postController.postList);
module.exports = route;