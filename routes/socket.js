var express = require('express');
var router = express.Router();
var socket_io = require('socket.io');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('socket/index');
});

router.socket = function(server) {
  var io = socket_io.listen(server);

  io.on('connection', function(socket) {
    console.log('connect');


    var obj = {
      talk: function(word) {
        console.log(word);
        io.emit('say', word);
      },
      disconnect: function(event) {
        console.log(event);
      }
    }

    for (var key in obj) {
      socket.on(key, obj[key]);
    }
  });
}
module.exports = router;
