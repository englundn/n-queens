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


// Helper functions:
//   Column test
//   Major diagonal test
//   Minor diagonal test


//*****countNRooks******



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

