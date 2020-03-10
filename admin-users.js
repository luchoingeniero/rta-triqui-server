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
    },
    addPoint(indexwin){
        indexwin=indexwin-1;
        let win = users[indexwin];
        win.points = win.points+1;
        users[indexwin]=win;
    },

    winner(indexwin){
        indexwin=indexwin-1;
        const indexLost = (indexwin==0)?1:0;
        let win = users[indexwin];
        let lost = users[indexLost];
        users[0]=win;
        users.splice(1, 1);
        users.push(lost);
    }

}
