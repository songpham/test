'use strict'
let start;
let end;
let numberRoomProvide;
let releaseCount;
let roomExpiredDate = [];
let i;

/**
 * Prettify input
 * @param  {[array]} arrivals     A list for arrival time of booking
 * @param  {[array]} departures   A list for the departure time of booking
 * @param  {[integer]} K          A count of rooms availlable
 * @return null
 */
function printInput(arrivals, departures, K) {
  console.log('Input:');
  console.log('-------------');
  console.log('Arrivals: ', arrivals);
  console.log('Departures: ', departures);
  console.log('K: ', K);
  console.log('-------------');
}

/**
 * Prettify result
 * @param  {[array]} result
 * @return null
 */
function printResult(result) {
  console.log('Output:', result);
  // execution time and memory
  end = new Date() - start;
  console.info('Execution time: %dms', end);
  console.info('Time/memory complexity: Time O(n log(n)) / O(n)');
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
}

/**
 * Validate input
 * @param  {[array]} arrivals     A list for arrival time of booking
 * @param  {[array]} departures   A list for the departure time of booking
 * @param  {[integer]} K          A count of rooms availlable
 * @return null
 */
let validateInput = function(arrivals, departures, K) {
  if (!Array.isArray(arrivals)) {
    throw `Arrivals must be an array`;
  }
  if (!Array.isArray(departures)) {
    throw `Departures must be an array`;
  }
  if (arrivals.length !== departures.length) {
    throw `Arrivals length is not equal with Departures`;
  }
  if (!Number.isInteger(K) || K < 1) {
    throw `K must be an integer and more than zero`;
  }
};

/**
 * Start reservation arrivals, departures to K rooms
 * @param  {[array]} arrivals     A list for arrival time of booking
 * @param  {[array]} departures   A list for the departure time of booking
 * @param  {[integer]} K          A count of rooms availlable
 * @return {[boolean]} true or false
 */
let implementReservation = function(arrivals, departures, K) {
  let numberOfRooms = arrivals.length;
  let roomInUse = 0;
  let iArrival = 0;
  let iDeparture = 0;
  while (iArrival < numberOfRooms && iDeparture < numberOfRooms) {
    if (arrivals[iArrival] < departures[iDeparture]) {
      iArrival++;
      roomInUse++; // give room to a user.
      if (roomInUse > K) { // If the current count > rooms availlable
        return false;
      }
    } else {
      iDeparture++;
      roomInUse--; // a user leave room.
    }
  }
  return true;
};

/**
 * Entry function for reservation
 * @param  {[array]} arrivals     A list for arrival time of booking
 * @param  {[array]} departures   A list for the departure time of booking
 * @param  {[integer]} K          A count of rooms availlable
 * @return {[boolean]} true or false
 */
let hotelReservation = function(arrivals, departures, K) {
  printInput(arrivals, departures, K);
  start = new Date(); // start check time
  validateInput(arrivals, departures, K);
  arrivals.sort(function(a, b) { return a - b; });
  departures.sort(function(a, b) { return a - b; });
  return implementReservation(arrivals, departures, K);
};

printResult(hotelReservation(
  [1, 3, 5], // arrivals
  [2, 6, 10], // departures
  1 // K
  // [13, 14, 36, 19, 44, 1, 45, 4, 48, 23, 32, 16, 37, 44, 47, 28, 8, 47, 4, 31, 25, 48, 49, 12, 7, 8],
  // [28, 27, 61, 34, 73, 18, 50, 5, 86, 28, 34, 32, 75, 45, 68, 65, 35, 91, 13, 76, 60, 90, 67, 22, 51, 53],
  // 14,
  // [21, 46, 30, 5, 12, 27, 44, 48, 6, 3, 14, 16, 21, 2, 19, 10, 19],
  // [28, 51, 74, 26, 55, 59, 85, 50, 26, 42, 63, 51, 64, 38, 19, 33, 24],
  // 11,
  // [11, 0, 28, 23, 14, 12, 10, 18, 5, 5, 34, 21, 26],
  // [35, 30, 35, 71, 59, 21, 59, 58, 48, 40, 59, 22, 27],
  // 8,
  // [35, 8, 23, 22, 35, 6, 48, 45, 33, 43, 37, 12, 42, 3, 31, 38, 5, 33, 15, 17, 0, 45, 11, 16, 43, 15, 42, 2, 41, 0, 27, 37, 25, 17, 42, 24, 23, 11, 4, 29, 39, 6, 10, 42, 16, 17, 39, 1, 37, 34, 21, 25, 21, 43, 21, 14, 30, 30, 42, 32, 28, 25, 0, 47, 37, 35, 8, 23, 22, 35, 6, 48, 45, 33, 43, 37, 12, 42, 3, 31, 38, 5, 33, 15, 17, 0, 45, 11, 16, 43, 15, 42, 2, 41, 0, 27, 37, 25, 17, 42, 24, 23, 11, 4, 29, 39, 6, 10, 42, 16, 17, 39, 1, 37, 34, 21, 25, 21, 43, 21, 14, 30, 30, 42, 32, 28, 25, 0, 47, 37, 35, 8, 23, 22, 35, 6, 48, 45, 33, 43, 37, 12, 42, 3, 31, 38, 5, 33, 15, 17, 0, 45, 11, 16, 43, 15, 42, 2, 41, 0, 27, 37, 25, 17, 42, 24, 23, 11, 4, 29, 39, 6, 10, 42, 16, 17, 39, 1, 37, 34, 21, 25, 21, 43, 21, 14, 30, 30, 42, 32, 28, 25, 0, 47, 37],
  // [43, 32, 34, 46, 74, 50, 95, 62, 59, 79, 83, 19, 88, 34, 75, 42, 42, 50, 58, 25, 24, 52, 51, 26, 46, 25, 45, 9, 51, 49, 48, 51, 66, 65, 57, 69, 43, 50, 9, 32, 55, 10, 58, 62, 46, 19, 87, 12, 38, 62, 69, 28, 50, 62, 41, 43, 40, 43, 80, 76, 71, 55, 46, 67, 80, 43, 32, 34, 46, 74, 50, 95, 62, 59, 79, 83, 19, 88, 34, 75, 42, 42, 50, 58, 25, 24, 52, 51, 26, 46, 25, 45, 9, 51, 49, 48, 51, 66, 65, 57, 69, 43, 50, 9, 32, 55, 10, 58, 62, 46, 19, 87, 12, 38, 62, 69, 28, 50, 62, 41, 43, 40, 43, 80, 76, 71, 55, 46, 67, 80, 43, 32, 34, 46, 74, 50, 95, 62, 59, 79, 83, 19, 88, 34, 75, 42, 42, 50, 58, 25, 24, 52, 51, 26, 46, 25, 45, 9, 51, 49, 48, 51, 66, 65, 57, 69, 43, 50, 9, 32, 55, 10, 58, 62, 46, 19, 87, 12, 38, 62, 69, 28, 50, 62, 41, 43, 40, 43, 80, 76, 71, 55, 46, 67, 80],
  // 114,
  // [1, 4, 4, 7, 8, 8, 12, 13, 14, 16, 19, 23, 25, 28, 31, 32, 36, 37, 44, 44, 45, 47, 47, 48, 48, 49],
  // [5, 13, 18, 22, 27, 28, 28, 32, 34, 34, 35, 45, 50, 51, 53, 60, 61, 65, 67, 68, 73, 75, 76, 86, 90, 91],
  // 13
));
