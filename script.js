/*
- game start: all shapes shuffle into place
- there are two of each shape, labeled with classname
- total of 12 shapes
- if click 1 matches click 2, it's a match!
- else, try again to match click 1 and 2
- when all matches are made, you win
- celebration!
*/

// CONTSTANTS

const shapeArray = [``];
// STATE VARIABLES
// CACHED ELEMENTS
let totalMatches;
let matchedShapes;

const divs = document.querySelectorAll('div');

// EVENT LISTENERS
// FUNCTIONS
