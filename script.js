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
  colorButtons[color].addEventListener('click', () => {
    applyColors(colorGroups[color]);
  });
});

//------------------------------------------------------------------------------ FUNCTIONS
window.addEventListener('DOMContentLoaded', initializeGame);

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
}

function initialize(svgs) {
  const shapes = shuffleShapes();
  const colors = shuffleColors(colorOptions);
  matchedShapes = 0;
  totalShapeSets = shapesArray.length / 2;
  matchedH2.innerHTML = `Matched Shape Sets: <span style="color: red">${matchedShapes}</span>`;
  unmatchedH2.innerHTML = `Unmatched Shape Sets: <span style="color: red">${totalShapeSets}</span>`;

  svgs.forEach((svg, idx) => {
    svg.classList = '';
    svg.innerHTML = shapes[idx];
    svg.addEventListener('click', assignSelection);
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

function shuffleColors(colorArray) {
  const colorArr = colorArray.slice();
  for (let i = colorArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [colorArr[i], colorArr[j]] = [colorArr[j], colorArr[i]];
  }
  return colorArr;
}

function assignSelection(e) {
  const selection = e.target;
  // const selectionParent = selection.parentNode;
  if (!shape1) {
    shape1 = selection;
    shape1.parentNode.classList.add('scale', 'no-click');
    console.log('select1, scale no-click', shape1);
  } else if (!shape2) {
    shape2 = selection;
    shape2.parentNode.classList.add('scale', 'no-click');
    console.log('select2, scale no-click', shape2);
    checkMatch(shape1, shape2);
  }
}

function checkMatch(shape1, shape2) {
  if (shape1.classList.toString() === shape2.classList.toString()) {
    shape1.classList.add('animate__animated', 'animate__fadeOutUpBig');
    shape2.classList.add('animate__animated', 'animate__fadeOutUpBig');
    matchedShapes++;
    totalShapeSets--;
    matchedH2.innerHTML = `Matched Shape Sets: <span style="color: red">${matchedShapes}</span>`;
    unmatchedH2.innerHTML = `Unmatched Shape Sets: <span style="color: red">${totalShapeSets}</span>`;
    clearShape();
  } else {
    shape1.classList.add('animate__animated', 'animate__jello');
    shape2.classList.add('animate__animated', 'animate__jello');
    setTimeout(() => {
      shape1.classList.remove('animate__animated', 'animate__jello');
      shape2.classList.remove('animate__animated', 'animate__jello');
    }, 2000);
    shape1.parentNode.classList.remove('scale', 'no-click');
    shape2.parentNode.classList.remove('scale', 'no-click');
    clearSVG();
    clearShape();
  }
}

function clearSVG() {
  shape1.parentNode.classList.remove('scale', 'no-click');
  shape2.parentNode.classList.remove('scale', 'no-click');
}

function clearShape() {
  shape1 = null;
  shape2 = null;
}

function checkWin() {
  if (totalShapeSets === 0) {
    winGame();
  } else {
    return;
  }
}

function redShapes() {
  const reds = shuffleColors(redArray);
  const svgs = document.querySelectorAll('svg');
  svgs.forEach((svg, idx) => {
    const shapes = svg.querySelector('path, ellipse, circle');
    if (shapes) {
      shapes.setAttribute('fill', reds[idx]);
    }
  });
}

function greenShapes() {
  const greens = shuffleColors(greenBlueArray);
  const svgs = document.querySelectorAll('svg');
  svgs.forEach((svg, idx) => {
    const shapes = svg.querySelector('path, ellipse, circle');
    if (shapes) {
      shapes.setAttribute('fill', greens[idx]);
    }
  });
}

function purpleShapes() {
  const purples = shuffleColors(purplePinkArray);
  const svgs = document.querySelectorAll('svg');
  svgs.forEach((svg, idx) => {
    const shapes = svg.querySelector('path, ellipse, circle');
    if (shapes) {
      shapes.setAttribute('fill', purples[idx]);
    }
  });
}
