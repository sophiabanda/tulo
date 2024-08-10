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

const shapesArray = [
  `<path class="pentagon" d="M 100 10 L 190 80 L 160 190 L 40 190 L 10 80" />`,
  `<path class="rhombus" d="M 100 10 L 160 100 L 100 190 L 40 100 z" />`,
  `<path class="hexagon" d="M 50 20 L 150 20 L 190 100 L 150 180 L 50 180 L 10 100 z" />`,
  `<path class="parallelogram" d="M 80 10 L 200 10 L 120 150 L 0 150 z" />`,
  `<path class="trapezoid" d="M 45 10 L 125 10 L 175 125 L 0 125 Z" />`,
  `<path class="triangle" d="M 100 0 L 200 150 L 0 150 L 100 0" />`,
  `<rect class="rectangle" x="0" y="0" width="200" height="110" />`,
  `<rect class="square" x="25" y="0" width="130" height="130" />`,
  `<ellipse class="oval" cx="100" cy="100" rx="100" ry="50" />`,
  `<path class="octagon" d="M 66.66 20 L 133.33 20 L 180 66.66 L 180 133.33 L 180 133.33 L 133.33 180 L 66.66 180 L 20 133.33 L 20 66.66 z" />`,
  `<path class="pentagon" d="M 100 10 L 190 80 L 160 190 L 40 190 L 10 80" />`,
  `<path class="rhombus" d="M 100 10 L 160 100 L 100 190 L 40 100 z" />`,
  `<path class="hexagon" d="M 50 20 L 150 20 L 190 100 L 150 180 L 50 180 L 10 100 z" />`,
  `<path class="parallelogram" d="M 80 10 L 200 10 L 120 150 L 0 150 z" />`,
  `<path class="trapezoid" d="M 45 10 L 125 10 L 175 125 L 0 125 Z" />`,
  `<path class="triangle" d="M 100 0 L 200 150 L 0 150 L 100 0" />`,
  `<rect class="rectangle" x="0" y="0" width="200" height="110" />`,
  `<rect class="square" x="25" y="0" width="130" height="130" />`,
  `<ellipse class="oval" cx="100" cy="100" rx="100" ry="50" />`,
  `<path class="octagon" d="M 66.66 20 L 133.33 20 L 180 66.66 L 180 133.33 L 180 133.33 L 133.33 180 L 66.66 180 L 20 133.33 L 20 66.66 z" />`,
];
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

function initialize() {
  const shuffledShapes = shuffleShapes();
  const shuffledColors = shuffleColors();

  svgDivs.forEach((svg, index) => {
    svg.innerHTML = shuffledShapes[index];

    const shapeElement = svg.querySelector('path, rect, ellipse');
    if (shapeElement) {
      shapeElement.setAttribute('fill', shuffledColors[index]);
    }
  });
}

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
