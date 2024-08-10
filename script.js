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

const shapesArray = [];
const colorOptions = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'cyan',
  'cyan',
  'brown',
  'brown',
  'teal',
  'teal',
  'pink',
  'pink',
];

// STATE VARIABLES
// CACHED ELEMENTS
let totalMatches;
let matchedShapes;
const svgDivs = document.querySelectorAll('svg');
// EVENT LISTENERS
// FUNCTIONS

initialize();

function initialize() {}

function shuffleShapes() {
  const shuffArray = shapesArray.slice();
  for (let i = shuffArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffArray[i], shuffArray[j]] = [shuffArray[j], shuffArray[i]];
  }
  return shuffArray;
}

function shuffleColors() {
  const colorArr = colorOptions.slice();
  for (let i = colorArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [colorArr[i], colorArr[j]] = [colorArr[j], colorArr[i]];
  }
  return colorArr;
}
