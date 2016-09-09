var express = require('express');
var router = express.Router();
var socket_io = require('socket.io');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('socket/index');
});

router.socket = function(server) {
  var io = socket_io.listen(server);
  var count = 0;
  io.on('connection', function(socket) {
    // console.log('connect');
    count++;
    // console.log('当前连接数： ' + count);

    var obj = {
      all: function(message) {
        io.emit('all', message);
      },
      me: function(message) {
        console.log(message);
        if (message.action && message.action === 'getConnectCounts') {
          socket.emit('me', {
            connectCounts: count
          });
        } else {
          socket.emit('me', message);
        }
      },
      other: function(message) {
        socket.broadcast.emit('other', message)
      },
      disconnect: function(event) {
        count--;
        // console.log('disconnect');
        // console.log('当前连接数： ' + count);
      }
    }

    for (var key in obj) {
      socket.on(key, obj[key]);
    }
  });
}
module.exports = router;
