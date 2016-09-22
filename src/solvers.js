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

  var newBoard = new Board({n: n});

  var count = 0;

  var pieceAdder = function(board, n) {
    if (n === 0) {
      count++;
    } else {
      for (var i = 0; i < board.get('n'); i++) {
        board.togglePiece(n - 1, i);
        if (!(board.hasColConflictAt(i))) {
          pieceAdder(board, n - 1);
        }
        board.togglePiece(n - 1, i);
      }
    }
  };

  pieceAdder(newBoard, n);

  var solutionCount = count; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  debugger;
  var newBoard = new Board({n: n});

  var pieceAdder = function(board, n) {
    if (n === 0) {
      return board;
    } else {
      for (var i = 0; i < board.get('n'); i++) {
        board.togglePiece(n - 1, i);
        if (!(board.hasAnyQueenConflictsOn(n - 1, i))) {
          var result = pieceAdder(board, n - 1);
          if (result !== undefined) {
            return result;
          }
        }

        board.togglePiece(n - 1, i);
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

  var pieceAdder = function(board, n) {
    if (n === 0) {
      solutionCount++;
    } else {
      for (var i = 0; i < board.get('n'); i++) {
        board.togglePiece(n - 1, i);
        if (!(board.hasAnyQueenConflictsOn(n - 1, i))) {
          var result = pieceAdder(board, n - 1);
        }

        board.togglePiece(n - 1, i);
      }
    }
  };

  pieceAdder(newBoard, n);  

  return solutionCount;
};
