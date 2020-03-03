var http = require('http').Server();
var io = require('socket.io')(http);
var adminUsers = require('./admin-users');
var HOST = 'localhost';
var PORT_SOCKET=3000;

var users = [];




io.on('connection', function(socket) {
  var user_id=-1;  
  socket.on('join', function(user) {
      console.log(user);
      if(user.id&&adminUsers.exists(user.nickname)){
        io.sockets.emit('join-'+user.nickname,{id:user.id,data: adminUsers.getUsers()});
      }else if(!adminUsers.exists(user.nickname)){
          console.log("users",adminUsers.getUsers());
          user_id = adminUsers.add(user.nickname);
          io.sockets.emit('join-'+user.nickname,{id:user_id,data: adminUsers.getUsers()});
          io.sockets.emit('users',adminUsers.getUsers());
      }else{
          io.sockets.emit('join-'+user.nickname,"error");
      }
      
  });

  socket.on('disconnect', () => {
      console.log(user_id);
      console.log('user disconnected');
  });

});

http.listen(PORT_SOCKET, function(){
  console.log('Esperando Clientes on '+HOST+':'+PORT_SOCKET);
});