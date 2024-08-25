//------------------------------------------------------------------------------- CONSTANTS
const shapesArray = [
  { shape: 'circle', svg: `<circle cx="50" cy="50" r="50" />` },
  { shape: 'oval', svg: `<ellipse cx="50" cy="50" rx="50" ry="30" />` },
  { shape: 'triangle', svg: `<path d="M50 0L100 100L0 100Z" />` },
  { shape: 'square', svg: `<path d="M0 0L100 0L100 100L0 100Z" />` },
  { shape: 'rectangle', svg: `<path d="M0 20L100 20L100 80L0 80Z" />` },
  { shape: 'rhombus', svg: `<path d="M50 0L100 50L50 100L0 50Z" />` },
  { shape: 'trapezoid', svg: `<path d="M25 0L75 0L100 100L0 100Z" />` },
  {
    shape: 'hexagon',
    svg: `<path d="M25 0L75 0L100 50L75 100L25 100L0 50Z" />`,
  },
  {
    shape: 'star',
    svg: `<path d="M50 0L65 40L100 40L75 65L80 100L50 80L20 100L25 65L0 40L35 40Z" />`,
  },
  {
    shape: 'octagon',
    svg: `<path d="M30 0L70 0L100 30L100 70L66.66 100L30 100L0 70L0 30Z" />`,
  },
  { shape: 'pentagon', svg: `<path d="M50 0L100 40L75 100L25 100L0 40Z" />` },
  { shape: 'parallelogram', svg: `<path d="M50 0L100 0L50 100L0 100Z" />` },
];

const colorGroups = {
  general: [
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
  ],
  red: [
    'crimson',
    'darkred',
    'brown',
    'firebrick',
    'indianred',
    'maroon',
    'lightcoral',
    'orangered',
    'red',
    'tomato',
  ],
  greenBlue: [
    'turquoise',
    'teal',
    'yellowgreen',
    'springgreen',
    'seagreen',
    'paleturquoise',
    'palegreen',
    'olive',
    'darkseagreen',
    'olivedrab',
    'mediumturquoise',
    'mediumspringgreen',
    'mediumaquamarine',
    'mediumseagreen',
    'lime',
    'limegreen',
    'lightseagreen',
    'lightgreen',
    'lawngreen',
    'greenyellow',
    'green',
    'forestgreen',
    'darkgreen',
    'darkcyan',
    'chartreuse',
  ],
  purplePink: [
    'blueviolet',
    'darkmagenta',
    'darkorchid',
    'darkviolet',
    'deeppink',
    'darkslateblue',
    'indigo',
    'fuchsia',
    'hotpink',
    'magenta',
    'mediumorchid',
    'mediumslateblue',
    'mediumvioletred',
    'mediumpurple',
    'purple',
    'orchid',
    'plum',
    'rebeccapurple',
    'slateblue',
    'violet',
    'palevioletred',
  ],
};
//------------------------------------------------------------------------- STATE VARIABLES
let shape1 = null;
let shape2 = null;
let matchedShapes = 0;
let totalShapeSets = shapesArray.length;
//------------------------------------------------------------------------ CACHED ELEMENTS
const html = document.querySelector('html');
const lightModeButton = document.getElementById('mode');
const svgContainer = document.getElementById('svg-container');
const resetButton = document.getElementById('reset');
const unmatchedH2 = document.getElementById('unmatched');
const matchedH2 = document.getElementById('matched');
const colorButtons = {
  red: document.getElementById('red'),
  greenBlue: document.getElementById('green'),
  purplePink: document.getElementById('purple'),
};
const header = document.querySelector('header');
const buttonDiv = document.getElementById('buttonsDiv');

//------------------------------------------------------------------------- EVENT LISTENERS
lightModeButton.addEventListener('click', toggleLightMode);
resetButton.addEventListener('click', resetGame);

Object.keys(colorButtons).forEach((color) => {
  colorButtons[color].addEventListener('click', () =>
    applyColors(colorGroups[color])
  );
});

//------------------------------------------------------------------------------ FUNCTIONS
window.addEventListener('DOMContentLoaded', initializeGame);

function initializeGame() {
  createSVGElements();
  resetGame();
}

function createSVGElements() {
  for (let i = 0; i < shapesArray.length; i++) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('height', '100');
    svg.setAttribute('width', '100');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svgContainer.appendChild(svg);
  }
}

function resetGame() {
  clearShapeSelection();
  const svgs = document.querySelectorAll('svg');
  const shapes = shuffleArray(shapesArray);
  const colors = shuffleArray(colorGroups.general);

  matchedShapes = 0;
  totalShapeSets = shapesArray.length / 2;
  updateMatchedUnmatchedCounters();

  svgs.forEach((svg, idx) => {
    svg.classList = '';
    svg.innerHTML = shapes[idx].svg;
    svg.addEventListener('click', handleShapeClick);
    const shapeElement = svg.querySelector('path, ellipse, circle');

    if (shapeElement) {
      shapeElement.setAttribute('fill', colors[idx]);
      shapeElement.setAttribute('data-shape', shapes[idx].shape);
      shapeElement.setAttribute('data-id', idx);
    }
  });
}

function shuffleArray(array) {
  return array.slice().sort(() => Math.random() - 0.5);
}

function handleShapeClick(event) {
  const selection = event.target;

  if (!shape1) {
    shape1 = selection;
    applySelectedState(shape1);
  } else if (!shape2) {
    shape2 = selection;
    applySelectedState(shape2);
    checkForMatch();
  }
}

function applySelectedState(shape) {
  shape.parentNode.classList.add('scale', 'no-click');
}

function checkForMatch() {
  if (shape1.dataset.shape === shape2.dataset.shape) {
    handleMatch();
  } else {
    handleMismatch();
  }
}

function handleMatch() {
  applyAnimation(shape1, 'fadeOutUpBig');
  applyAnimation(shape2, 'fadeOutUpBig');
  updateMatchedShapes();
  resetSelection();
}

function handleMismatch() {
  applyAnimation(shape1, 'jello');
  applyAnimation(shape2, 'jello');
  setTimeout(() => {
    removeAnimation(shape1, 'jello');
    removeAnimation(shape2, 'jello');
    resetSelectedState();
    resetSelection();
  }, 2000);
}

function applyAnimation(element, animation) {
  element.classList.add('animate__animated', `animate__${animation}`);
}

function removeAnimation(element, animation) {
  element.classList.remove('animate__animated', `animate__${animation}`);
}

function updateMatchedShapes() {
  matchedShapes++;
  totalShapeSets--;
  updateMatchedUnmatchedCounters();
}

function updateMatchedUnmatchedCounters() {
  matchedH2.innerHTML = `Matched Shape Sets: <span style="color: red">${matchedShapes}</span>`;
  unmatchedH2.innerHTML = `Unmatched Shape Sets: <span style="color: red">${totalShapeSets}</span>`;
}

function resetSelectedState() {
  shape1.parentNode.classList.remove('scale', 'no-click');
  shape2.parentNode.classList.remove('scale', 'no-click');
}

function resetSelection() {
  shape1 = null;
  shape2 = null;
}

function toggleLightMode() {
  html.classList.toggle('light-mode');
  lightModeButton.textContent = html.classList.contains('light-mode')
    ? 'Dark Mode'
    : 'Light Mode';
}

function applyColors(colors) {
  const svgs = document.querySelectorAll('svg');
  svgs.forEach((svg, idx) => {
    const shapeElement = svg.querySelector('path, ellipse, circle');
    shapeElement.setAttribute('fill', colors[idx]);
  });
}

function clearShapeSelection() {
  shape1 = null;
  shape2 = null;
}
