var http = require('http').Server();
var io = require('socket.io')(http);
var adminUsers = require('./admin-users');
var triqui = require('./triqui-game');
var joinEvent = require('./join-event');
var HOST = '192.168.1.7';
var PORT_SOCKET=3000;

var users = [];

var events = {
  join:'join',
  new_user:'users',
  play:'play',
  triqui:'triqui',
  winner:'hasWinner',
  newGame:'newGame'
}


io.on('connection', function(socket) {
  var user_id=-1;  
  socket.on(events.join, function(user) {
   joinEvent.join(io,user,adminUsers,events,triqui);
  });

  socket.on(events.play, function(data){
    console.log(data);
    triqui.play(data.i,data.j,data.player);
    io.emit(events.triqui,triqui.getTriqui());
    if(triqui.hasWinner()){
      adminUsers.addPoint(triqui.getWinner());
      io.sockets.emit( events.new_user , adminUsers.getUsers() );
      io.emit(events.winner,triqui.getWinner());
    }

  });

  socket.on(events.newGame,function(){
    console.log("uew Game");
    adminUsers.winner(triqui.getWinner());
    triqui.startGame();
    console.log(adminUsers.getUsers());
    console.log(triqui.getTriqui());
    io.sockets.emit( events.new_user , adminUsers.getUsers() );
    io.emit(events.triqui,triqui.getTriqui());

  });

  socket.on('disconnect', () => {
      console.log(user_id);
      console.log('user disconnected');
  });

});

http.listen(PORT_SOCKET, function(){
  console.log('Esperando Clientes on '+HOST+':'+PORT_SOCKET);
});