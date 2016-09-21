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

  var newBoard = new Board({n:n});

  var pieceAdder = function(board, n) {
    if (n === 0) {
      return board;
    }
    for (var i = 0; i < board.get('n'); i ++) {
      board.togglePiece(n - 1, i);
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(n - 1, i);        
      } else {
        return pieceAdder(board, n - 1)
      }
    }
  };

  var solution = pieceAdder(newBoard, n).rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var newBoard = new Board({n:n});

  var count = 0

  var pieceAdder = function(board, n) {
    if (n === 0) {
      count++;
    } else {
      for (var i = 0; i < board.get('n'); i ++) {
        board.togglePiece(n - 1, i);
        // console.log(i);
        // console.log(board.rows()[0]);
        // console.log(board.rows()[1])
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

  var newBoard = new Board({n:n});

  var pieceAdder = function(board, n) {
    if (n === 0) {
      return board;
    }
    for (var i = 0; i < board.get('n'); i ++) {
      board.togglePiece(n - 1, i);
      if (board.hasAnyQueensConflicts()) {
        board.togglePiece(n - 1, i);        
      } else {
        return pieceAdder(board, n - 1)
      }
    }
  };
  var a = pieceAdder(newBoard, n);
  console.log(a);

  var solution = pieceAdder(newBoard, n).rows();
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));

  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
