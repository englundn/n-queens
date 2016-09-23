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

  var size = n;
  var board = new Array(n);
  var columns = 0;
  var majorCache = 0;
  var minorCache = 0;

  var isInCache = function(row, col) {
    return (columns & 1 << col) || (majorCache & 1 << (col - row + n - 1))
    || (minorCache & 1 << col + row);
  };

  var modifyCache = function(row, col, bool) {
    columns = bool ? columns + (1 << col) : columns - (1 << col); 
    majorCache = bool ? majorCache + (1 << col - row + n - 1) : majorCache - (1 << col - row + n - 1);
    minorCache = bool ? minorCache + (1 << col + row) : minorCache - (1 << col + row);
  };

  var pieceAdder = function(n) {
    // debugger;
    if (n === 0) {
      return board;
    } else {
      board[n - 1] = 1 << size - 1;
      while (board[n - 1]) {
        if (!(isInCache(n - 1, Math.log2(board[n - 1])))) {
          modifyCache(n - 1, Math.log2(board[n - 1]), true);
          var result = pieceAdder(n - 1);
          if (result) {
            return result;
          }
          modifyCache(n - 1, Math.log2(board[n - 1]), false);
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

  pieceAdder(n);

  return board.map(bitIntegerToArray);
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var size = n;
  var board = new Array(n);
  var columns = 0;
  var majorCache = 0;
  var minorCache = 0;
  var counter = 0;

  var isInCache = function(row, col) {
    return (columns & 1 << col) || (majorCache & 1 << (col - row + n - 1))
    || (minorCache & 1 << col + row);
  };

  var modifyCache = function(row, col, bool) {
    columns = bool ? columns + (1 << col) : columns - (1 << col); 
    majorCache = bool ? majorCache + (1 << col - row + n - 1) : majorCache - (1 << col - row + n - 1);
    minorCache = bool ? minorCache + (1 << col + row) : minorCache - (1 << col + row);
  };

  var pieceAdder = function(n) {
    // debugger;
    if (n === 0) {
      counter++;
    } else {
      board[n - 1] = 1 << size - 1;
      while (board[n - 1]) {
        if (!(isInCache(n - 1, Math.log2(board[n - 1])))) {
          modifyCache(n - 1, Math.log2(board[n - 1]), true);
          pieceAdder(n - 1);
          modifyCache(n - 1, Math.log2(board[n - 1]), false);
        }
        board[n - 1] >>>= 1;
      }
    }
  };

  pieceAdder(n);

  return counter;
};
