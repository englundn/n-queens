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

  var newBoard = new Board({n: n});

  var pieceAdder = function(board, n) {
    if (n === 0) {
      return board;
    }
    for (var i = 0; i < board.get('n'); i ++) {
      board.togglePiece(n - 1, i);
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(n - 1, i);        
      } else {
        return pieceAdder(board, n - 1);
      }
    }
  };

  var solution = pieceAdder(newBoard, n).rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var board = new Board({n: n});
  var count = 0;
  var columns = new Array(n);

  var pieceAdder = function(n) { // not passing in board as parameter improved by 300ms
    if (n === 0) {
      count++;
    } else {
      for (var i = 0; i < board.get('n'); i++) {
        if (!columns[i]) { // column cache reduced from 10s to 42ms
          board.togglePiece(n - 1, i);
          columns[i] = true;

          pieceAdder(n - 1);

          board.togglePiece(n - 1, i);
          columns[i] = false;
        }
      }
    }
  };
  
  pieceAdder(n);

  var solutionCount = count; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  debugger;
  var newBoard = new Board({n: n});

  var columns = new Array(n);
  var major = new Array(Math.max(2 * n - 1, 0));
  var minor = new Array(Math.max(2 * n - 1, 0));

  var isInCache = function(row, col) {
    return columns[col] || major[col - row + n - 1] || minor[row + col];
  };

  var modifyCache = function(row, col, bool) {
    columns[col] = bool;
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

  var columns = new Array(n);
  var major = new Array(Math.max(2 * n - 1, 0));
  var minor = new Array(Math.max(2 * n - 1, 0));

  var isInCache = function(row, col) {
    return columns[col] || major[col - row + n - 1] || minor[row + col];
  };

  var modifyCache = function(row, col, bool) {
    columns[col] = bool;
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
