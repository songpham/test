'use strict'
let start = new Date();
let end;

/**
 * Prettify result
 * @param  {[array]} result
 * @return null
 */
function printSquare(result, isShowTime) {
  if (Array.isArray(result)) { // check is square data
    if (isShowTime) {
      // execution time and memory
      end = new Date() - start;
      console.info('Execution time: %dms', end);
      console.info('Time/memory complexity: O(n) / O(n)');
      const used = process.memoryUsage().heapUsed / 1024 / 1024;
      console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
    }
    // start print square data
    let i, j, line;
    for (i = 0; i < result.length; i++) {
      line = [];
      for (j = 0; j < result.length; j++) {
        line.push(result[i][j]);
      }
      console.log(line);
    }
  } else {
    console.log(result)
  }
}

/**
 * rotate data 90 degrees clockwise
 * @param  {[array]} original data 2D square grid n * n
 * @return {[array]} data after rotate data 90 degrees clockwise
 */
function rotate(data) {
  let squareSize = data.length;
  let col, row, first, last, offset, top, rightSide, bottom, leftSide;
  for (row = 0; row < squareSize / 2; row++) {
    first = row;
    last = squareSize - first - 1
    for (col = first; col < last; col++) {
      // get current y position
      offset = col - first;
      // save position
      top = data[first][col];
      rightSide = data[col][last];
      bottom = data[last][last - offset];
      leftSide = data[last - offset][first];
      // set position to square data
      data[first][col] = leftSide;
      data[col][last] = top;
      data[last][last - offset] = rightSide;
      data[last - offset][first] = bottom;
    }
  }
  return data;
}

/**
 * wrapper rotate data 90 degrees clockwise for validation and time running
 * @param  {[array]} original data 2D square grid n * n
 * @param  {[integer]} count times running
 * @return {[array]} data after rotate data 90 degrees clockwise
 */
function rotateTime(data, K = 1) {
  if (isNaN(K) || K < 1) {
    return 'error K';
  }
  if (Array.isArray(data) === false || data.length !== data[0].length) { // check is square data
    return 'error data';
  }
  console.info('Original Square:');
  printSquare(data);
  start = new Date(); // start count time
  K = K % 4;
  for (let i = 0; i < K; i++) {
    data = rotate(data);
  }
  return data;
}

let grid = [
  [0, 16, 255],
  [8, 128, 32],
  [0, 0, 0]
];

// let grid = [
//   [1, 2, 3, 4],
//   [5, 6, 7, 8],
//   [9, 0, 1, 2],
//   [3, 4, 5, 6]
// ];

// [ 0, 8, 0 ]
// [ 0, 128, 16 ]
// [ 0, 32, 255 ]

printSquare(rotateTime(grid, 1), true);
