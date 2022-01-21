
 /*----- constants -----*/
 const winningCombos = [
     [0,1,2],
     [3,4,5],
     [6,7,8],
     [0,3,6],
     [1,4,7],
     [2,5,8],
     [0,4,8],
     [2,4,6]
 ];

 /*----- app's state (variables) -----*/
 let board;
 let turn = 'X';
 let win;
 let scoreX = 0;
 let scoreO = 0;
 /*----- cached element references -----*/
 const squares = Array.from(document.querySelectorAll('#board div'));
 const messages = document.querySelector('h2');
 const scoreTrack = document.querySelector('h3');
 /*----- event listeners -----*/
 document.getElementById('board').addEventListener('click',handleTurn);
 document.getElementById('reset-button').addEventListener('click',init);
 /*----- functions -----*/
 function init(){
     board = [
         '','','',
         '','','',
         '','',''
     ]
     turn = 'X';
     win = null;
     render();
 }

 init();
 function render(){
     board.forEach(function(mark, index){
         squares[index].textContent = mark;
     });
     messages.textContent = win === 'T'? `That's a tie!`:win ? `${win} wins the game!` : `It's ${turn}'s turn`;
     scoreTrack.textContent = `The Score is X:${scoreX} O:${scoreO}`;
 }
 function handleTurn(event){
     let idx = squares.findIndex(function(square){
         return square === event.target;
     });
     //check if filled
     if (board[idx] === ''){
        board[idx] = turn;
        turn = turn === 'X' ? 'O' : 'X';
        win = getWinner();
        if (win === 'X'){
           scoreX++;
        } else if (win == 'O'){
           scoreO++;
        }
     }

     render();
 }

 function getWinner(){
    let winner = null;
    winningCombos.forEach(function(combo, index){
        if (board[combo[0]] && board[combo[0]] === 
            board[combo[1]] && board[combo[0]] === board[combo[2]]){
                winner = board[combo[0]];
            }
    });
    if (winner){
        return winner
    } else if (board.includes('')){
        return null
    } else{
        return 'T'
    }
 }
