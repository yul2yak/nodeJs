var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    res.sendFile(__dirname + '/game.html');
});

module.exports = router;