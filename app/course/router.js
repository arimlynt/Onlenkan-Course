var express = require('express');
var router = express.Router();
const{ index, viewCreate, actionCreate, viewEdit, actionEdit, actionDelete } = require('./controller')
const multer = require('multer')
const os = require('os')

const {isLoginAdmin} = require('../midleware/auth')

router.use(isLoginAdmin)
router.get('/', index);
router.get('/create', viewCreate);
router.post('/create',multer({dest: os.tmpdir()}).single('image'), actionCreate);
router.get('/edit/:id', viewEdit);
router.put('/edit/:id',multer({dest: os.tmpdir()}).single('image'), actionEdit);
router.delete('/delete/:id', actionDelete);

module.exports = router;
