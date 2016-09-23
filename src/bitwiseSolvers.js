// TO DO:

// create cache
var cache = 0;

// check if in cache
(cache & (1 << i)) = 0;

// if off, toggle on
board[n] = 1 << i;
cache += (1 << i) // cache |= i << i

// if on, toggle off
board[n] = 0;
cache &= ~(1 << i)





board = Array(n);

// Helper functions:
//   Column test
//   Major diagonal test
majorCache = 0;

majorCache += 1 << (col - row + n - 1)



//   Minor diagonal test




//*****countNRooks******


window.countNRooksSolutions = function(n) {
// Initialize board
  var board = new Array(n);
  // initialize counter
  var counter = 0;


  // RECURSIVE FUNCTION (input)
  var pieceAdder = function(n) {
    if (n === 0) {
      count++;
    } else {
      board[n] += 1 << n - 1;
      while (board[n]) {
        if (!(cache & board[n])) {
          pieceAdder(n - 1); 
        }
        board[n] >>>= 1;
      }
    }
  };
  pieceAdder(n);
  return counter;
};

    //   if input is 0
    //     counter ++x
    //     Set row to 1 << n - 1
    //     while row
    //       Check for conflict
    //       If no conflict
    //         Recurse(row - 1)
  //       Zero fill bitshift right




//*****countNRQueens******


// Initialize board

// initialize counter

// RECURSIVE FUNCTION (input)
//   if input is 0
//     counter ++x
//   For each row
//     Set row to 1 << n - 1
//     while row
//       Check for conflict
//       If no conflict
//         Recurse(row - 1)
//       Zero fill bitshift right

