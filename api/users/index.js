var express = require('express');
var router = express.Router();

const controller = require('./users.controller');

router.get('/', controller.index);

router.get('/:id', controller.show);

router.delete('/:id', controller.destory);

router.post('/', controller.create);

module.exports = router;
