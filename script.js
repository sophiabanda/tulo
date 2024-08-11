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
  `<circle class="circle" cx="50" cy=" 50" r="50" />`,
  `<ellipse class="oval" cx="50" cy="50" rx="50" ry="30" />`,
  `<path class="triangle" d="M50 0L 100 100L0 100Z" />`,
  `<path class="square" d="M0 0L100 0L100 100L0 100Z" />`,
  `<path class="rectangle" d="M0 20L100 20L100 80L0 80Z" />`,
  `<path class="rhombus" d="M50 0L100 50L50 100L0 50Z" />`,
  `<path class="trapezoid" d="M25 0L75 0L100 100L0 100Z" />`,
  `<path class="hexagon" d="M25 0L75 0L100 50L75 100L25 100L0 50Z" />`,
  `<path class="star"
    d="M50 0L65 40L100 40L75 65L80 100L50 80L20 100L25 65L0 40L35 40Z" />`,
  `    <path class="octagon"
    d="M30 0L70 0L100 30L100 70L66.66 100L30 100L0 70L0 30Z" />`,
  `<path class="pentagon" d="M50 0L100 40L75 100L25 100L0 40Z" />`,
  `<path class="parallelogram" d="M50 0L 100 0L50 100L0 100Z" />`,
  `<circle class="circle" cx="50" cy=" 50" r="50" />`,
  `<ellipse class="oval" cx="50" cy="50" rx="50" ry="30" />`,
  `<path class="triangle" d="M50 0L 100 100L0 100Z" />`,
  `<path class="square" d="M0 0L100 0L100 100L0 100Z" />`,
  `<path class="rectangle" d="M0 20L100 20L100 80L0 80Z" />`,
  `<path class="rhombus" d="M50 0L100 50L50 100L0 50Z" />`,
  `<path class="trapezoid" d="M25 0L75 0L100 100L0 100Z" />`,
  `<path class="hexagon" d="M25 0L75 0L100 50L75 100L25 100L0 50Z" />`,
  `<path class="star"
    d="M50 0L65 40L100 40L75 65L80 100L50 80L20 100L25 65L0 40L35 40Z" />`,
  `    <path class="octagon"
    d="M30 0L70 0L100 30L100 70L66.66 100L30 100L0 70L0 30Z" />`,
  `<path class="pentagon" d="M50 0L100 40L75 100L25 100L0 40Z" />`,
  `<path class="parallelogram" d="M50 0L 100 0L50 100L0 100Z" />`,
];
const colorOptions = [
  'firebrick',
  'slateblue',
  'magenta',
  'mediumspringgreen',
  'lime',
  'lightseagreen',
  'indigo',
  'goldenrod',
  'indianred',
  'darkslategrey',
  'darkolivegreen',
  'darkmagenta',
  'darksalmon',
  'darkcyan',
  'aquamarine',
  'darkslateblue',
  'deeppink',
  'teal',
  'springgreen',
  'powderblue',
  'plum',
  'palegreen',
  'navy',
  'mediumpurple',
  'lightsalmon',
  'midnightblue',
  'orchid',
];

// STATE VARIABLES
// CACHED ELEMENTS
let totalMatches;
let matchedShapes;
const modeButton = document.getElementById('mode');
const svgs = document.querySelectorAll('svg');
// EVENT LISTENERS
svgs.forEach((svg) => {
  svg.addEventListener('click', handleClick);
});

modeButton.addEventListener('click', function (event) {
  document.querySelector('html').classList.toggle('light-mode');
});
// FUNCTIONS
initialize();
function initialize() {
  const shuffledColors = shuffleColors();
  const shuffledShapes = shuffleShapes();

  svgs.forEach((svg, idx) => {
    svg.innerHTML = shuffledShapes[idx];

    const imgEls = svg.querySelector('path, ellipse, circle');
    if (imgEls) {
      imgEls.setAttribute('fill', shuffledColors[idx]);
    }
  });
}

function shuffleShapes() {
  const shuffledArray = shapesArray.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function shuffleColors() {
  const colorArr = colorOptions.slice();
  for (let i = colorArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [colorArr[i], colorArr[j]] = [colorArr[j], colorArr[i]];
  }
  return colorArr;
}

function handleClick(event) {
  console.log(event.target.attributes.class);
  let shape1 = event.target.attributes.class;
}
