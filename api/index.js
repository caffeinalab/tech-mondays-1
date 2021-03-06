const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)

server.listen(process.env.VIRTUAL_PORT || 80, function() {
  console.log('Listening', server.address())
})

app.get('/rotate/:direction', function(req, res) {
  const {direction} = req.params
  const message = direction === 'left'
    ? 'La faccia sinistra di questo cubo è blu'
    : 'La faccia destra di questo cubo è rosa'

  io.sockets.emit('rotate', direction)
  res.json({success: true, message})
})
