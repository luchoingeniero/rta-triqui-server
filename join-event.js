join=(io,user,adminUsers,events,triqui)=>{
    var join_event = events.join+'-'+user.nickname;
    user_id = joinUser(user,adminUsers);
        
        if(user_id!=null){
        io.sockets.emit( join_event, {id:user_id,users:adminUsers.getUsers(),triqui:triqui.getTriqui()} );
        io.sockets.emit( events.new_user , adminUsers.getUsers() );
        }else{
        io.sockets.emit(join_event,"error");
        }

    }

joinUser = (user,adminUsers)=>{
        if(user.id&&adminUsers.exists(user.nickname)){
          return user.id;
        }else if(!adminUsers.exists(user.nickname)){
            return adminUsers.add(user.nickname);
        }else{
            return null;
        }
}

module.exports={
    join
}