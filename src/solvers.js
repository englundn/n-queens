/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {

  var size = n;
  var board = new Array(n);
  var cache = 0;

  var pieceAdder = function(n) {
    if (n === 0) {
      return board;
    } else {
      board[n - 1] = 1 << size - 1;
      while (board[n - 1]) {
        if (!(cache & board[n - 1])) {
          cache += board[n - 1];
          return pieceAdder(n - 1);
          cache -= board[n - 1];
        }
        board[n - 1] >>>= 1;
      }
    }
  };
  
  var bitIntegerToArray = function(number) {
    var pad = '00000000';
    var numberString = number.toString(2);
    return (pad.slice(0, n - numberString.length) + numberString).split('').map(function(value) {
      return Number(value);
    });
  };

  return pieceAdder(n).map(bitIntegerToArray);
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var size = n;
  var board = new Array(n);
  var cache = 0;
  var counter = 0;


  var pieceAdder = function(n) {
    // debugger;
    if (n === 0) {
      counter++;
    } else {
      board[n - 1] = 1 << size - 1;
      while (board[n - 1]) {
        if (!(cache & board[n - 1])) {
          cache += board[n - 1];
          pieceAdder(n - 1);
          cache -= board[n - 1];
        }
        board[n - 1] >>>= 1;
      }
    }
  };

  pieceAdder(n);
  return counter;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var newBoard = new Board({n: n});

  var columns = 0;
  var major = new Array(Math.max(2 * n - 1, 0));
  var minor = new Array(Math.max(2 * n - 1, 0));

  var isInCache = function(row, col) {
    return (columns & 1 << col) || major[col - row + n - 1] || minor[row + col];
  };

  var modifyCache = function(row, col, bool) {
    columns = bool ? columns + (1 << col) : columns - (1 << col); 
    major[col - row + n - 1] = bool;
    minor[row + col] = bool;
  };

  var pieceAdder = function(board, n) {
    if (n === 0) {
      return board;
    } else {
      for (var i = 0; i < board.get('n'); i++) {
        if (!isInCache(n - 1, i)) {
          board.togglePiece(n - 1, i);
          modifyCache(n - 1, i, true);

          var result = pieceAdder(board, n - 1);
          if (result !== undefined) {
            return result;
          }

          board.togglePiece(n - 1, i);
          modifyCache(n - 1, i, false);
        }
      }
    }
  };

  var solution = pieceAdder(newBoard, n);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));

  return solution ? solution.rows() : newBoard.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme

  var newBoard = new Board({n: n});

  var columns = 0;
  var major = new Array(Math.max(2 * n - 1, 0));
  var minor = new Array(Math.max(2 * n - 1, 0));

  var isInCache = function(row, col) {
    return (columns & 1 << col) || major[col - row + n - 1] || minor[row + col];
  };

  var modifyCache = function(row, col, bool) {
    columns = bool ? columns + (1 << col) : columns - (1 << col); 
    major[col - row + n - 1] = bool;
    minor[row + col] = bool;
  };

  var pieceAdder = function(board, n) {
    if (n === 0) {
      solutionCount++;
    } else {
      for (var i = 0; i < board.get('n'); i++) {
        if (!isInCache(n - 1, i)) { // column cache reduced from 600ms to 144ms
          board.togglePiece(n - 1, i);
          modifyCache(n - 1, i, true);
          var result = pieceAdder(board, n - 1);
          modifyCache(n - 1, i, false);
          board.togglePiece(n - 1, i);
        }
      }
    }
  };

  pieceAdder(newBoard, n);  

  return solutionCount;
};
