var User = require('./user');
var users = [];
module.exports= {
   getUsers:()=>{
    return users;
   },

    exists:(user)=>{
        for (let index = 0; index < users.length; index++) {
            const element = users[index];
            if(element['nickname']==user){
                return true;
            }
            
        }
        return false;
    },
    add:(user)=>{
        users.push(new User(user,0));
        return users.length;
    },

    remove:(user)=>{
        for (let index = 0; index < users.length; index++) {
            const element = users[index];
            if(element==user){
                delete users[index];
                break;
            }
            
        }
    }

}
