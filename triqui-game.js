var triqui=null;

players = ["O","X"];

var winner = "";
var jugadas = 0;
var turn = 1;

getTriqui = () => {
    if(triqui==null){
        startGame();
    }
    return {turn, triqui};
}

hasWinner = () => {
    if(triqui[0][0]&&triqui[0][0]==triqui[1][1]&&triqui[0][0]==triqui[2][2]){
        winner = triqui[0][0];
        return true;
    }else if(triqui[0][2]&&triqui[0][2]==triqui[1][1]&&triqui[0][2]==triqui[2][0]) {
        winner = triqui[0][2];
        return true;
    }else{
        for (let index = 0; index < triqui.length; index++) {
            if(triqui[index][0]&&triqui[index][0]==triqui[index][1]&&triqui[index][0]==triqui[index][2]){
                winner = triqui[index][0];
                return true;
            }else if(triqui[0][index]&&triqui[0][index]==triqui[1][index]&&triqui[0][index]==triqui[2][index]){
                winner=triqui[0][index];
                return true;
            }
        }
    }
    return false;
}

getWinner = ()=>{
    return (winner==players[0])?1:2;
}

play = (i,j,player) => {
    if(!winner){
    jugadas++;
    triqui[i][j] = players[player-1];
    turn=(player==1)?2:1;
    }
}

startGame = () => {
    jugadas = 0;
    winner = "";
    turn = 1;
    triqui = [
                [undefined,undefined,undefined],
                [undefined,undefined,undefined],
                [undefined,undefined,undefined],
            ];
}


gameOver = ()=>{
    return jugadas>=8;
}



module.exports={
    getTriqui,
    hasWinner,
    getWinner,
    startGame,
    play,
    gameOver
}