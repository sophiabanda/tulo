//------------------------------------------------------------------------------- CONSTANTS
const shapesArray = [
  `<circle class="circle" cx="50" cy="50" r="50" />`,
  `<ellipse class="oval" cx="50" cy="50" rx="50" ry="30" />`,
  `<path class="triangle" d="M50 0L100 100L0 100Z" />`,
  `<path class="square" d="M0 0L100 0L100 100L0 100Z" />`,
  `<path class="rectangle" d="M0 20L100 20L100 80L0 80Z" />`,
  `<path class="rhombus" d="M50 0L100 50L50 100L0 50Z" />`,
  `<path class="trapezoid" d="M25 0L75 0L100 100L0 100Z" />`,
  `<path class="hexagon" d="M25 0L75 0L100 50L75 100L25 100L0 50Z" />`,
  `<path class="star" d="M50 0L65 40L100 40L75 65L80 100L50 80L20 100L25 65L0 40L35 40Z" />`,
  `<path class="octagon" d="M30 0L70 0L100 30L100 70L66.66 100L30 100L0 70L0 30Z" />`,
  `<path class="pentagon" d="M50 0L100 40L75 100L25 100L0 40Z" />`,
  `<path class="parallelogram" d="M50 0L100 0L50 100L0 100Z" />`,
  `<circle class="circle" cx="50" cy="50" r="50" />`,
  `<ellipse class="oval" cx="50" cy="50" rx="50" ry="30" />`,
  `<path class="triangle" d="M50 0L100 100L0 100Z" />`,
  `<path class="square" d="M0 0L100 0L100 100L0 100Z" />`,
  `<path class="rectangle" d="M0 20L100 20L100 80L0 80Z" />`,
  `<path class="rhombus" d="M50 0L100 50L50 100L0 50Z" />`,
  `<path class="trapezoid" d="M25 0L75 0L100 100L0 100Z" />`,
  `<path class="hexagon" d="M25 0L75 0L100 50L75 100L25 100L0 50Z" />`,
  `<path class="star" d="M50 0L65 40L100 40L75 65L80 100L50 80L20 100L25 65L0 40L35 40Z" />`,
  `<path class="octagon" d="M30 0L70 0L100 30L100 70L66.66 100L30 100L0 70L0 30Z" />`,
  `<path class="pentagon" d="M50 0L100 40L75 100L25 100L0 40Z" />`,
  `<path class="parallelogram" d="M50 0L100 0L50 100L0 100Z" />`,
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
//------------------------------------------------------------------------------- STATE VARIABLES
let shape1 = null;
let shape2 = null;
let matchedShapes = 0;
//------------------------------------------------------------------------------- CACHED ELEMENTS
const html = document.querySelector('html');
const lightModeButton = document.getElementById('mode');
const svgContainer = document.getElementById('svg-container');
const resetButton = document.getElementById('reset');

//------------------------------------------------------------------------------- EVENT LISTENERS
lightModeButton.addEventListener('click', function () {
  html.classList.toggle('light-mode');
  if (lightModeButton === '💡') {
    lightModeButton.innerText = '🌘';
  } else {
    lightModeButton.innerText = '💡';
  }
});

resetButton.addEventListener('click', () => {
  const svgs = document.querySelectorAll('svg');
  initialize(svgs);
});

//------------------------------------------------------------------------------- FUNCTIONS
window.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < shapesArray.length; i++) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('height', '100');
    svg.setAttribute('width', '100');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svgContainer.appendChild(svg);
  }
  const svgs = document.querySelectorAll('svg');

  initialize(svgs);
});

function initialize(svgs) {
  const shapes = shuffleShapes();
  const colors = shuffleColors();

  svgs.forEach((svg, idx) => {
    svg.innerHTML = shapes[idx];
    svg.addEventListener('click', handleSelection);
    const shapeEls = svg.querySelector('path, ellipse, circle');

    if (shapeEls) {
      shapeEls.setAttribute('fill', colors[idx]);
      shapeEls.setAttribute('id', idx);
    }
  });
}

function shuffleShapes() {
  const shapeArr = shapesArray.slice();
  for (let i = shapeArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shapeArr[i], shapeArr[j]] = [shapeArr[j], shapeArr[i]];
  }
  return shapeArr;
}

function shuffleColors() {
  const colorArr = colorOptions.slice();
  for (let i = colorArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [colorArr[i], colorArr[j]] = [colorArr[j], colorArr[i]];
  }
  return colorArr;
}

function handleSelection(e) {
  const selection = e.target;
  console.log(selection.classList.toString());
  if (!shape1) {
    shape1 = selection;
    shape1.parentNode.classList.add('transform');
    shape1.parentNode.classList.add('no-click');
  } else if (!shape2) {
    shape2 = selection;
    shape2.parentNode.classList.add('transform');
    shape2.parentNode.classList.add('no-click');
    checkMatch(shape1, shape2);
  }
}

function checkMatch(shape1, shape2) {
  if (shape1.classList.toString() === shape2.classList.toString()) {
    console.log('Yay!!');
  } else {
    console.log('Try again');
  }
}
