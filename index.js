var read = require('readline-sync');

var ticTac = function() {
  this.moves = [[1, 2, 3], 
                [4, 5, 6], 
                [7, 8, 9]];
  this.count = 0;
  this.currentPlayer = 'Player 1';
}

ticTac.prototype.drawGame = function() {
  console.log('\n' + 
    ' ' + this.moves[0][0] + ' | ' + this.moves[0][1] + ' | ' + this.moves[0][2] + ' \n' +
    '-----------\n' +
    ' ' + this.moves[1][0] + ' | ' + this.moves[1][1] + ' | ' + this.moves[1][2] + ' \n' +
    '-----------\n' +
    ' ' + this.moves[2][0] + ' | ' + this.moves[2][1] + ' | ' + this.moves[2][2] + ' \n'
  );
}

ticTac.prototype.getPosition = function(move) {
  var row = Math.ceil(move / 3) - 1;
  var col = (move - 1) % 3;
  return [row, col];
}

ticTac.prototype.getWinner = function(position) {
  var row = position[0];
  var col = position[1];
  if (this.moves[row][0] === this.moves[row][1] && this.moves[row][1] === this.moves[row][2]) {
    return true;
  } else if (this.moves[0][col] === this.moves[1][col] && this.moves[1][col] === this.moves[2][col]) {
    return true;
  } else if (this.moves[0][0] === this.moves[1][1] && this.moves[1][1] === this.moves[2][2]) {
    return true;
  } else if (this.moves[2][0] === this.moves[1][1] && this.moves[1][1] === this.moves[0][2]) {
    return true;
  }
  return false;
}

ticTac.prototype.checkForTie = function() {
  var count = 0;
  for (var i = 0; i < this.moves.length; i++) {
    for (var j = 0; j < this.moves[i].length; j++) {
      if (this.moves[i][j] === 'X' || this.moves[i][j] === 'O') {
        count++;
      }
    }
  }
  return count === (this.moves.length * 3);
}

ticTac.prototype.getMove = function() {
  var move = read.question(this.currentPlayer + ' enter move from 1-9: ');
  if (this.getPosition(move) === 'X' || this.getPosition(move) === 'O') {
    console.log('Spot is taken. Choose another move: ');
    this.getMove();
  } else if (!(move > 0) || !(move < 10)) {
    console.log('move must be a number from 1-9: ');
    this.getMove();
  } else {
    return move;
  }
}

ticTac.prototype.switchPlayer = function() {
  if (this.currentPlayer === 'Player 1') {
    this.currentPlayer = 'Player 2';
  } else {
    this.currentPlayer = 'Player 1';
  }
}

ticTac.prototype.start = function() {
  this.drawGame();
  var move = this.getMove();
  var position = this.getPosition(move);
  if (this.currentPlayer === 'Player 1') {
    this.moves[position[0]][position[1]] = 'X';
  } else {
    this.moves[position[0]][position[1]] = 'O';
  }
  if (this.getWinner(position)) {
    this.drawGame();
    console.log(this.currentPlayer + ' wins!');
  } else if (this.checkForTie()) {
    this.drawGame();
    console.log('This game is a tie!');
  } else {
    this.switchPlayer();
    this.start();
  }
}

var game = new ticTac();
game.start();

