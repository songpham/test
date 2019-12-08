# How to use:
> **_NOTE:_** I tested on Node version v10.15.0

## Install jasmine

```javascript
npm install -g jasmine
npm install
```

## Script 1: Rotate picture

```javascript
node rotate-picture/index.js
```
**Output:**
```
Original Square:
[ 0, 16, 255 ]
[ 8, 128, 32 ]
[ 0, 0, 0 ]
Execution time: 1ms
Time/memory complexity: O(n) / O(n)
The script uses approximately 4.08 MB
[ 0, 8, 0 ]
[ 0, 128, 16 ]
[ 0, 32, 255 ]
```

## Script 2: Product Recommendation

> Test script at /product-recommendation/spec/handlers/*
> Handler at /product-recommendation/src/handlers/*

```javascript
npm test
```
**Output:**
```
> cd ./product-recommendation && node spec/support/jasmine-runner.js full

Jasmine started

  Bundle modify:
    v should return a new bundle
    v should throw an error if request is not valid

  Bundle recommend:
    v should throw an error if request is not valid
    v should be recommend a matching card

Executed 4 of 4 specs SUCCESS in 0.04 sec.
Randomized with seed 22383.
```

## Script 3: Finding Optimal Path

```javascript
node optimal-path/index.js
```

> To avoid infinite loop caused by cycles, I check if the loop comeback vertex it has already visited, the loop will be end
> You can run the test findOptimalPath(['A5', 'B10', 'C3', 'D23', 'E3', 'F9'], ['A->B', 'B->C', 'C->E', 'B->E', 'D->B', 'E->D', 'E->F'], 'D'), to see D comeback to E

**Output:**
```
> Graph:
A {
    weight: 1
    edges: [B, C]
}
B {
    weight: 2
    edges: [C]
}
C {
    weight: 2
    edges: []
}
paths: { 'A->B->C': 5, 'A->C': 3 }
Sum: 5
```

## Script 4: Hotel Reservation

```javascript
node hotel-reservation/index.js
```
**Output:**
```
Input:
-------------
Arrivals:  [ 1, 3, 5 ]
Departures:  [ 2, 6, 10 ]
K:  1
-------------
Output: false
Execution time: 1ms
Time/memory complexity: Time O(n log(n)) / O(n)
The script uses approximately 4.09 MB
```
